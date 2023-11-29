import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";


type RouteDetailParams ={
    Order: {
        number: string | number;
        order_id: string | number;
    };
}

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
    const route = useRoute<OrderRouteProps>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa: {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name="trash-2" size={25} color="#FF3F4b" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF'}}>Pizzas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF'}}>Pizza de calabresa</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    placeholder="1"
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                    value="1"
                    style={[styles.input, {width: "60%", textAlign: "center", height: "90%", marginTop: 10} ]}
                />

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginRight: 8,
    },
    header:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        marginTop: 24,
    },
    input:{
        backgroundColor: "#101026",
        borderRadius: 4,
        width: "100%",
        height: 50,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 8,
        color: "#fff",
        fontSize: 20,
    },
    qtdContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    qtdText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },

});