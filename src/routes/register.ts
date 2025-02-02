import { Context } from "elysia"
import { userSchema } from "../models/user"
import { prisma } from "../utils/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import errorMap from "zod/lib/locales/en"

// routes/register.ts
export default {
  path: '/register',
  handler: async ({ body, set }: Context) => {
    try {
      const parsedData = userSchema.parse(body)
      // check whether user exists or not
      const validUser = await prisma.user.findUnique({
        where: {
          email: parsedData.email
        }
      })
      if (validUser) {
        set.status = 400
        return {
          message: "User already exists",
          status: 400
        }
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(parsedData.password, 10)
      // create a new jwt token
      const secret = Bun.env.SECRET || "This is my secret"

      //save the new user to db
      const newUser = await prisma.user.create({
        data: {
          name: parsedData.name,
          email: parsedData.email,
          hourlyRate: parsedData.hourly_rate,
          password: hashedPassword
        }
      })
      const token = jwt.sign({ id: newUser.id }, secret)

      // return jwt token
      return {
        message: "user created",
        token: token,
        status: 201
      }
    } catch (error) {
      set.status = 500
      console.log(error)
    }

    // remember to return a json
  }
} 
