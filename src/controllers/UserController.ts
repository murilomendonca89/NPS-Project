import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body
        
        const userRepositiry = getRepository(User)

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