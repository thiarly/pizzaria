import { useState } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { FiRefreshCcw } from "react-icons/fi"
import { setupAPIClient } from "../../services/api"
import Modal from "react-modal"
import { ModalOrder } from "../../components/ModalOrder"

interface OrderProps {
    id: number;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string | number;
    amount: number;
    order_id: string | number;
    product_id: string | number;
    product: {
        id: string | number;
        name: string;
        description: string;
        price: number;
        banner: string;
        created_at: string;
        updated_at: string;
    }
    order:{
        id: string | number;
        table: string | number;
        status: boolean;
        name: string | null;
        created_at: string;
        updated_at: string;
    
    }
}

export default function Dashboard({orders}: HomeProps) {

    const [ordersList, setOrdersList] = useState(orders || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal(){
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string | number){
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }    
        });

        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishItem(id: string | number){
        const apiClient = setupAPIClient();
        await apiClient.put('/order/finish', {
            order_id: id,
        });

        const response = await apiClient.get('/orders');
        setOrdersList(response.data);

        setModalVisible(false);
    }


    async function handleRefreshOrders(){
        const apiClient = setupAPIClient();
        
        const response = await apiClient.get('/orders');
        setOrdersList(response.data);
    }


    Modal.setAppElement('#__next');

    return (
        <>
        <Head>
            <title>TC Pizzaria - Dashboard</title>
        </Head>
        <div>
            <Header />
        
        <main className={styles.container}>
            <div className={styles.containerHeader}>
                <h1>Últimos pedidos</h1>
                <button title="refresh" onClick={handleRefreshOrders}>
                    <FiRefreshCcw size={25} color="#3FFFa3" />
                </button>
            </div>
            <article className={styles.listOrders}>

                {ordersList.length === 0 && (
                    <span className={styles.listaVazia}>Nenhum pedido aberto foi encontrado...</span>
                )}

                {ordersList.map( item => (

                <section key={item.id} className={styles.orderItem}>
                <button title="tag" onClick={()=> handleOpenModalView(item.id)}>
                    <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>
                </button>
                </section>
                    
            ))}

            </article>
        </main>
            { modalVisible && (
            <ModalOrder
                isOpen={modalVisible}
                onRequestClose={handleCloseModal}
                order={modalItem}
                handleFinishOrder={handleFinishItem}

            />
            )}
        </div>
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    
    const response = await apiClient.get('/orders');

    console.log(response.data);
    
    return {
        props: {
            orders: response.data
        }
    }
})