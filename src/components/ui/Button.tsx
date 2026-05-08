import { COLORS } from "@/utils/variable-color";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
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
  children: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  disable?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<TextStyle>;
  styleChildren?: StyleProp<ViewStyle>;
  styleIcon?: StyleProp<ViewStyle>;
  leftIcons?: React.ReactNode;
  rightIcons?: React.ReactNode;
}

const Button = ({
  children,
  onPress,
  variant = "primary",
  loading = false,
  disable = false,
  styleContainer,
  styleContent,
  styleChildren,
  styleIcon,
  leftIcons,
  rightIcons,
}: ButtonProps) => {
  const indicatorColor = variant === "primary" ? COLORS.textOnPrimary : COLORS.textPrimary;

  const content = (
    <View style={[styles.children, styleChildren]}>
      {loading ? (
        <ActivityIndicator size="small" color={indicatorColor} />
      ) : (
        <>
          {leftIcons && <View style={styleIcon}>{leftIcons}</View>}
          <Text style={[styles.text, textStyleByVariant[variant], styleContent]}>
            {children}
          </Text>
          {rightIcons && <View style={styleIcon}>{rightIcons}</View>}
        </>
      )}
    </View>
  );

  return (
    <Pressable
      onPress={loading || disable ? undefined : onPress}
      style={({ pressed }) => [
        { opacity: loading || disable ? 0.6 : pressed ? 0.7 : 1 },
        styles.container,
        containerStyleByVariant[variant],
        styleContainer,
      ]}
    >
      {variant === "primary" ? (
        <LinearGradient
          colors={[COLORS.gradient.primary.start, COLORS.gradient.primary.middle, COLORS.gradient.primary.end]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
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
    borderRadius: 999,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  children: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  text: {
    textAlign: "center",
  },
});
