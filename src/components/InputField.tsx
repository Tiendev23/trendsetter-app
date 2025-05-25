import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
};

export default function InputField({ label, value, onChangeText, error, multiline, numberOfLines, disabled }: Props) {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        error={!!error}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
      />
      {error ? <HelperText type="error">{error}</HelperText> : null}
    </>
  );
}
