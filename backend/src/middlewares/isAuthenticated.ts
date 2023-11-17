import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Receber o token
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    // Verificação da JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET não está definido");
        return response.status(500).send("Erro interno do servidor");
    }

    try {
        const { sub } = verify(token, jwtSecret) as Payload;
  
        return next();
        
    } catch (err) {
        return response.status(401).end();
    }
}
