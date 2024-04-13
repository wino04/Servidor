import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username es requerido',
        invalid_type_error: 'Usuario no es string',
    }),
    
    email: z.string({
        required_error: 'Email es necesario',
    })
    .email({
        message:'Email is not valid',
    }),
    password: z.string({
        required_error:'Password es requerida',
    })
    .min(6,{
        message: 'Pasword es mas larga de 6',
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email es requerido',
    })
    .email({
        message:'Email no valido',
    }),
    password: z.string({
        required_error:'Password es requerido',
    })
    .min(6,{
        message:'Password es muy grande',
    }),
});