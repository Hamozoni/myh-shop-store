"use client";
import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../../lip/fetchData';
import { AppContext } from '../../contextProvider';

import Loading from "../../loading";
import { useRouter } from 'next/navigation';

function orderPage() {

  const [orders,setOrders] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  const {currentUser: {id}} = useContext(AppContext);

  const router = useRouter()

  if(!id) {
     router.push('/auth/login');

     return;
  }


  useEffect(()=> {

    setIsLoading(true);

      fetchData(`orders?userId=${id}`)
      .then((data)=> {
        console.log(data)
      })
      .catch((error)=> {
        console.log(error)
      })
      .finally(()=> {
           setIsLoading(false)
      })


  },[id]);

  if(isLoading) return <Loading />

  return (
    <div>orderPage</div>
  )
}

export default orderPage