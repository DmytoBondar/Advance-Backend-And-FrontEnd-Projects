import { Response, Request } from 'express'
import usersService from './users.service'

export const createUserControl = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const data = await usersService.createUserService(user)

    res.status(200).json({
      success: true,
      message: 'User Successfuly created!!',
      data: data,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User failed to created!!',
    })
  }
}
export default {
  createUserControl,
}
