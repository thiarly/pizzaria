import prismaClient from "../../prisma";
import { compare } from "bcryptjs";


interface AuthRequest{
    email: string;
    password: string;
}


class AuthUserService{
    async execute ({email, password}: AuthRequest){
        
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user){
            throw new Error("Email/Senha incorretos");
        }
        //Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Senha incorretos");
        }

        //gerar um token jwt
        

        return {ok: true}
    }
}

export { AuthUserService }