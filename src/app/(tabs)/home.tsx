import { useState } from "react";
import { Alert, Text, View } from "react-native";

const Home = () => {
  const handleOnPress = () => {
    Alert.alert("hello");
  };

  const [text, setText] = useState<string>("");

  console.log(text);

  const handleChangeText = (text: string) => {
    setText(text);
  };
  return (
    <View style={{ margin: 20 }}>
      {/* <Button
        title="Press Me"
        onPress={handleOnPress}
        rightIcons={<Feather name="arrow-right" size={24} color="black" />}
      />
      <Input
        placeholder="Enter text..."
        title="Text Input"
        value={text}
        keyboardType="default"
        inputStyle= {{justifyContent: "flex-start"}}
        onChangeText={(value) => handleChangeText(String(value))}
      /> */}
      <Text>Home</Text>
    </View>
  );
};

export default Home;
