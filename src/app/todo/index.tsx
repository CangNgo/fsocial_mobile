import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Toast } from "./../../../node_modules/react-native-toast-message/lib/src/Toast";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export default function TodoApp() {
  const [todo, setTodo] = useState<string>();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = () => {
    if (todo) {
      const randomId = Math.floor(Math.random() * 1000);
      setTodos([...todos, { id: randomId, title: todo, completed: false }]);
      setTodo("");
      return;
    }

    alert("Bạn chưa nhập việc cần làm");
  };

  const handleChangeTodo = (value: string) => {
    setTodo(value);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Todo App</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text>Nhập việc cần làm</Text>
          <TextInput
            value={todo}
            style={styles.form_input}
            onChangeText={(value) => handleChangeTodo(value)}
            placeholder="Nhập những việc cần làm"
          />
          <View style={styles.form_button}>
            <Button
              onPress={handleAddTodo}
              color={"#FF5B00"}
              title="Thêm mới việc cần làm"
            />
          </View>
        </View>

        {/* List todo */}
        <View style={styles.list_todo}>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id + ""}
            renderItem={(data) => {
              return (
                <Pressable style={styles.list_todo_item}>
                  <View style={styles.group_todo}>
                    <Text>{data.item.title}</Text>
                    <FontAwesome
                      name="trash"
                      size={24}
                      color="red"
                      onPress={() => handleDeleteTodo(data.item.id)}
                    />
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
        <Toast position="top" visibilityTime={2000} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  header: {
    height: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    height: 30,
    fontSize: 20,
    fontWeight: 600,
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 10,
  },
  form_input: {
    borderBottomWidth: 1,
    borderColor: "black",
  },
  form_button: {
    marginTop: 10,
    borderRadius: 20,
  },
  list_todo: {
    marginTop: 10,
    marginHorizontal: 20,
    height: 200,
    borderWidth: 1,
    paddingBottom: 10,
  },
  list_todo_item: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    fontSize: 20,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  group_todo: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 10,
  },
});
