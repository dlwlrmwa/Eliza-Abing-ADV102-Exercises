import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let IconComponent;
                    if (route.name === "index") {
                        iconName = "home";
                        IconComponent = FontAwesome;
                    } else if (route.name === "exercises") {
                        iconName = "edit";
                        IconComponent = MaterialIcons;
                    }
                    return (
                        <IconComponent
                            name={iconName}
                            size={size || 24}
                            color={focused ? "#D6336C" : "black"}
                        />
                    );
                },
                tabBarActiveTintColor: "#D6336C",
                tabBarInactiveTintColor: "rgb(22, 23, 23)",
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="exercises"
                options={{
                    title: "Exercises",
                }}
            />
        </Tabs>
    );
}