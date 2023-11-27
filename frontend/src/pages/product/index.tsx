import Head from 'next/head';
import { Header } from "../../components/Header"
import { canSSRAuth } from '../../utils/canSSRAuth';

import styles from './styles.module.scss'

import toast from 'react-toastify';


export default function Product() {
    return (
        <>
        <Head>
            <title>TC Pizzaria - Cardapio</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <h1>Página de novo produto</h1>

                <form className={styles.form}>

                    <select aria-label="Categoria do produto">
                        <option>Pizza</option>
                        <option>Bebida</option>
                    </select>

                    <input 
                        type="text"
                        placeholder="Nome do produto"
                        className={styles.input}
                    />

                    <input 
                        type="text"
                        placeholder="Preço do produto"
                        className={styles.input}
                    />

                    <textarea
                        placeholder="Descrição do produto"
                        className={styles.input}
                    />

                    <button type='submit' className={styles.buttonAdd}>
                        Cadastrar
                    </button>
                </form>
            </main>
            
        </div>
        </>
    );
    }

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
})