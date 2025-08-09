import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cancelTransaction } from '@/redux/features/payment/transactionSlice';
import { PayOSResponse, Provider, ProviderData, ZaloPayResponse } from '@/types';
import { getProviderData } from '../hooks';
import { showErrorToast } from '@/utils/toast';

type Props = {
    provider: Provider;
    dataResponse: ZaloPayResponse | PayOSResponse | null;
    handleClearCart: () => void;
    OnCancelTransaction: () => void;
}

export default function PaymentHandler({ provider, dataResponse, handleClearCart, OnCancelTransaction }: Props) {
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

    if (hasHandled || !dataResponse) return null;

    const data: ProviderData = getProviderData(provider, dataResponse);
    const handleNavigationChange = (navState: WebViewNavigation) => {
        const { url } = navState;
        if (hasHandled) return;
        if (url.includes('result?')) {
            if (url.includes('returncode=1')) {
                handleClearCart();
            } else {
                dispatch(cancelTransaction({
                    provider,
                    orderId: data.transId
                }))
            }
            setHandled(true);
        }
        if (url.includes('/succeeded?')) {
            handleClearCart();
            setHandled(true);
        } else if (url.includes('/cancelled?')) {
            dispatch(cancelTransaction({
                provider,
                orderId: data.transId
            }));
            OnCancelTransaction();
        }
    };

    return (
        <View style={[styles.container, styles.blurContainer]}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[styles.container, { paddingBottom: 20 }]}
            >
                <WebView
                    source={{ uri: data.checkoutUrl }}
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