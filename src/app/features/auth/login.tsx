import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import logo from "@/assets/images/logo_remove_no_text.png";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import LogoText from "./component/welcom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("")
  const handelEmail = (value: string) => {
    if (email === "") {
      Alert.alert("Vui lòng nhập email")
      return
    }
    setEmail(value)
  }


  return (
    <LinearGradient style={{ flex: 1 }} colors={["#f5d3c4", "#FFFFFF"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Image style={{ width: 100, height: 100 }} source={logo} />
          <LogoText />
          <Text style={styles.logo_text}>Elevate your daily energy.</Text>
        </View>
        <View style={styles.layout_form}>
          <View style={styles.form}></View>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginPage

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    borderRadius: 24, 
    padding: 24, 
    margin: 30, 
    marginTop: 10
  },
  logo_text: {
    fontSize: 20
  }
})