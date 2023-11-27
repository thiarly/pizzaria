import { useState, FormEvent } from 'react';
import Head from 'next/head';
import { Header } from "../../components/Header"
import styles from './styles.module.scss'

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        alert("Categeoria cadastrada com sucesso" + name)
    }
    return (
        <>
        <Head>
            <title>TC Pizzaria - Categoria</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Nome da categoria"
                        className={styles.input}
                        value={name}
                        onChange={event => setName(event.target.value)}
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