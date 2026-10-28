import { z } from 'zod';

export const SignUpSchema = z
.object({
    email: z
        .string()
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain a number'),
    confirmPassword: z
        .string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confimPassword']
});

export type SignUpInput = z.infer<typeof SignUpSchema>;