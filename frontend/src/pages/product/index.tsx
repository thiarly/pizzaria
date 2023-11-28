import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { Header } from "../../components/Header"
import { canSSRAuth } from '../../utils/canSSRAuth';

import styles from './styles.module.scss'

import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { setupAPIClient } from '../../services/api';

type ItemProps = {
    id: number;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({categoryList}: CategoryProps) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);

    const [categories , setCategories] = useState(categoryList || []);
    const [categoriesSelected, setCategoriesSelected] = useState(0);

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

    function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>){
        const category = event.target.value;
        setCategoriesSelected(Number(category));
    }

    function handleRegister(event: FormEvent){
        event.preventDefault();

        try{
            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.warning('Preencha todos os campos');
                return;
            }

            const data = new FormData();

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', String(categories[categoriesSelected].id));
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();
            apiClient.post('/product', data).then((response) => {
                toast.success('Produto cadastrado com sucesso');
                setName('');
                setPrice('');
                setDescription('');
                setCategoriesSelected(0);
                setAvatarUrl('');
                setImageAvatar(null);
            }).catch((error) => {
                toast.error('Erro ao cadastrar produto');
            });

        }catch(err){
            console.log(err);
            toast.error('Erro ao cadastrar produto');
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

                <form className={styles.form} onSubmit={handleRegister}>

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

                    <select aria-label="Categoria do produto" value={categoriesSelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>

                    <input 
                        type="text"
                        placeholder="Nome do produto"
                        className={styles.input}
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <input 
                        type="text"
                        placeholder="Preço do produto"
                        className={styles.input}
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                    />

                    <textarea
                        placeholder="Descrição do produto"
                        className={styles.input}
                        value={description}
                        onChange={event => setDescription(event.target.value)}
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
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/category');
    
    return {
        props: {
            categoryList: response.data
        }
    }
})