import { useRef } from 'react';
import { Animated, TextInput, View, StyleSheet, KeyboardTypeOptions, Text } from 'react-native';
import ShakeView from './ShakeView';

type Props = {
    value: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions | undefined,
    maxLength?: number | undefined;
    onChange: (text: string) => void;
    errorTrigger: boolean;
    errorText?: string | undefined;
}
export default function UnderlinedInput({
    value, placeholder, keyboardType, maxLength,
    onChange, errorTrigger: hasError, errorText
}: Props) {
    const focusAnim = useRef(new Animated.Value(0)).current;

    const onFocus = () => Animated.timing(focusAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    const onBlur = () => Animated.timing(focusAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();

    const underlineStyle = {
        height: 2,
        backgroundColor: '#006340',
        transform: [{ scaleX: focusAnim }],
        opacity: focusAnim
    };

    return (
        <View>
            <ShakeView trigger={hasError}>
                <TextInput
                    style={styles.underInput}
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                />
                <Animated.View style={[underlineStyle, hasError && styles.errorLineStyle]} />
            </ShakeView>
            {hasError && (
                <Text style={styles.errorText}>{errorText}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    underInput: {
        height: 48,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    errorLineStyle: {
        backgroundColor: "#C21E0C",
    },
    errorText: {
        color: '#C21E0C',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'right'
    }
});