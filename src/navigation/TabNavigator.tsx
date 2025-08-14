import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Home, Search, Notification, Account } from '../screens/tabs';
import { StyleSheet } from 'react-native';
import NotificationScreen from '../screens/tabs/NotificationScreen';
import { BottomTabParamList } from '@/types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabNavigator() {

    return (
        <Tab.Navigator
            id={undefined}
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    if (route.name === 'Home') {
                        iconName = focused ? 'trending-up' : 'trending-up-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search-outline' : 'search-outline';
                    } else if (route.name === 'Notifications') {
                        iconName = focused ? 'notifications-outline' : 'notifications-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'person-outline' : 'person-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#006340',   // Màu khi tab được chọn
                tabBarInactiveTintColor: 'gray',    // Màu khi tab không chọn
                tabBarIconStyle: { marginTop: 10 }
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ title: 'Trang chủ' }} />
            <Tab.Screen name="Search" component={Search} options={{ title: 'Tìm kiếm' }} />
            <Tab.Screen name="Notifications" component={NotificationScreen} options={{ title: 'Thông báo' }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'Tài khoản' }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // height: 83
    }
})