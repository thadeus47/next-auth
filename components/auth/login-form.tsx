"use client";

import * as z from "zod";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/schemas";

import { Input } from "@/components/ui/input";

import { 
    Form, 
    FormControl, 
    FormField,
    FormItem, 
    FormLabel, 
    FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper"
export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email:"",
            password:"",
        },
    });
    
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
    }

    return(
        <CardWrapper
          headerLabel="Welcome Back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/register"
          showSocial
        >
           <Form {...form}>
             <form 
               onSubmit={form.handleSubmit(() => {})}
               className="space-y-6"
             >
              <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field}) => (

                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                               <Input
                                  {...field}
                                  placeholder="john.doe@gmail.com"
                                  type="email" 
                                /> 
                            </FormControl>
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field}) => (

                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                               <Input
                                  {...field}
                                  placeholder="*******"
                                  type="password" 
                                /> 
                            </FormControl>
                        </FormItem>
                    )}
                 />
              </div>
              <Button 
                 type="submit"
                 className="w-full"
              >
               Login
              </Button>
             </form>
           </Form>
        </CardWrapper>
    )
}