const BASE_URL = 'http://192.168.1.21:5000/api';

export async function uploadImage(formData: FormData, onProgress: (p: number) => void) {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${BASE_URL}/upload`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        resolve(res.url);
      } else reject(new Error('Upload failed'));
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    };
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(formData);
  });
}

export async function createBanner(data: { title:string; link?:string; description?:string; image:string }) {
  const res = await fetch(`${BASE_URL}/banners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Create banner failed');
  return res.json();
}
