import React, { useRef } from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native'; // Nhập ParamListBase
import { Ionicons } from '@expo/vector-icons';
import { Home, Search, Account } from '../screens/tabs';
import { StyleSheet } from 'react-native';
import NotificationScreen from '../screens/tabs/NotificationScreen';
import { BottomTabParamList } from '@/types';

import eventBus from '../utils/Evenbus';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabNavigator() {
    const homeTabPressTime = useRef(0);

    return (
        <Tab.Navigator
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
                tabBarActiveTintColor: '#006340',
                tabBarInactiveTintColor: 'gray',
                tabBarIconStyle: { marginTop: 10 },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ title: 'Trang chủ' }}
                listeners={({ navigation }: { navigation: BottomTabNavigationProp<ParamListBase> }) => ({
                    tabPress: (e: { preventDefault: () => void }) => {
                        const isFocused = navigation.isFocused();

                        if (isFocused) {
                            e.preventDefault();

                            const now = Date.now();
                            const Delay = 300;

                            if (now - homeTabPressTime.current < Delay) {
                                eventBus.emit('REFRESH_HOME');
                            } else {
                                eventBus.emit('SCROLL_HOME_TOP');
                            }
                            homeTabPressTime.current = now;
                        }
                    },
                })}
            />
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
    },
});