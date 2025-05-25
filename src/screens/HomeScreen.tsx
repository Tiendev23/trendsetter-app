import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import { fetchBanners } from '../api/apiClient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners()
      .then(data => setBanners(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <View style={styles.center}><Text>{error}</Text></View>;

  return (
    <FlatList
      data={banners}
      keyExtractor={item => item._id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image source={{ uri: item.image }} style={{ width, height: 200 }} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
