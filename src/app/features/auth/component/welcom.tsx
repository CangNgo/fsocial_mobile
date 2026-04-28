import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

import { COLORS } from "@/utils/variable-color";

interface LogoTextProps  { 
    textStyle?: StyleProp<TextStyle>
}

const LogoText = ( {textStyle} : LogoTextProps) => {
  return (
    <View style={styles.container}>
      <MaskedView
        maskElement={
          <View style={styles.maskWrapper}>
            <Text style={styles.text}>Haven</Text>
          </View>
        }
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.accentPurple]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={[styles.text, { opacity: 0 }, textStyle]}>Haven</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
};

export default LogoText;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  maskWrapper: {
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
