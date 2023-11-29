import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";

export type RouteDetailParams ={
    Order: {
        number: string | number;
        order_id: string | number;
    };
}

export type CategoryProps ={
    id: number;
    name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []> ([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [amount, setAmount] = useState('1');

    useEffect(() => {
        async function loadCategories() {
            try{
                const response = await api.get('/category');
                setCategory(response.data);
                setCategorySelected(response.data[0]);
            }catch(err){
                console.log(err);
            }
        }
        loadCategories();
    }, []);


    async function handleCloseOrder() {
        try{
            await api.delete('/order', {
                params:{
                    order_id: route.params.order_id
            }
        })
            
       navigation.goBack();


        }catch(err){
            console.log(err);
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
        setModalCategoryVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa: {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name="trash-2" size={25} color="#FF3F4b" />
                </TouchableOpacity>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true) }>
                <Text style={{ color: '#FFF'}}>
                    {categorySelected?.name}
                </Text>
                </TouchableOpacity>
            )}


            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF'}}>
                    Pizza de calabresa
                </Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    placeholder="1"
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                    value={String(amount)}
                    onChangeText={setAmount}
                    style={[styles.input, {width: "60%", textAlign: "center", height: "90%", marginTop: 10} ]}
                />

            </View>

            <View style={styles.actions}>
                    
                    <TouchableOpacity style={styles.buttonAdd}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Avançar</Text>
                    </TouchableOpacity>

            </View>

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>
            

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
        marginBottom: 15,
    },
    qtdText:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    actions:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    buttonAdd:{
        backgroundColor: "#3fd1ff",
        borderRadius: 4,
        width: "20%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026",
    },
    button:{
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        width: "75%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },


});