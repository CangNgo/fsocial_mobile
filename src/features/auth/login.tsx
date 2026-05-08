import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import fbLogo from "@/assets/images/facebook.png";
import ggLogo from "@/assets/images/google.png";
import logo from "@/assets/images/logo_remove_no_text.png";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import { COLORS } from "@/utils/variable-color";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import LogoText from "./component/welcom";
import { useAuthStore } from "./store/auth-store";
import { LoginForm, loginSchema } from "./validations/login.validation";

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [errorMessage, setErrorMessage] = useState<String>()

  const onSubmit = async (data: LoginForm) => {
    try {
      await login({ username: data.email, password: data.password })
      setErrorMessage("")
      router.replace("/(tabs)/home")
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Đăng nhập thất bại. Vui lòng thử lại."
      setErrorMessage(message)
    }
  };

  const handleForgot = () => {
    console.log("forgot")
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }} accessible={false}>
      <LinearGradient style={{ flex: 1 }} colors={["#f5d3c4", "#FFFFFF"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <Image style={{ width: 100, height: 100 }} source={logo} />
            <LogoText />
            <Text style={styles.logo_text}>Elevate your daily energy.</Text>
          </View>
          <View style={styles.layout_form}>
            <View style={styles.form}>
              <FormInput
                control={control}
                name="email"
                title="Email"
                placeholder="Vui lòng nhập email"
                keyboardType="email-address"
              />
              <FormInput
                control={control}
                name="password"
                title="Password"
                placeholder="Vui lòng nhập mật khẩu"
                secureTextEntry
              />
              <View style={styles.forgot_container}>
                {errorMessage && <Text style={styles.error_message}>{errorMessage}</Text>}
                <Pressable onPress={handleForgot} style={styles.forgot}><Text style={styles.forgot_content}>Forgot</Text></Pressable>
              </View>
              <Button onPress={handleSubmit(onSubmit)} loading={isLoading} styleChildren={{ paddingVertical: 10 }} >Login</Button>
              <View style={styles.separation_container}>
                <Text style={styles.separation}>Connect with</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Button
                  variant="outline"
                  styleContainer={{ flex: 1 }}
                  styleChildren={{ paddingVertical: 4 }}
                  leftIcons={
                    <Image style={{ width: 20, height: 20 }} source={ggLogo} />
                  }
                >Goole</Button>
                <Button
                  variant="outline"
                  styleContainer={{ flex: 1 }}
                  styleChildren={{ paddingVertical: 4 }}
                  leftIcons={
                    <Image style={{ width: 20, height: 20 }} source={fbLogo} />
                  }
                >Facebook</Button>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Pressable>
  );
};

export default LoginPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  layout_form: {
    flex: 0.7,
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 34,
    padding: 24,
    margin: 30,
    marginTop: 10,
    paddingBottom: 50
  },
  logo_text: {
    fontSize: 20
  },
  btn_login: {
  },
  forgot_container: {

  },
  forgot: {
    alignItems: "flex-end",
    marginRight: 12,
    marginBottom: 10
  },
  forgot_content: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.primary
  },
  error_message: {
    color: "red",
    marginRight: 12,
  }
  ,
  separation_container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.surfaceDim,
    marginTop: 10,
    marginBottom: 20
  },
  separation: {
    backgroundColor: "white",
    fontWeight: 600,
    color: COLORS.textSecondary,
    paddingHorizontal: 10,
    position: "relative",
    top: 10
  }
})