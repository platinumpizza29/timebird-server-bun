import * as z from "zod"

const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).optional(), // optinal is there for register and login
  email: z.string().email(),
  password: z.string().min(8),
  hourly_rate: z.number().default(0.00),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

type User = z.infer<typeof userSchema>

export { User, userSchema }
