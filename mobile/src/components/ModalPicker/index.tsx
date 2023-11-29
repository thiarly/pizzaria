import React from "react";

import { 
    View, 
    Text, 
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView,
} from "react-native";


import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps {
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export function ModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item);
        handleCloseModal();
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.options} onPress={()=> onPressItem (item)}>
            <Text style={styles.item}>
                {item.name}
            </Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        opacity: 0.9,
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#8a8a8a",
        borderRadius: 4,
        padding: 20,
    },
    options: {
        borderBottomWidth: 1,
        borderBottomColor: "#8a8a8a",
        alignItems: "flex-start",
    },
    item:{
        fontSize: 14,
        margin: 18,
        fontWeight: "bold",
        color: "#101026",
    },
});