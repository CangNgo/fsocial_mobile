import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";

import Input from "./input";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  title: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  inputStyle?: StyleProp<TextStyle>;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  title,
  placeholder,
  secureTextEntry = false,
  keyboardType,
  inputStyle,
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          title={title}
          placeholder={placeholder}
          keyboardType={keyboardType}
          inputStyle={inputStyle}
          value={value ?? ""}
          onChangeText={onChange}
          error={error?.message}
          secureTextEntry = {secureTextEntry}
        />
      )}
    />
  );
}

export default FormInput;
