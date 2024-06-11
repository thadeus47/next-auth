'use client';

import {  BeatLoader} from "react-spinners";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const NewVerificationForm = () => {
    return (
        <CardWrapper 
           headerLabel="Confirm your verification" 
           backButtonLabel="Back to login"
           backButtonHref="/auth/login"
           >
        <div className="flex items-center w-full justify-center">
           <BeatLoader />
        </div>
        </CardWrapper>
    )
}

export default NewVerificationForm;