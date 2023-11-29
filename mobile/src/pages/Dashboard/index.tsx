import React, {useContext, useState} from "react";
import { 
    View, 
    Text, 
    Button, 
    SafeAreaView, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet,
    Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/AuthContext";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const [mesa, setMesa] = useState("");
    const { signOut } = useContext(AuthContext);

    function openOrder() {
        if(mesa === "") {
            alert("Informe o número da mesa!");
            return;
        }
        navigation.navigate("Order", { number: mesa, order_id: "7c7e5790-1081-4c5d-b861-c9ec7f8b3c80" });
    }

    return (
        <SafeAreaView style={styles.container}>

                <Image
                    style={styles.logo}
                    source={require("../../assets/logo1.png")}
                />
                
            <View style={styles.content}>
                <Text style={styles.title}>Novo Pedido</Text>
                <TextInput
                    placeholder="Nome da mesa"
                    placeholderTextColor="#F0F0F0"
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={setMesa}
                />

                <TouchableOpacity style={styles.button} onPress={openOrder}>
                    <Text style={styles.buttonText}>Abrir mesa</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            backgroundColor: "#1d1d2e",
            paddingVertical: 15,
        },
        
        content: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },

        title: {
            fontSize: 30,
            color: "#FFF",
            fontWeight: "bold",
            marginBottom: 30,
        },
        input: {
            width: "90%",
            height: 60,
            backgroundColor: "#101026",
            marginBottom: 12,
            borderRadius: 4,
            paddingHorizontal: 8,
            color: "#fff",
            textAlign: "center",
            fontSize: 20,
        },
        button: {
            width: "90%",
            height: 40,
            backgroundColor: "#3fffa3",
            borderRadius: 4,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#101026",
        },
        logo: {
            marginTop: 10,
        },

    });