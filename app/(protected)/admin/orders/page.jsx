"use client";
import { useCallback, useEffect, useState } from "react";

import { MdPendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { GiReturnArrow } from "react-icons/gi";
import { IoIosCloudDownload } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";

import { fetchData } from "@/lip/fetchData";
import Loading from "../../../loading";
import {Error} from "@/ui/components/error";
import { ButtonWithIcon } from "@/ui/buttons/buttons";
import {OrderCard} from "./_components/orderCard";

 
export const navStatus = [
    {name: 'pending',Icon: MdPendingActions},
    {name: 'processing',Icon: LuSettings2},
    {name: 'completed',Icon: GrCompliance},
    {name: 'cancelled',Icon: GiReturnArrow},
];

const className = {
    li: 'relative flex items-center gap-2 before:absolute before:-bottom-2  before:left-1 before:w-0 hover:before:w-full before:h-[1px] bg-gray-50 px-4 py-1 rounded-md',
    title_1: "text-teal-950 dark:text-teal-50 text-lg font-bold mb-2",
    title_2: "text-teal-900 dark:text-teal-100 text-sm font-bold mb-2",
}


export default function OrdersPage () {

    const [status,setStatus] = useState('pending');
    const [orders,setOrders] = useState([]);
    const [isError,setIsError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isLoadingMorde,setIsLoadingMore] = useState(false);
    const [page,setPage] = useState(1);
    const [ordersNum,setOrdersNum] = useState(0)



    const fetchOrders = useCallback((page,isMore)=> {
        setIsError(null);
        setOrdersNum(0)
        fetchData(`orders/byStatus?status=${status?.toUpperCase()}&page=${page}`)
        .then((data)=> {
            setOrdersNum(data?.orderNumber)
            if(isMore) {
                setOrders(prev=> [...prev,...data?.orders]);
            }else {
                setOrders(data?.orders);
            }
        })
        .catch((error)=> {
            setIsError(error);
        })
        .finally(()=> {
            setIsLoading(false);
            setIsLoadingMore(false)
        })
    },[status]);

    useEffect(()=> {
        setIsLoading(true);
        setIsLoadingMore(true);
        setPage(1);
        fetchOrders(1,false);
    },[fetchOrders]);

    const loadMoreOrders = ()=> {
        if(isMordeOrders) {
            setIsLoadingMore(true);
            fetchOrders(page + 1,true);
            setPage(page + 1);
        }
    }

    return (
        <div className="p-3 lg:px-8">
            <nav className="mb-5">
                <ul className="flex py-5 overflow-x-auto items-center sm:justify-center cursor-pointer gap-4 text-teal-950 dark:text-teal-50 text-[16px] font-bold capitalize">
                {
                    navStatus?.map(({name,Icon})=> (
                        <li 
                            onClick={()=> setStatus(name)}
                            key={name} 
                            className={`${status === name ? 'bg-teal-300 text-teal-950 before:w-full before:bg-teal-300' : 'before:bg-teal-950 dark:before:bg-teal-50 dark:bg-stone-900'} ${className.li}`}>
                            <Icon size={22}/> {name} { status === name  ? ordersNum : ''}
                       </li>

                    ))
                }
                </ul>
            </nav>
            <div className="max-w-full">
                {
                    isLoading ? <Loading /> 
                    : !!isError ? 
                    <Error 
                        onClick={()=> fetchOrders(page,false)}
                        /> 
                    :
                    orders?.map((order,index)=> (
                        <OrderCard 
                            key={order.id} 
                            index={index} 
                            data={order} 
                            setOrdersNum={setOrdersNum} 
                            setOrders={setOrders} 
                            />
                    ))
                }
                {
                    ordersNum <  orders?.length ? 
                    <div className="max-w-[150px] mx-auto my-3">

                        <ButtonWithIcon 
                            text='load more'
                            type='save'
                            Icon={IoIosCloudDownload}
                            disabled={isLoadingMorde}
                            onClick={loadMoreOrders}
                            />
                    </div>
                    : null
                }
            </div>

        </div>
    )
}