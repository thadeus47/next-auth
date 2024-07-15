"use client";

import * as z from "zod";
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";

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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email:"",
            password:"",
        },
    });
    
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success)
            })
        });

    }

    return (
        <CardWrapper
          headerLabel="Forgot your password?"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
          
        >
           <Form {...form}>
             <form 
               onSubmit={form.handleSubmit(onSubmit)}
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
                                  disabled={isPending}
                                  placeholder="john.doe@gmail.com"
                                  type="email" 
                                /> 
                            </FormControl>  
                            <FormMessage />
                        </FormItem>
                    )}
                 />
                 
              </div>
              <FormError  message={error}/>
              <FormSuccess message={success}/>
              <Button 
                 disabled={isPending}
                 type="submit"
                 className="w-full"
              >
               Send reset email
              </Button>
             </form>
           </Form>
        </CardWrapper>
    )
}