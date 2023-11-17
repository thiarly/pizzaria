import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface AuthRequest{
    email: string;
    password: string;
}

const jwtSecret = process.env.JWT_SECRET as string;


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

        // se deu tudo certo vamos gerar o token
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            jwtSecret, // usando a variável verificada
            {
                subject: user.id,
                expiresIn: "30d"
            }
        );
        


        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }