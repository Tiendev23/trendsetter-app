// components/CampaignBanner.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useCampaignTimer } from '@/hooks/useCampaignTimer';
import { formatCurrency } from '@/utils/formatForm';
import { CampaignLite } from '@/types';
import dayjs from 'dayjs';
import { showInfoToast } from '@/utils/toast';

type UpcomingProps = {
    startDate: string;
    finalPrice: number;
};

const UpcomingBanner = ({ startDate, finalPrice }: UpcomingProps) => (
    <ImageBackground
        source={require('@/../assets/images/campaign-banner-bg.jpg')}
        imageStyle={{ opacity: 0.8 }}
        style={styles.banner}
    >
        <View style={[styles.contentWrapper, styles.contentSpacing]}>
            <View style={styles.contentWrapper}>
                <Text style={styles.textNotify}>
                    {startDate}
                </Text>
                <Text style={styles.mainContent}>
                    Chờ giá {formatCurrency(finalPrice)}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    showInfoToast({
                        title: "Thông báo",
                        message: "Tính năng đang được phát triển.",
                    })
                }}
            >
                <Text style={styles.textNotify}>
                    Nhắc tôi
                </Text>
            </TouchableOpacity >
        </View>
    </ImageBackground>
);

type ActiveProps = {
    campaign: CampaignLite;
    countdown: string;
};

const ActiveBanner = ({ campaign, countdown }: ActiveProps) => (
    <ImageBackground
        source={require('@/../assets/images/campaign-banner-bg.jpg')}
        imageStyle={{ opacity: 0.8 }}
        style={styles.banner}
    >
        <View style={[styles.contentWrapper, styles.contentSpacing]}>
            <Text style={styles.subtextCountdownLeft}>
                Giảm giá trực tiếp {campaign.value}{campaign.type === 'percentage' ? '%\n' : 'đ\n'}
                trong thời gian có hạn!
            </Text>
            <View>
                <Text style={styles.subtextCountdownRight}>
                    Kết thúc trong
                </Text>
                <Text style={styles.mainContent}>{countdown}</Text>
            </View>
        </View>
    </ImageBackground>
)

type Props = {
    campaign: CampaignLite;
    price: number;
};

export default function CampaignBanner({ campaign, price }: Props) {
    if (!campaign) return null;
    const { isUpcoming, diff, days, hours, minutes, seconds } = useCampaignTimer(campaign);

    const startDate = dayjs
        .utc(campaign.startDate)
        .tz("Asia/Ho_Chi_Minh")
        .locale("vi")
        .format("DD.MM");

    const finalPrice = useMemo(() => {
        if (campaign.type === 'percentage') {
            return price * (1 - campaign.value / 100);
        } else {
            return price - campaign.value;
        }
    }, [price, campaign]);

    if (isUpcoming) return (
        <UpcomingBanner startDate={startDate} finalPrice={finalPrice} />
    );

    if (diff === 0) return null;

    const pad = (n: number) => n.toString().padStart(2, '0');
    const countdown = `${days} ngày ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    return (
        <ActiveBanner campaign={campaign} countdown={countdown} />
    );
}

const styles = StyleSheet.create({
    banner: {
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 14,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    contentSpacing: {
        justifyContent: 'space-between',
        width: '100%'
    },
    mainContent: {
        color: '#d84315',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'right',
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#006340',
        backgroundColor: '#fff',
    },
    textNotify: {
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'right',
        color: '#006340',
    },
    subtext: {
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        color: '#fff',
    },
    subtextCountdownLeft: {
        textAlign: 'left',
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    subtextCountdownRight: {
        textAlign: 'right',
        color: '#000',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 20,
    },
});