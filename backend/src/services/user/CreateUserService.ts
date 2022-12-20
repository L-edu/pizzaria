
import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string
    email: string
    password: string
}
class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        //verificação de email
        if (!email) {
            throw new Error("Email incorreto")
        }
        //verificação de duplicidade no email
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (userAlreadyExists) {
            throw new Error("User already exists")
        }
        //criação de usuario 
        const passwordHash = await hash(password, 8);
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return user;
    }
}
export { CreateUserService };