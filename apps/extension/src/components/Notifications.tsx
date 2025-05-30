import {
    DAppManifest,
    SignDataResponse,
    TonConnectEventPayload
} from '@tonkeeper/core/dist/entries/tonConnect';
import { delay } from '@tonkeeper/core/dist/utils/common';
import { TonConnectNotification } from '@tonkeeper/uikit/dist/components/connect/TonConnectNotification';
import { TonTransactionNotification } from '@tonkeeper/uikit/dist/components/connect/TonTransactionNotification';
import { SignDataNotification } from '@tonkeeper/uikit/dist/components/connect/SignDataNotification';
import { useNotificationAnalytics } from '@tonkeeper/uikit/dist/hooks/amplitude';
import { useCallback, useEffect, useState } from 'react';
import { askBackground, sendBackground } from '../event';
import { NotificationData } from '../libs/event';
import { Account } from '@tonkeeper/core/dist/entries/account';
import { WalletId } from '@tonkeeper/core/dist/entries/wallet';

export const Notifications = () => {
    const [data, setData] = useState<NotificationData | undefined>(undefined);

    const reloadNotification = useCallback(async (wait = true) => {
        setData(undefined);
        if (wait) {
            await delay(300);
        }
        try {
            const item = await askBackground<NotificationData | undefined>().message(
                'getNotification'
            );
            if (item) {
                setData(item);
            } else {
                sendBackground.message('closePopUp');
            }
        } catch (e) {
            sendBackground.message('closePopUp');
        }
    }, []);

    useNotificationAnalytics(data);

    useEffect(() => {
        if (window.location.hash === '#/notification') {
            reloadNotification(false);
        }
    }, []);

    return (
        <>
            <TonConnectNotification
                origin={data?.origin}
                params={data?.kind === 'tonConnectRequest' ? { request: data.data, appName: 'tonkeeper' } : null}
                handleClose={(
                    result: {
                        replyItems: TonConnectEventPayload;
                        manifest: DAppManifest;
                        account: Account;
                        walletId: WalletId;
                    } | null
                ) => {
                    if (!data) return;
                    if (result) {
                        sendBackground.message('approveRequest', {
                            id: data.id,
                            payload: result.replyItems
                        });
                    } else {
                        sendBackground.message('rejectRequest', data.id);
                    }
                    reloadNotification(true);
                }}
            />
            <TonTransactionNotification
                params={data?.kind === 'tonConnectSend' ? data.data : null}
                handleClose={(payload?: string) => {
                    if (!data) return;
                    if (payload) {
                        sendBackground.message('approveRequest', { id: data.id, payload });
                    } else {
                        sendBackground.message('rejectRequest', data.id);
                    }
                    reloadNotification(true);
                }}
            />
            <SignDataNotification
                origin={data?.kind === 'tonConnectSign' ? data.manifest.url : undefined}
                params={data?.kind === 'tonConnectSign' ? data.data : null}
                handleClose={(payload?: SignDataResponse) => {
                    if (!data) return;
                    if (payload) {
                        sendBackground.message('approveRequest', { id: data.id, payload });
                    } else {
                        sendBackground.message('rejectRequest', data.id);
                    }
                    reloadNotification(true);
                }}
            />
        </>
    );
};
