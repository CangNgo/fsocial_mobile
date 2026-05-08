import * as Device from 'expo-device';
import { Platform } from "react-native";
import api from '../axios';

// expo-notifications requires a native dev build — not available in Expo Go
let Notifications: typeof import('expo-notifications') | null = null;
try {
    Notifications = require('expo-notifications');
    Notifications!.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false
        })
    });
} catch {
    console.warn('[Notifications] Native module not available — run `expo run:android` for full support');
}

class NotificationService {

    async setupAndroidChannel(): Promise<void> {
        if (Platform.OS !== "android" || !Notifications) return;
        await Notifications.setNotificationChannelAsync("default", {
            name: "Default",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    async registerForPushNotifications(): Promise<string | null> {
        if (!Notifications) return null;
        if (!Device.isDevice && !__DEV__) {
            console.warn('Push notification chỉ chạy trên thiết bị thật');
            return null;
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.warn('User từ chối quyền notification');
            return null;
        }

        await this.setupAndroidChannel();

        try {
            const tokenData = await Notifications.getDevicePushTokenAsync();
            console.log(`[${Platform.OS}] device token:`, tokenData.data);
            return tokenData.data;
        } catch (err) {
            console.error('Failed to get device token:', err);
            return null;
        }
    }

    async registerTokenWithBackend(userId: string, token: string) {
        try {
            await api.post("/notification/register-token", {
                userId,
                token,
                deviceType: Platform.OS,
            })
            console.log('[Notifications] Token registered with backend successfully');

        } catch (error) {
            console.error('Failed to register token:', error);
        }
    }

}


export default new NotificationService()