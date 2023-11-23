import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <>
    <Head>
      <title>TC Pizzaria - Faça seu login</title>
    </Head>
    <div className={styles.container}>
      <Image src={logoImg} alt="TC Pizzaria" />

      <div className={styles.login}>
        <form>
          <Input
            placeholder='Digite seu email'
            type='email'
          />
          <Input
            placeholder='Digite sua senha'
            type='password'
          />
          <Button
            type='submit'
            loading={false}
          >
            Acessar
          </Button>
        </form>

      </div>
    </div>
    </>
  )
}
