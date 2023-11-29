import React from "react";

import { View, Text, StyleSheet } from "react-native";


interface ItemProps {
    data:{
        id: number;
        product_id: string | number;
        name: string;
        amount: string | number;
    }

}

export function ListItem({data}: ItemProps){
    return(
        <View style={styles.container}>
            <Text>LISTA DE ITEMS</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{

    }
});