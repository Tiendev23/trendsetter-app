import { useState } from 'react';
import { uploadImage } from '../api/bannerApi';

export function useUploadImage() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function upload(uri: string) {
    setUploading(true);
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1].toLowerCase();

    const formData = new FormData();
    formData.append('image', {
      uri,
      name: `banner.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    try {
      const url = await uploadImage(formData, setProgress);
      setUploading(false);
      setProgress(0);
      return url;
    } catch (error) {
      setUploading(false);
      setProgress(0);
      throw error;
    }
  }

  return { uploading, progress, upload };
}
