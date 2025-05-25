import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Text, useTheme, ProgressBar } from 'react-native-paper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GradientButton from '../components/GradientButton';
import ImagePickerModal from '../components/ImagePickerModal';
import { uploadImage, createBanner } from '../api/bannerApi';
import Loader from '../components/Loader';

const schema = yup.object().shape({
  title: yup.string().required('Tiêu đề là bắt buộc'),
  link: yup.string().url('Link không hợp lệ').nullable(),
  description: yup.string().nullable(),
});

export default function AddBannerScreen() {
  const theme = useTheme();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', link: '', description: '' },
  });

  const onSubmit = async (data: any) => {
    if (!imageUri) {
      Alert.alert('Bạn chưa chọn ảnh banner');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1].toLowerCase();

      formData.append('image', {
        uri: imageUri,
        name: `banner.${fileType}`,
        type: `image/${fileType}`,
      } as any);

      // Upload ảnh
      const imageUrl = await uploadImage(formData, (p) => setProgress(p));

      // Tạo banner
      await createBanner({ ...data, image: imageUrl });

      Alert.alert('Thành công', 'Banner đã được tạo');
      reset();
      setImageUri(null);
    } catch (error) {
      Alert.alert('Lỗi', (error as Error).message || 'Có lỗi xảy ra');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Thêm Banner Mới</Text>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Tiêu đề banner"
                mode="outlined"
                value={value}
                onChangeText={onChange}
                error={!!errors.title}
                disabled={uploading}
                style={styles.input}
              />
            )}
          />
          {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

          <Controller
            control={control}
            name="link"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Link banner (tuỳ chọn)"
                mode="outlined"
                value={value}
                onChangeText={onChange}
                error={!!errors.link}
                disabled={uploading}
                style={styles.input}
              />
            )}
          />
          {errors.link && <Text style={styles.error}>{errors.link.message}</Text>}

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Mô tả banner (tuỳ chọn)"
                mode="outlined"
                multiline
                numberOfLines={4}
                value={value}
                onChangeText={onChange}
                disabled={uploading}
                style={styles.input}
              />
            )}
          />

          <GradientButton
            text={imageUri ? 'Thay đổi ảnh banner' : 'Chọn ảnh banner'}
            onPress={() => setModalVisible(true)}
            disabled={uploading}
          />

          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

          {uploading && (
            <View style={styles.progressContainer}>
              <Text>{`Đang tải lên: ${(progress * 100).toFixed(0)}%`}</Text>
              <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
            </View>
          )}

          <GradientButton
            text="Tạo banner"
            onPress={handleSubmit(onSubmit)}
            loading={uploading}
            disabled={uploading}
          />

          <ImagePickerModal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            onImageSelected={setImageUri}
          />
          <Loader visible={uploading} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 4,
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  progressContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  progressBar: {
    marginTop: 6,
    borderRadius: 6,
    height: 8,
    width: '100%',
  },
});
