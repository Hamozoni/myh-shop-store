
import AuthHeader from '../_components/authHeader';
import {verificationAction} from "../../../actions/auth/verification"
import { ErrorSucces } from '../_components/errorSucces';
import Link from 'next/link';

async function verificationPage(context) {

  const {searchParams} = context;
  const {token} = searchParams

  const data = await verificationAction(token)

  return (
    <div className="p-4 ">
        <div 
            className=" bg-white dark:bg-stone-950 w-[450px] max-w-full p-4 rounded-md shadow-md"
            >
             <AuthHeader text='confirming your verification...'/>

             <ErrorSucces error={data?.error} success={data?.success} /> 
             {
                data?.success ? 
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
    </div>
  )
}

export default verificationPage