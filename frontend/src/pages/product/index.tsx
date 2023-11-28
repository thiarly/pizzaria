import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { Header } from "../../components/Header"
import { canSSRAuth } from '../../utils/canSSRAuth';

import styles from './styles.module.scss'

import toast from 'react-toastify';

import { FiUpload } from 'react-icons/fi';

export default function Product() {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return;
        }

        const selectedImage = event.target.files[0];

       if(!selectedImage){
        return;
       }

       if (selectedImage.type === 'image/jpeg' || selectedImage.type === 'image/png'){
            setImageAvatar(selectedImage);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
           return;
       }

    }

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

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={30} color="#FFF" />
                        </span>
                        <input type="file" placeholder='input' accept='image/png, image/jpeg' onChange={handleFile}/>

                        {avatarUrl && (
                        <img 
                            className={styles.preview}
                            src={avatarUrl}
                            alt="Avatar"
                            width={250}
                            height={250} 
                        />
                    )}

        
                    </label>

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