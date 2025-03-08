import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import i18n from './lang';

const Stack = createStackNavigator();

export default function App() {
    const isRTL = i18n.locale === 'ar' || i18n.locale === 'he'; // Add more RTL languages if necessary

    if (isRTL) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
    } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
