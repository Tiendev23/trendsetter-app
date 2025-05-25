const BASE_URL = 'http://<IP_backend>:5000/api'; // Thay IP hoặc domain backend

export async function fetchBanners() {
  const response = await fetch(`${BASE_URL}/banners`);
  if (!response.ok) throw new Error('Không thể lấy banner');
  return response.json();
}

export async function createBanner(bannerData: { title: string; link: string; image: string }) {
  const response = await fetch(`${BASE_URL}/banners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bannerData),
  });
  if (!response.ok) throw new Error('Tạo banner thất bại');
  return response.json();
}
