import * as SecureStore from 'expo-secure-store';

const   ACCESS_TOKEN = "access_token"
const REFRESH_TOKEN = "refresh_token"

export const tokenStore  = { 
    saveTokens: async (accessToken:string, refreshToken: string) => { 
        await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken); 
        await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
    },
    getAccessToken: async () => {
        return await SecureStore.getItemAsync(ACCESS_TOKEN)
    },
    getRefreshToken: async () => {
        return await SecureStore.getItemAsync(REFRESH_TOKEN)
    }, 
    clearTokens: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN);
  },
}