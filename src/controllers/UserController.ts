import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UsersRepository'

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body
        
        const userRepositiry = getCustomRepository(UserRepository)

        const userAlreadyExists = await userRepositiry.findOne({
            email
        })

        if(userAlreadyExists) {
            return res.status(400).json({
                error: "User already exist."
            })
        }

        const user = userRepositiry.create({
            name,
            email
        })

        await userRepositiry.save(user)

        return res.json(user)
    }
}

export { UserController }