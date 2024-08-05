"use client";
import { useEffect, useState } from "react";

import { MdPendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { GiReturnArrow } from "react-icons/gi";
import { IoIosCloudDownload } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";

import { fetchData } from "../../../../lip/fetchData";
import Loading from "../../../loading";
import {Error} from "../../../../ui/components/error";
import { ButtonWithIcon } from "../../../../ui/buttons/buttons";
import {OrderCard} from "../_components/orderCard";
import { OrderStatusChart } from "../_components/orderStatusChart";

 
export const navStatus = [
    {name: 'pending',Icon: MdPendingActions},
    {name: 'processing',Icon: LuSettings2},
    {name: 'completed',Icon: GrCompliance},
    {name: 'cancelled',Icon: GiReturnArrow},
];

// PENDING
// PROCESSING
// COMPLETED
// CANCELLED


const className = {
    li: 'relative flex items-center gap-2 before:absolute before:-bottom-2  before:left-1 before:w-0 hover:before:w-full before:h-[1px]',
    title_1: "text-teal-950 dark:text-teal-50 text-lg font-bold mb-2",
    title_2: "text-teal-900 dark:text-teal-100 text-sm font-bold mb-2",
}


export default function ordersPage () {

    const [status,setStatus] = useState('pending');
    const [orders,setOrders] = useState([]);
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isLoadingMorde,setIsLoadingMore] = useState(false);
    const [isMordeOrders,setIsMordeOrders] = useState(true);
    const [page,setPage] = useState(1);



    const fetchOrders = (page,isMore)=> {
        setError(null);
        fetchData(`orders/byStatus?status=${status?.toUpperCase()}&page=${page}`)
        .then((data)=> {
            if(data.length === 0) {
                setIsMordeOrders(false)
            }
            if(isMore) {
                setOrders(prev=> [...prev,...data]);
            }else {
                setOrders(data);
            }
        })
        .catch((error)=> {
            setError(error);
            console.log(error)
        })
        .finally(()=> {
            setIsLoading(false);
            setIsLoadingMore(false)
        })
    }

    useEffect(()=> {
        setIsLoading(true);
        setIsLoadingMore(true);
        setIsMordeOrders(true)
        setPage(1);
        fetchOrders(1,false);
    },[status]);

    const loadMoreOrders = ()=> {
        if(isMordeOrders) {
            setIsLoadingMore(true);
            fetchOrders(page + 1,true);
            setPage(page + 1);
        }
    }

    return (
        <div className="p-3 lg:px-8">
            <nav className="p-3 my-5">
                <ul className="flex items-center justify-center cursor-pointer gap-4 text-teal-950 dark:text-teal-50 text-[16px] font-bold capitalize">
                {
                    navStatus?.map(({name,Icon})=> (
                        <li 
                            onClick={()=> setStatus(name)}
                            key={name} 
                            className={`${status === name ? 'text-teal-300 before:w-full before:bg-teal-300' : 'before:bg-teal-950 dark:before:bg-teal-50'} ${className.li}`}>
                            <Icon size={22}/> {name}
                       </li>

                    ))
                }
                </ul>
            </nav>
            <OrderStatusChart />
            <div className="max-w-full">
                {
                    isLoading ? <Loading /> : !!error ? <Error onClick={fetchOrders}/> :
                    orders?.map((order)=> (
                        <OrderCard key={order.id} data={order} setOrders={setOrders} />
                    ))
                }
                {
                    isMordeOrders ? 
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