import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {

    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" width={190} height={60} alt="TC Pizzaria" />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/category">
                        categoria
                    </Link>
                    <Link href="/product">
                        Cardapio
                    </Link>

                    <button type="button" aria-label="Sair" onClick={signOut}>
                        <FiLogOut color="#FFF" size={20} />
                    </button>
                    
                </nav>
            </div>
            
        </header>
    )
}
