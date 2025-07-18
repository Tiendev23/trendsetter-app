import { useWindowDimensions } from 'react-native';
import React, { useMemo } from 'react';
import RenderHTML from 'react-native-render-html';

type Props = {
    source: string;
};

export default function DescRender({ source }: Props) {
    const { width } = useWindowDimensions();
    const renderProps = useMemo(() => ({
        img: {
            enableExperimentalPercentWidth: true,
        }
    }), []);
    return (
        <RenderHTML
            source={{
                html: `<p>Đôi giày chạy bộ với công nghệ Zoom Air ở mũi và gót chân mang lại khả năng đàn hồi tốt, giúp tăng tốc độ và bảo vệ chân. Upper dạng mesh thoáng khí, thiết kế nhẹ, tăng trải nghiệm chạy bộ hoặc sử dụng hàng ngày. Kiểu sneaker năng động, phối hợp tốt với trang phục thể thao và tông màu dễ mix.</p>`
            }}
            contentWidth={width}
            renderersProps={renderProps}
            tagsStyles={{
                p: {
                    color: '#707B81',
                    lineHeight: 24
                }
            }}

        />
    );
}