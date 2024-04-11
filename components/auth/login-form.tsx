import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


import { CardWrapper } from "@/components/auth/card-wrapper"
export const LoginForm = () => {
    return(
        <CardWrapper
          headerLabel="Welcome Back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/register"
          showSocial
        >
            Login Form!
        </CardWrapper>
    )
}