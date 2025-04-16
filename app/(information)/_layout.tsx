import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="about" 
                options={{
                    title: "About", // Set a custom title if needed
                }}
            />
            <Stack.Screen 
                name="contact" 
                options={{
                    title: "Contact", // Set a custom title if needed
                }}
            />
        </Stack>
    );
}

