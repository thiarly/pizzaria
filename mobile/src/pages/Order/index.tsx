import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteDetailParams ={
    Order: {
        mesa: string | number;
        order_id: string | number;
    };
}

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
    const route = useRoute<OrderRouteProps>();

    return (
        <View style={styles.container}>
            <Text>Tela de Pedidos</Text>
            <Text>
                {route.params.mesa}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1d1d2e",
        justifyContent: "center",
    },
});