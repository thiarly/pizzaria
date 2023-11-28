import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head'
import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { FiRefreshCcw } from "react-icons/fi"

export default function Dashboard() {
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
                <section className={styles.orderItem}>
                    <button title="tag">
                        <div className={styles.tag}></div>
                        <span>Mesa 30z</span>
                    </button>
                </section>
            </article>
        </main>
        </div>
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
})