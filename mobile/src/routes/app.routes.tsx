import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import { FinishOrder } from "../pages/FinishOrder";

export type StackPramsList = {
    Dashboard: undefined;
    Order: {
        number: string | undefined;
        order_id: string | undefined;
    };
    FinishOrder: {
        order_id: string | number | undefined;
        number: number | string | undefined;
    };
}



const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
             name="Dashboard" 
             component={Dashboard} 
            options={{headerShown: false}}
             />
            <Stack.Screen
                name="Order" 
                component={Order}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="FinishOrder"
                component={FinishOrder}
                options={{
                    headerShown: true,
                    title: "Finalizando",
                    headerStyle: {
                        backgroundColor: "#1d1d2e",
                    },
                    headerTintColor: "#fff",
                }}
            />
        </Stack.Navigator>
    );
}


export default AppRoutes;