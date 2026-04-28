import { Tabs } from "expo-router";

const TabsLayout = () => {

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ headerTitle: "Homepage", headerShown: false }}
      />
      <Tabs.Screen
        name="post"
        options={{ headerTitle: "Đăng bài viết", headerShown: false }}
      />
      <Tabs.Screen
        name="chat"
        options={{ headerTitle: "Chat", headerShown: false }}
      />
      <Tabs.Screen
        name="notification"
        options={{ headerTitle: "Thông báo", headerShown: false }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{ headerTitle: "Trang cá nhân", headerShown: false }}
      />
    </Tabs>
  );
};

export default TabsLayout;
