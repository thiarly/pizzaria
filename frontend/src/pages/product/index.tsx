import Head from 'next/head';
import { Header } from "../../components/Header"

export default function Category() {
    return (
        <>
        <Head>
            <title>TC Pizzaria - Cardapio</title>
        </Head>
        <div>
            <Header />
            <h1>Cardapio</h1>
        </div>
        </>
    );
    }