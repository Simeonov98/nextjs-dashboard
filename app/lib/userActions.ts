'use server'
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import Form from '../ui/invoices/create-form';
const FormSchema = z.object({
    name: z.coerce.string({
        invalid_type_error:'Please enter a real name.',
    }),
    email: z.string().email(),
    password: z.string().min(6),
    roleId: z.number(),
    managerId: z.number()
})


export async function createUser(prevState:any,formData: FormData){
    const userFormData=Object.fromEntries(formData);
    const validatedFields=FormSchema.safeParse(userFormData);
    if(!validatedFields.success){
        const formErrors=
            validatedFields.error.flatten().fieldErrors
    }
 
    try{
        await prisma.users.create({
            data:{
                email: validatedFields.
            }
        })
    }
}