import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyProfile = () => {

  const router = useRouter()
  const handleLogin = () => {
    router.replace("/(auth)/login")
  }
  return (
    <SafeAreaView style={styles.safe}> 
      <Pressable onPress={handleLogin}>
      <Text>MyProfile</Text>
    </Pressable>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  safe: {
    flex: 1
  }
})