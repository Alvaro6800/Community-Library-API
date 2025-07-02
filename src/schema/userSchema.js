import {z} from 'zod'
import { email } from 'zod/v4'

const userSchema = z.object({
    username: z.string().min(3, 'Username is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 charachters'),
    avatar: z.string().url('Invalid URL').optional()
});

const userIdSchema = z.object({
    userId: z.number().int().positive('User ID must be a positive integer')
});


export {userSchema, userIdSchema};