import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, StatusBar } from 'react-native';
import { Button, Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import i18n from '../lang';
import KeyAuthAPI from '../KeyAuth';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert(i18n.t('login.validationError'));
            return;
        }

        setLoading(true);
        const response = await KeyAuthAPI.login(username, password);
        setLoading(false);

        if (response.success) {
            Alert.alert(i18n.t('login.success'));
            navigation.navigate('Dashboard', { userData: response.data });
        } else {
            Alert.alert(i18n.t('login.failed'), response.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#6200ea" barStyle="light-content" />
            <LottieView source={require('../../assets/login.json')} autoPlay loop style={styles.lottie} />

            <Animated.View entering={FadeIn} exiting={FadeOut}>
                <Text style={styles.title}>{i18n.t('login.title')}</Text>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(500)}>
                <TextInput
                    placeholder={i18n.t('login.username')}
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder={i18n.t('login.password')}
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                />
                <Button
                    mode="contained"
                    onPress={handleLogin}
                    style={styles.button}
                    loading={loading}
                    disabled={loading}
                >
                    {loading ? `${i18n.t('login.loginButton')}...` : i18n.t('login.loginButton')}
                </Button>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e2d',
    },
    lottie: {
        width: 250,
        height: 250,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '85%',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        width: '85%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#6200ea',
    },
});
