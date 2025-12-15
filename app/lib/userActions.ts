'use server'
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import Form from '../ui/invoices/create-form';
const FormSchema = z.object({
    name: z.string({
        invalid_type_error:'Please enter a name with atleast 3 symbols.',
    }).min(3),
    email: z.string().email('Invalid email'),
    password: z.string().min(6,'Password must be at least 6 characters'),
    roleId: z.coerce.number()
})


export async function createUser(prevState:any,formData: FormData){
    const userFormData=Object.fromEntries(formData);
    console.log(userFormData)
    const validatedFields=FormSchema.safeParse(userFormData);
    if(!validatedFields.success){
        const formErrors=
            validatedFields.error.flatten().fieldErrors
            console.log('Form Errors', formErrors)
            return {
                error: 'Validation failed. Please check all fields.',
                fieldErrors: formErrors
            }
    }
    const hashPassword = await bcrypt.hash(validatedFields.data.password,10)

    try{
        await prisma.users.create({
            data:{
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                password: hashPassword,
                role:{
                    connect:{
                        id:validatedFields.data.roleId
                    }
                }
            }
        })
        return { success: true };
    }catch(error:any){
        if(error.code=='P2002'){
            return{
                error:{
                    email:['Email already in use.']
                }
            }
        }
        console.log('Error creating user:', error)
        return{
            error:'Something went wrong!?!'
        }
    }
}