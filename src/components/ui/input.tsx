import { COLORS } from "@/utils/variable-color";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View
} from "react-native";

interface InputProps {
  placeholder: string;
  title: string;
  value: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText: (value: unknown) => void;
}

const Input = ({
  placeholder,
  title,
  value,
  error,
  secureTextEntry = false,
  keyboardType,
  onChangeText,
  inputStyle,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(secureTextEntry);
  const handleShow = () => {
    return setIsHidden(!isHidden)
  }
  return (
    <Pressable style={[styles.container]}>
      <Text style={styles.label}>{title}</Text>
      <View
        style={[
          styles.input_container,
          { borderColor: isFocus ? COLORS.primary : COLORS.border },
        ]}
      >
        <View>
          <TextInput
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            style={[styles.input, inputStyle]}
            secureTextEntry={isHidden}
          />
          {secureTextEntry && (
            <Entypo onPress={handleShow} style={styles.eye} name={!isHidden? "eye": "eye-with-line"} size={24} color="black" />
          )}
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </Pressable>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    marginBottom: 10
  },
  input_container: {
    height: 50,
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderRadius: 24
  },
  input: {
  },
  label: {
    fontSize: 16,
    paddingLeft: 14,
    fontWeight: 600
  },
  error: {
    marginTop: -5,
    color: "red",
    paddingLeft: 14
  },
  eye: {
    position: "absolute",
    right: 7,
    top: 7
  }
});
