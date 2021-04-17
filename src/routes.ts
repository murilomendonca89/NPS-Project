import { Router } from 'express'
import { SendMailController } from './controllers/SendMailController'
import { SurveysController } from './controllers/SurveysController'
import { UserController } from './controllers/UserController'

const router = Router()

const sendMailController = new SendMailController()
const userController = new UserController()
const surveysController = new SurveysController()

router.post("/users", userController.create)

router.post("/surveys", surveysController.create)
router.get("/surveys", surveysController.show)

router.post("/sendMail", sendMailController.execute)

export { router }