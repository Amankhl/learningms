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
import { register } from '@/actions/auth'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'



const authFormSchema = () => {
  return z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    role: z.enum(["STUDENT", "EDUCATOR"], {
      required_error: "Role is required",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
};
const Register = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const formSchema = authFormSchema()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "STUDENT",
      password: ""
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setErrorMessage('')
    try {
      const result = await register({
        name: values.name,
        email: values.email,
        role: values.role,
        password: values.password
      })
      if (!result.success) {
        setErrorMessage(result.message || "register failed. Try again.");
        return;
      }
      console.log("registration success", result);
      router.push('/Login')
    } catch (err) {
      setErrorMessage('Failed to create an account. Please try again.')
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-[100%] h-[65%] flex justify-center items-center flex-col gap-5'>
      <h1 className='font-semibold text-[2rem]'>Signup</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border p-10 w-[30%]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} autoComplete="off"/>
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} autoComplete="off"/>
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="EDUCATOR">Educator</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} autoComplete="new-password"/>
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
        <p className='font-medium text-[1rem]'>Already have an account? <Link href={'/Login'} className='text-blue-500'>login</Link></p>
      </Form>
    </div>
  )
}

export default Register