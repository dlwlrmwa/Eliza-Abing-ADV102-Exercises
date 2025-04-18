import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function Home() {
    return (
        <View style={styles.background}>
            <View style={styles.overlay}>
                {/* Navigation Bar */}
                <View style={styles.navbar}>
                    <Link href="/about" style={[styles.linkText, styles.aboutButton]}>About</Link>
                    <Link href="/contact" style={[styles.linkText, styles.contactButton]}>Contact</Link>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.nameText}>Eliza Marie M. Abing</Text>
                    <Text style={styles.nameText}>BSIT - 2B</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(206, 36, 240, 0.6)", // Light purple overlay
        justifyContent: "center",
        alignItems: "center",
    },
    navbar: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row', // Change from 'column' to 'row'
        justifyContent: 'center', // Center items horizontally
        alignItems: 'center',
        gap: 20, // Space between buttons
    },
    aboutButton: {
        backgroundColor: '#D6336C', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    contactButton: {
        backgroundColor: '#D6336C', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    linkText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    nameText: {
        fontSize: width > 600 ? 50 : 30, 
        fontWeight: "bold",
        color: '#fff',
        textAlign: "center",
    },
});