"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import {verificationAction} from "../../../actions/verification"

export function VerificationForm() {

    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(null);
    const [isLoading,startTransition] = useTransition();

    const token = useSearchParams().get("token")

    useEffect(()=> {
        
        setError(null);
        setSuccess(null);

        if(!token) {
            setError("no token");
            return;
        }

        startTransition(()=> {
            verificationAction(token)
            .then((data)=>{
                setError(data.error);
                setSuccess(data.success)

            })
        })

    },[token]);


  return (
    <div className="flex justify-center items-center">
        <ScaleLoader color="#333"/>
    </div>
  )
}
