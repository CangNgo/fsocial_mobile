import { COLORS } from "@/utils/variable-color";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
interface InputProps {
  placeholder: string;
  title: string;
  value: string;
  keyboardType?: KeyboardTypeOptions
  inputStyle?: StyleProp<TextStyle>;
  onChangeText: (value: unknown) => void;
}
const Input = ({
  placeholder,
  title,
  value,
  keyboardType,
  onChangeText,
  inputStyle,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <TextInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={[styles.input, inputStyle, { borderColor: isFocus ? COLORS.primary : COLORS.border }]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 8,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "red"
  },
});
