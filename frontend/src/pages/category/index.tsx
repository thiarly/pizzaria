import { useState, FormEvent } from 'react';
import Head from 'next/head';
import { Header } from "../../components/Header"
import styles from './styles.module.scss'

import { setupAPIClient } from '../../services/api';
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';

import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        
        if(name === ''){
            toast.warning('Preencha todos os campos');
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        }).then((response) => {
            toast.success('Categoria cadastrada com sucesso');
            setName('');
        }).catch((error) => {
            toast.error('Erro ao cadastrar categoria');
        });
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


    export const getServerSideProps = canSSRAuth(async (context) => {
        return {
            props: {}
        }
    })