"use client";

import { fetchData } from "@/lip/fetchData";
import { LoadMoreBtn } from "@/ui/buttons/loadMoreBtn";
import { ProductCard } from "@/ui/cards/productCard";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export const ProductsContainer = ({products,count})=> {

    const searchParams = useSearchParams();
    const query = searchParams.get('query')

    const [data,setData] = useState(products);
    const [page,setPage] = useState(1);
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(null);

    useEffect(()=> {
        setData(products);
        console.log(products,count)
    },[products]);


    const handleMoreData = ()=> {
        setIsLoading(true);
        setIsError(null);

        fetchData(`search?query=${query}&page=${page + 1}`)
        .then((data)=> {
            setData(prev=> [...prev,...data?.products]);
            setPage(page + 1);
        })
        .catch((error)=> {
            setIsError(error)
        })
        .finally(()=> {
            setIsLoading(false)
        })
    };

    return (
        <div className="mt-5">
            <div className="flex items-center gap-5 flex-wrap">
                {
                    data?.map((product)=> (
                        <ProductCard key={product?.id} product={product} />
                    ))
                }

            </div>
            {
                count < data?.length ?
                <LoadMoreBtn 
                    isError={isError} 
                    isLoading={isLoading} 
                    onClick={handleMoreData}
                    />
                : null
            }
        </div>
    )
}