import { useMutation } from '@tanstack/react-query';
import { TonAsset } from '@tonkeeper/core/dist/entries/crypto/asset/ton-asset';
import { Estimation } from '@tonkeeper/core/dist/entries/send';

import { useAnalyticsTrack } from '../../amplitude';
import {
    useActiveApi,
    useActiveWallet,
    useInvalidateActiveWalletQueries
} from '../../../state/wallet';
import { useNotifyErrorHandle } from '../../useNotification';
import { EXTERNAL_SENDER_CHOICE, useGetSender } from '../useSender';
import { useTonRawTransactionService } from '../useBlockchainService';
import {
    useIsTwoFAEnabledGlobally,
    useMarkTwoFAWalletAsActive,
    useTwoFAServiceConfig,
    useTwoFAWalletConfig
} from '../../../state/two-fa';
import { TwoFAEncoder } from '@tonkeeper/core/dist/service/ton-blockchain/encoder/2fa-encoder';
import { isStandardTonWallet } from '@tonkeeper/core/dist/entries/wallet';

export function useSendTwoFADeploy(estimation: Estimation<TonAsset>) {
    const track = useAnalyticsTrack();
    const { mutateAsync: invalidateAccountQueries } = useInvalidateActiveWalletQueries();
    const notifyError = useNotifyErrorHandle();
    const getSender = useGetSender();
    const rawTransactionService = useTonRawTransactionService();
    const { data: twoFAWalletConfig } = useTwoFAWalletConfig();
    const isTwoFAEnabledGlobally = useIsTwoFAEnabledGlobally();
    const wallet = useActiveWallet();
    const { servicePubKey } = useTwoFAServiceConfig();
    const { mutateAsync: markTwoFAWalletAsActive } = useMarkTwoFAWalletAsActive();
    const api = useActiveApi();

    return useMutation<boolean, Error>(async () => {
        try {
            if (!isTwoFAEnabledGlobally) {
                throw new Error('Two FA is not enabled globally');
            }

            if (!twoFAWalletConfig) {
                throw new Error('Two FA config not found');
            }

            if (!isStandardTonWallet(wallet)) {
                throw new Error('Cant deploy two fa plugin using this wallet');
            }

            const encoder = new TwoFAEncoder(api, wallet.rawAddress);
            const tx = await encoder.encodeInstall({
                seedPubKey: BigInt('0x' + wallet.publicKey),
                servicePubKey
            });

            await rawTransactionService.send(
                await getSender(EXTERNAL_SENDER_CHOICE),
                estimation,
                tx
            );

            await markTwoFAWalletAsActive({ pluginAddress: encoder.pluginAddress.toRawString() });

            track('deploy_2fa', {
                wallet: wallet.rawAddress
            });
        } catch (e) {
            await notifyError(e);
            return false;
        }

        await invalidateAccountQueries();
        return true;
    });
}
