import { canSSRAuth } from "../../utils/canSSRAuth"

export default function Dashboard() {
    return (
        <h1>Bem Vindo ao Dashboard</h1>
    )
}



export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
})