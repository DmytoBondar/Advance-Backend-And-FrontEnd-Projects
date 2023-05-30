import { User } from './users.model'

export const findLastUserId = async () => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return user?.id
}

export const generateUserId = async () => {
  const userId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incUserId = (parseInt(userId) + 1).toString().padStart(5, '0')
  return incUserId
}
