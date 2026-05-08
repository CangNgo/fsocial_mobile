import notificationService from '@/services/notifications/notification-service';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

// expo-notifications requires a native dev build — not available in Expo Go
type NotificationsModule = typeof import('expo-notifications');
type EventSubscription = ReturnType<NotificationsModule['addNotificationReceivedListener']>;
type NotificationResponse = Awaited<ReturnType<NotificationsModule['getLastNotificationResponseAsync']>>;

let Notifications: NotificationsModule | null = null;
try {
  Notifications = require('expo-notifications');
} catch {
  // silenced — already warned in notification-service.ts
}

// Gọi hook ở top-level để không vi phạm Rules of Hooks
const useLastResponse = (): NotificationResponse | null | undefined => {
  if (Notifications) return Notifications.useLastNotificationResponse();
  return null;
};

interface UseNotificationsOptions {
  userId: string | null;
  onNotificationTap?: (data: Record<string, any> | undefined) => void;
}

export function useNotifications({ userId, onNotificationTap }: UseNotificationsOptions) {
  const router = useRouter();
  const receivedRef = useRef<EventSubscription | null>(null);
  const responseRef = useRef<EventSubscription | null>(null);
  const registeredUserRef = useRef<string | null>(null);

  // 1. Đăng ký token khi userId thay đổi, skip nếu đã đăng ký cùng userId
  useEffect(() => {
    if (!userId || registeredUserRef.current === userId) return;
    notificationService.registerForPushNotifications().then(token => {
      if (token) {
        notificationService.registerTokenWithBackend(userId, token);
        useAuthStore.getState().setFcmToken(token);
        registeredUserRef.current = userId;
      }
    });
  }, [userId]);

  // 2. Đăng ký các listener
  useEffect(() => {
    if (!Notifications) return;

    receivedRef.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Foreground noti received:', notification.request.content);
    });

    responseRef.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      console.log('User tapped noti:', data);
      if (onNotificationTap) {
        onNotificationTap(data);
      } else if (data?.screen) {
        router.push(data.screen as any);
      }
    });

    return () => {
      receivedRef.current?.remove();
      responseRef.current?.remove();
    };
  }, [router, onNotificationTap]);

  // 3. Killed state — handle response khi app mở từ notification
  const lastResponse = useLastResponse();
  useEffect(() => {
    if (!lastResponse) return;
    const data = lastResponse.notification.request.content.data;
    if (onNotificationTap) {
      onNotificationTap(data);
    } else if (data?.screen) {
      router.push(data.screen as any);
    }
  }, [lastResponse, router, onNotificationTap]);
}
