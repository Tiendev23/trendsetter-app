import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cancelTransaction, setTransStatus } from '@/redux/features/payment/transactionSlice';
import { Provider, ProviderData } from '@/types';
import { showErrorToast } from '@/utils/toast';

type Props = {
    provider: Provider;
    providerData: ProviderData | null;
}

export default function PaymentHandler({ provider, providerData: response }: Props) {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.transaction.error);
    const [hasHandled, setHandled] = useState<boolean>(false);

    useEffect(() => {
        if (error) {
            showErrorToast({
                title: `Lỗi ${error.code}`,
                message: error.message,
            });
            return;
        }
    }, [error])

    if (hasHandled || !response) return null;

    const handleNavigationChange = (navState: WebViewNavigation) => {
        const { url } = navState;
        if (hasHandled) return;
        // ZaloPay
        if (url.includes('result?')) {
            if (!(url.includes('returncode=1'))) {
                dispatch(setTransStatus("cancelled"));
                dispatch(cancelTransaction({
                    provider,
                    orderId: response.providerTrxId
                }))
            }
            else dispatch(setTransStatus("completed"));
            setHandled(true);
        }
        // PayOS
        if (url.includes('/succeeded?')) {
            dispatch(setTransStatus("completed"));
            setHandled(true);
        } else if (url.includes('/cancelled?')) {
            dispatch(setTransStatus("cancelled"));
            dispatch(cancelTransaction({
                provider,
                orderId: response.providerTrxId
            }));
            setHandled(true);
        }
    };

    return (
        <View style={[styles.container, styles.blurContainer]}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[styles.container, { paddingBottom: 20 }]}
            >
                <WebView
                    source={{ uri: response.checkoutUrl }}
                    style={styles.container}
                    scalesPageToFit={true}
                    setSupportMultipleWindows={false}
                    onNavigationStateChange={handleNavigationChange}
                    startInLoadingState
                    renderLoading={() => (
                        <View style={[styles.webContainer, styles.container]}>
                            <ActivityIndicator size="large" color="#006340" />
                        </View>
                    )}
                />
            </ScrollView>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    webContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: "#FFFFFF",
    }
})