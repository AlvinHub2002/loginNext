'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { GalleryVerticalEnd } from "lucide-react"
import axios from 'axios'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PasswordInput } from '@/components/ui/password-input'
import { useRouter, useParams } from 'next/navigation';

// Schema for password validation
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export default function ResetPasswordPreview() {

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = params.token;
    if (token) {
      setLoading(true);
      try {
        // Assuming an async reset password function
        console.log(values)
        await axios.put(process.env.NEXT_PUBLIC_SERVER_DOMAIN + `/api/v1/update-password`, {
          token: token,
          newPassword: values.confirmPassword
        });
        toast.success(
          'Password reset successful. You can now log in with your new password.',
        )
        // Redirect to the login page after 10 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000); // 10000ms = 10 seconds
      } catch (error: any) {
        console.log('Error resetting password', error)
        toast.error(error.response.data.message || error.message || 'Failed to reset the password. Please try again.')
      } finally {
        setLoading(false);
      }
    }
  }

  return (


    <div className="grid max-h-[calc(100vh-56px)] overflow-hidden w-full  lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start mb-20">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            GEMS Forms
          </a>
        </div>
        <div className="flex items-center justify-center h-screen p-4">
          <div className="w-full h-screen max-w-lg">
            <Card className="mx-auto max-w-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription>
                  Enter your new password to reset your password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid gap-4">
                      {/* New Password Field */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="password">New Password</FormLabel>
                            <FormControl>
                              <PasswordInput
                                id="password"
                                placeholder="******"
                                autoComplete="new-password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Confirm Password Field */}
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="confirmPassword">
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <PasswordInput
                                id="confirmPassword"
                                placeholder="******"
                                autoComplete="new-password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "verifying..." : "Submit"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

  )
}
