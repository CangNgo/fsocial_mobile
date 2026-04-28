import { COLORS } from "@/utils/variable-color";
import { LinearGradient } from "expo-linear-gradient";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "white" | "outline";

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: ButtonVariant;
  styleContainer?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<TextStyle>;
  styleIcon?: StyleProp<ViewStyle>;
  leftIcons?: React.ReactNode;
  rightIcons?: React.ReactNode;
}

const Button = ({
  title,
  onPress,
  variant = "primary",
  styleContainer,
  styleContent,
  styleIcon,
  leftIcons,
  rightIcons,
}: ButtonProps) => {
  const content = (
    <View style={styles.children}>
      {leftIcons && <View style={styleIcon}>{leftIcons}</View>}
      <Text style={[styles.text, textStyleByVariant[variant], styleContent]}>
        {title}
      </Text>
      {rightIcons && <View style={styleIcon}>{rightIcons}</View>}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        styles.container,
        containerStyleByVariant[variant],
        styleContainer,
      ]}
    >
      {variant === "primary" ? (
        <LinearGradient
          colors={[COLORS.gradient.primary.start, COLORS.gradient.primary.end]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </Pressable>
  );
};

export default Button;

const containerStyleByVariant: Record<ButtonVariant, ViewStyle> = {
  primary: {
    // shadow nhẹ cho button chính
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  white: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
};

const textStyleByVariant: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: COLORS.textOnPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  white: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 14,
  },
  outline: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: 14,
  },
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,        // pill shape — bo tròn hoàn toàn
    alignSelf: "stretch",
    overflow: "hidden",       // cần thiết để LinearGradient không tràn ra ngoài bo góc
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  children: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    textAlign: "center",
  },
});
