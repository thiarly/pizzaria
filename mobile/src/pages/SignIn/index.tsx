import { useState, useContext } from "react";
import React from "react";
import { 
    View,
    Text, 
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
 } from "react-native";


import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        if(email === "" || password === "") {
            alert("Preencha todos os campos!");
            return;
        }

        await signIn({ email, password });
    }

    return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require("../../assets/logo1.png")}
        />
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Digite seu email"
                style={styles.input}
                placeholderTextColor="#F0F0F0"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Digite sua senha"
                style={styles.input}
                placeholderTextColor="#F0F0F0"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {loadingAuth ? (
                
                <ActivityIndicator size={25} color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>Acessar</Text>
                )}
            </TouchableOpacity>

        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        justifyContent: "center",
        alignItems: "center"
    },
    logo:{
        marginBottom: 18
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input:{
        width: "95%",
        height: 40,
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#fff"

    },
    button:{
        width: "95%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
    },
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: '#101026'
    }
})



