import { useState, FormEvent, useContext } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '../../contexts/AuthContext'

import Link from 'next/link'

export default function SignUp() {

  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()

    if (name === '' || email === '' || password === '') {
      alert ('Preencha todos os campos')
      return;
    }

    setLoading(true)

    let data ={
      name,
      email,  
      password
    }

    await signUp(data)

    setLoading(false)

  }

  return (
    <>
    <Head>
      <title>TC Pizzaria - Faça seu cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="TC Pizzaria" />

      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form onSubmit={handleSignUp}>
          <Input
            placeholder='Digite seu nome'
            type='text'
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <Input
            placeholder='Digite seu email'
            type='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
            <Input
            placeholder='Digite sua senha'
            type='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            type='submit'
            loading={loading}
          >
            Cadastrar
          </Button>
        </form>

        <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login.
        </Link>
       

      </div>
    </div>
    </>
  )
}
