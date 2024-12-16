import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { anyOfKeysParts, QueryKey } from '../libs/queryKey';
import { useAppSdk } from '../hooks/appSdk';
import { AppKey } from '@tonkeeper/core/dist/Keys';
import { useAccountsState, useActiveAccount, useActiveConfig, useActiveWallet } from './wallet';
import { useDevSettings } from './dev';
import { AccountId } from '@tonkeeper/core/dist/entries/account';
import { AuthApi, Configuration } from '@tonkeeper/core/dist/2faApi';
import { useMemo } from 'react';
import { useSignTonProof } from '../hooks/accountUtils';

export type TwoFATgBotBoundingWalletConfig = {
    status: 'tg-bot-bounding';
    authUrl: string;
    expiresAtUnixSeconds: number;
};

export type TwoFATgBotBoundedWalletConfig = {
    status: 'ready-for-deployment';
    botUrl: string;
};

export type TwoFAActiveWalletConfig = {
    status: 'active';
    botUrl: string;
    pluginAddress: string;
};

export type TwoFADisablingWalletConfig = {
    status: 'disabling';
    pluginAddress: string;
    willBeDisabledAtUnixSeconds: number;
};

export type TwoFAWalletConfig =
    | TwoFATgBotBoundingWalletConfig
    | TwoFATgBotBoundedWalletConfig
    | TwoFAActiveWalletConfig
    | TwoFADisablingWalletConfig
    | null;

const twoFaWalletConfigStorageKey = (walletId: string) =>
    AppKey.TWO_FA_WALLET_CONFIG + '::' + walletId;

export const useIsTwoFAEnabledGlobally = () => {
    const { data: settings } = useDevSettings();

    return settings?.twoFAEnabled ?? false;
};

export const useCanViewTwoFA = () => {
    const isEnabled = useIsTwoFAEnabledGlobally();
    const { data } = useTwoFAWalletConfig();
    const account = useActiveAccount();

    const isSuitableAccount = account.type === 'mnemonic' || account.type === 'mam';

    return (isEnabled && isSuitableAccount) || data?.status === 'active';
};

export const useTwoFAApi = () => {
    const config = useActiveConfig();
    return useMemo(() => {
        return new Configuration({
            basePath: config['2fa_api_url'] || 'https://2fa.tonapi.io'
        });
    }, []);
};

export const useTwoFAServiceConfig = () => {
    const config = useActiveConfig();

    return useMemo(() => {
        if (!config['2fa_public_key']) {
            throw new Error('2fa_public_key not found');
        }

        const servicePubKey = BigInt(
            '0x' + Buffer.from(config['2fa_public_key'], 'base64').toString('hex')
        );

        return {
            servicePubKey,
            confirmMessageTGTtlSeconds: config['2fa_tg_confirm_send_message_ttl_seconds'] ?? 600,
            confirmConnectionTGTtlSeconds: config['2fa_tg_linked_ttl_seconds'] ?? 600
        };
    }, [config]);
};

export const useTwoFAWalletConfig = () => {
    const sdk = useAppSdk();
    const account = useActiveAccount();
    const isTwoFAEnabledGlobally = useIsTwoFAEnabledGlobally();

    const wallet = account.activeTonWallet;
    const api = useTwoFAApi();

    const isSuitableAccount = account.type === 'mnemonic' || account.type === 'mam';

    return useQuery<TwoFAWalletConfig>(
        [QueryKey.twoFAWalletConfig, wallet.id, isTwoFAEnabledGlobally],
        async () => {
            let config = await sdk.storage.get<TwoFAWalletConfig>(
                twoFaWalletConfigStorageKey(wallet.id)
            );
            const originalConfigStatus = config?.status;
            if (!config) {
                return null;
            }

            if (
                config.status === 'tg-bot-bounding' &&
                config.expiresAtUnixSeconds < Date.now() / 1000
            ) {
                config = null;
            }

            if (config?.status === 'tg-bot-bounding') {
                try {
                    const result = await new AuthApi(api).existsExtension({
                        existsExtensionRequest: {
                            wallet: wallet.rawAddress
                        }
                    });

                    if (result.ok) {
                        config = {
                            status: 'ready-for-deployment',
                            botUrl: authUrlToBotUrl(config.authUrl)
                        };
                    }
                } catch (e) {
                    console.error(e);
                }
            }

            if (config?.status !== originalConfigStatus) {
                await sdk.storage.set(twoFaWalletConfigStorageKey(wallet.id), config);
            }

            return config;
        },
        {
            keepPreviousData: true,
            enabled: isSuitableAccount,
            refetchInterval: d =>
                d?.status === 'tg-bot-bounding' || d?.status === 'disabling' ? 1000 : false
        }
    );
};

const authUrlToBotUrl = (authUrl: string) => {
    const u = new URL(authUrl);
    return u.origin + u.pathname;
};

export const useMarkTwoFAWalletAsActive = () => {
    const { mutateAsync } = useMutateTwoFAWalletConfig();
    const config = useTwoFAWalletConfig().data;

    return useMutation<void, Error, { pluginAddress: string }>(async ({ pluginAddress }) => {
        if (!config) {
            throw new Error('Config not found');
        }

        await mutateAsync({
            status: 'active',
            pluginAddress
        });
    });
};

export const useMutateTwoFAWalletConfig = () => {
    const sdk = useAppSdk();
    const wallet = useActiveWallet();
    const client = useQueryClient();

    return useMutation(async (newConfig: Partial<TwoFAWalletConfig>) => {
        const config =
            (await sdk.storage.get<TwoFAWalletConfig>(twoFaWalletConfigStorageKey(wallet.id))) ||
            {};
        await sdk.storage.set(twoFaWalletConfigStorageKey(wallet.id), { ...config, ...newConfig });
        await client.invalidateQueries(anyOfKeysParts(QueryKey.twoFAWalletConfig));
    });
};

export const useRemoveAccountTwoFAData = () => {
    const sdk = useAppSdk();
    const accounts = useAccountsState();

    return useMutation(async (accountId: AccountId) => {
        const account = accounts.find(item => item.id === accountId);
        if (!account) {
            return;
        }
        for (const wallet of account.allTonWallets) {
            await sdk.storage.delete(twoFaWalletConfigStorageKey(wallet.id));
        }
    });
};

export const useBoundTwoFABot = () => {
    const twoFAApi = useTwoFAApi();
    const client = useQueryClient();
    const { mutateAsync } = useMutateTwoFAWalletConfig();
    const { mutateAsync: signTonProof } = useSignTonProof();
    const address = useActiveWallet().rawAddress;
    const serviceConfig = useTwoFAServiceConfig();

    return useMutation<string>(async () => {
        const { payload } = await new AuthApi(twoFAApi).getPayload();
        const origin = 'https://tonkeeper.com';

        const { timestamp, signature, stateInit, domain } = await signTonProof({
            origin,
            payload
        });

        const res = await new AuthApi(twoFAApi).connect({
            connectRequest: {
                address,
                proof: {
                    timestamp,
                    stateInit,
                    domain: domain.value,
                    payload,
                    signature
                }
            }
        });

        await mutateAsync({
            status: 'tg-bot-bounding',
            authUrl: res.url,
            expiresAtUnixSeconds:
                Math.round(Date.now() / 1000) + serviceConfig.confirmConnectionTGTtlSeconds
        });
        await client.invalidateQueries([QueryKey.twoFAWalletConfig]);

        return res.url;
    });
};

export const useDisconnectTwoFABot = () => {
    const client = useQueryClient();
    const twoFaConfig = useTwoFAWalletConfig().data;
    const sdk = useAppSdk();
    const wallet = useActiveWallet();

    return useMutation(async () => {
        if (!twoFaConfig) {
            throw new Error('Unexpected two fa config');
        }

        if (
            twoFaConfig.status !== 'tg-bot-bounding' &&
            twoFaConfig.status !== 'ready-for-deployment'
        ) {
            throw new Error(`Cannot disconnect bot for status ${twoFaConfig.status}`);
        }

        await sdk.storage.set(twoFaWalletConfigStorageKey(wallet.id), null);
        await client.invalidateQueries([QueryKey.twoFAWalletConfig]);
    });
};
