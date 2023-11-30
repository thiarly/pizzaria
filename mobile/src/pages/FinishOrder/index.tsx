import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

export function FinishOrder(){
    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
                <Text style={styles.title}>Mesa: 30</Text>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Finalizar pedido</Text>
                <Feather name="shopping-cart" size={24} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: "center",
        justifyContent: "center",
    },
    alert: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 15,
    },

      title: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: '#3fffa3',
      },

    button: {
        backgroundColor: "#3FFfA3",
        borderRadius: 4,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "65%",
    },
    buttonText: {
        fontSize: 18,
        color: "#1d1d2e",
        marginRight: 4,
        fontWeight: "bold",
    },
});