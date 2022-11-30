
import prismaClient from '../../prisma'

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
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        return user;
    }
}
export { CreateUserService };