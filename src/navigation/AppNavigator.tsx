import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

// Định nghĩa kiểu cho danh sách tham số của stack navigator.
// Điều này giúp đảm bảo an toàn kiểu khi điều hướng và truy cập tham số.
export type RootStackParamList = {
  Home: undefined; // Màn hình Home không yêu cầu tham số
  ProductDetail: { productId: string }; // Màn hình ProductDetail yêu cầu một productId kiểu string (điều chỉnh nếu cần)
  Cart: undefined; // Màn hình Cart không yêu cầu tham số
  // Thêm các màn hình khác và tham số của chúng ở đây nếu cần
};

// Khởi tạo stack navigator với RootStackParamList đã định nghĩa
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" id={undefined}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trendsetter', headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Chi tiết sản phẩm' }}/>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
    </Stack.Navigator>
  );
}
