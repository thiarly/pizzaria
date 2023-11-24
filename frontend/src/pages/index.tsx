import { useContext, FormEvent, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'

import Link from 'next/link'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    let data ={
      email,  
      password
    }

    await signIn(data)

  }

  return (
    <>
    <Head>
      <title>TC Pizzaria - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="TC Pizzaria" />

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
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
            loading={false}
          >
            Acessar
          </Button>
        </form>

        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
       

      </div>
    </div>
    </>
  )
}
