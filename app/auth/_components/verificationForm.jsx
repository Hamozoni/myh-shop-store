// "use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import {verificationAction} from "../../../actions/auth/verification"
import { ErrorSucces } from "./errorSucces";
import Link from "next/link";

export function VerificationForm(context) {


    // const [error,setError] = useState(null);
    // const [success,setSuccess] = useState(null);
    // const [isLoading,startTransition] = useTransition();

    // const searchPaams = useSearchParams();

    // const token = searchPaams.get('token');

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
    <div className="">
        {
            isLoading ? 
            <ScaleLoader color="#2dd4bf"/>
            : <ErrorSucces error={error} success={success} /> 
        }
        {
            success ? 
            <div className="text-center mt-5">
              <Link
                  className='w-full p-4 capitalize text-teal-950 hover:scale-110 dark:text-teal-50 font-bold'
                  href='/auth/login'
                  >back to login
              </Link>
             </div>
             : null
        }       
    </div>
  )
}
