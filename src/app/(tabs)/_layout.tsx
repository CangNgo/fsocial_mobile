import Button from "@/components/ui/Button";
import LogoText from "@/features/auth/component/welcom";
import { useCreatePostStore } from "@/features/post/stores/create-post";
import { COLORS } from "@/utils/variable-color";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

const TabsLayout = () => {
  const router = useRouter()
  const submitCreatePost = useCreatePostStore((state) => state.submit)
  const isPostDisabled = useCreatePostStore((state) =>
    state.content.text.trim().length === 0 && state.assets.length === 0
  )

  const handleSubmit = async () => {
    const statusCode = await submitCreatePost()
    console.log("res: ", statusCode)
    if (statusCode === 200) router.back()
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerTitleAlign: "center",
        tabBarStyle: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
        tabBarLabelStyle: { fontWeight: 900 },
        headerTitle: () => (<LogoText />)
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={`home-${focused ? "sharp" : "outline"}`} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={`chatbubble-${focused ? "sharp" : "outline"}`} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={`add-circle-${focused ? "sharp" : "outline"}`} size={size} color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="close"
              color={COLORS.textPrimary}
              size={28}
              style={{ marginLeft: 16 }}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <Button
              styleContainer={{
                alignSelf: "center",
                marginRight: 12,
                shadowOpacity: 0,
              }}
              styleContent={{ fontSize: 14 }}
              styleChildren={{ paddingVertical: 8, paddingHorizontal: 14 }}
              onPress={handleSubmit}
              disable={isPostDisabled}
            >
              Post
            </Button>
          )
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={`notifications-${focused ? "sharp" : "outline"}`} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={`person-${focused ? "sharp" : "outline"}`} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
