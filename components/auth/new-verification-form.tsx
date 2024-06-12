'use client';

import { useCallback, useEffect, useState } from "react";
import {  BeatLoader} from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Misssing token");
            return;
        }

       newVerification(token)
          .then((data) => {
            setSuccess(data.success);
            setError(data.error)
          })
          .catch(() => {
            setError("Something went wrong");
          })
    }, [token]);

    useEffect(() => {
      onSubmit();
    }, [onSubmit])
    

    return (
        <CardWrapper 
           headerLabel="Confirm your verification" 
           backButtonLabel="Back to login"
           backButtonHref="/auth/login"
           >
        <div className="flex items-center w-full justify-center">
           <BeatLoader />
           <FormSuccess message={success} />
           <FormError message={error} />
        </div>
        </CardWrapper>
    )
}

export default NewVerificationForm;