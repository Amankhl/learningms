'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from '@/actions/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


type FormType = 'login';
const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email("Provide a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })
}

const Login = ({ type }: { type: FormType }) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const result = await login({
                email: values.email,
                password: values.password
            });
            if (!result.success) {
                setErrorMessage(result.message || "Login failed. Try again.");
                return;
            }
            console.log("Login success", result);
            router.push('/')
        } catch (err) {
            setErrorMessage("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[100%] h-[85%] flex justify-center items-center flex-col gap-5'>
      <h1 className='font-semibold text-[2rem]'>Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border p-10 w-[30%] h-[46%]">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field}  autoComplete="off"/>
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" {...field} autoComplete="new-password"/>
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {errorMessage && (
                        <p className="text-red-600 text-sm">{errorMessage}</p>
                    )}
                    <Button type="submit">Submit</Button>
                </form>
                   <p className='font-medium text-[1rem]'>Don't have an account? <Link href={'/Register'} className='text-blue-500'>register</Link></p>
            </Form>
        </div>
    )
}

export default Login