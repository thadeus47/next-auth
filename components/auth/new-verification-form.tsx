'use client';

import { useCallback } from "react";
import {  BeatLoader} from "react-spinners";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const NewVerificationForm = () => {

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {}
       
    , []);


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