import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from "../services/errors/AuthTokenError";

export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);

        const token = cookies["@tcpizza.token"];

        if (!token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        try {
            return await fn(context);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(context, "@tcpizza.token");
                destroyCookie(context, "@tcpizza.refreshToken");

                return {
                    redirect: {
                        destination: "/",
                        permanent: false,
                    },
                };
            }

            // Aqui, você precisa decidir o que fazer se um erro que não seja AuthTokenError for capturado.
            // Por exemplo, você pode retornar um erro 500 ou redirecionar para uma página de erro.
            // Este é um exemplo de redirecionamento para uma página de erro:
            return {
                redirect: {
                    destination: "/error",
                    permanent: false,
                },
            };
        }
    }
}
