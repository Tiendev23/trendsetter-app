import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import RenderHTML from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    source: string;
};

export default function DescRender({ source }: Props) {

    const { width } = useWindowDimensions();
    const [expanded, setExpanded] = useState(false);
    const renderProps = useMemo(() => ({
        img: {
            enableExperimentalPercentWidth: true,
        }
    }), []);
    const tagsStyles = useMemo(() => ({
        div: {
            color: '#707B81',
            lineHeight: 24
        },
        p: {
            color: '#707B81',
            lineHeight: 24
        }
    }), []);

    useEffect(() => {
        if (source.length && source.length <= 500 && !expanded)
            setExpanded(true)
    }, [source]);

    return (
        <View style={{ overflow: 'hidden', maxHeight: expanded ? undefined : 200 }}>
            <View>
                <RenderHTML
                    source={{
                        html: source
                    }}
                    contentWidth={width}
                    renderersProps={renderProps}
                    tagsStyles={tagsStyles}
                />
            </View>

            {
                !expanded &&
                <TouchableOpacity
                    onPress={() => setExpanded(true)}
                    style={[styles.dropDownButton, { justifyContent: 'flex-end' }]}
                >
                    <LinearGradient
                        colors={expanded
                            ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"]
                            : ["rgba(0, 0, 0, 0.75)", "rgba(0, 0, 0, 0.5)", "rgba(255, 255, 255, 0.25)"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.slideDirection}
                    >
                        {/* <SimpleLineIcons name={expanded ? "arrow-up" : "arrow-down"} size={45} color="rgba(253, 253, 253, 0.5)" /> */}
                        <Text style={{
                            color: "white",
                            fontWeight: '600',
                        }}>xem thêm</Text>
                    </LinearGradient>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    dropDownButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    slideDirection: {
        height: 50,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 5
    },
})