import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFULT_USER_PASS,
  secret: process.env.JWT_SCRET,
  expiresIn: process.env.JWT_EXPIRED_IN,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  saltRound: process.env.JWT_SCRET_SALT_ROUND,
}
