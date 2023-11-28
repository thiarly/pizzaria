import { useState } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { FiRefreshCcw } from "react-icons/fi"
import { setupAPIClient } from "../../services/api"

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

export default function Dashboard({orders}: HomeProps) {

    const [ordersList, setOrdersList] = useState(orders || []);

    function handleOpenModalView(id: string | number){
        console.log('abrir modal');
        alert('abrir modal' + id);
    }

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
                <button title="refresh">
                    <FiRefreshCcw size={25} color="#3FFFa3" />
                </button>
            </div>
            <article className={styles.listOrders}>

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