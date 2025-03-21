import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.linksContainer}>
                <Link href="/about" style={styles.linkText}>About</Link>
                <Link href="/contact" style={styles.linkText}>Contact</Link>
            </View>
            <Text style={styles.nameText}>Eliza Marie M. Abing</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(206, 36, 240, 0.6)", // Semi-transparent purple
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    linksContainer: {
        position: 'absolute',
        top: 40,
        flexDirection: 'row',
        gap: 20,
    },
    linkText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nameText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff', 
        textAlign: 'center',
        padding: 10,
        borderRadius: 8,
    },
});