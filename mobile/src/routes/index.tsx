import React, {useContext} from "react";

import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/AuthContext";


import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
    const { isAuthenticated } = useContext(AuthContext);
    const loading = false;

    if (loading) {
        return (
            <View 
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1d1d2e"
            }}
            >
                <ActivityIndicator size={60} color="#fff" />

            </View>

            
        );
    }

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    );
}


export default Routes;