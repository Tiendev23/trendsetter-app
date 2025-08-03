import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addFavorite, getFavorites } from '@/redux/features/product/favoriteSlice';

const STORAGE_KEY = 'liked_variant_ids';

type FavoriteContextType = {
  likedIds: string[];
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  clearLiked: () => void;
};

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const { user } = useContext(AuthContext)!;
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Load dữ liệu từ AsyncStorage khi app mở
  useEffect(() => {
    const loadLikedIds = async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        setLikedIds(JSON.parse(json));
      }
    };
    loadLikedIds();
  }, []);

  // ✅ Đồng bộ likedIds local lên server khi user đăng nhập
  useEffect(() => {
    if (user?._id) {
      if (likedIds.length > 0) {
        likedIds.forEach((variantId) => {
          dispatch(addFavorite({ _id: user._id, variantId }));
        });

        // Clear local sau khi sync
        clearLiked();
      }

      // Luôn fetch lại danh sách favorite từ server
      dispatch(getFavorites({ _id: user._id }));
    }
  }, [user?._id]);

  // ✅ Lưu lại likedIds vào AsyncStorage khi thay đổi
  useEffect(() => {
    const saveToStorage = async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
    };
    saveToStorage();
  }, [likedIds]);

  // ✅ Toggle like cho guest user
  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isLiked = (id: string) => likedIds.includes(id);

  const clearLiked = async () => {
    setLikedIds([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FavoriteContext.Provider
      value={{
        likedIds,
        toggleLike,
        isLiked,
        clearLiked,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
