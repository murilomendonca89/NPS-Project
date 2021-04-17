import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UsersRepository'
import * as yup from 'yup'
import { AppError } from '../errors/AppError';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (err) {
            throw new AppError(err)
        }
        
        const userRepositiry = getCustomRepository(UserRepository)

        const userAlreadyExists = await userRepositiry.findOne({
            email
        })

        if(userAlreadyExists) {
            throw new AppError("User already exist!")
        }

        const user = userRepositiry.create({
            name,
            email
        })

        await userRepositiry.save(user)

        return res.status(201).json(user)
    }
}

export { UserController }