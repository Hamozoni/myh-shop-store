"use status";

import { useEffect, useRef, useState } from "react";
import { getCurrency } from "@/lip/getCurrency";
import { ButtonWithIcon } from "@/ui/buttons/buttons";
import { VscSaveAll } from "react-icons/vsc";
import { FaRegCalendarCheck,FaCheck } from "react-icons/fa6";
import { FiGitCommit } from "react-icons/fi";

import {updateData } from "@/lip/fetchData";
import {addingOfferSchema} from "@/validationSchemas/newProductSchemas";
import {ZodError} from "@/ui/components/zodError"
import { Loading } from "@/ui/models/loading";
import { Error } from "@/ui/components/error";

export const NewOfferForm = ({item,setIsOfferModel,setProducts,product})=> {

    const [priceInput,setPriceInput] = useState(0);
    const [dateInput,setDateInput] = useState(null);
    const [validateError,setValidateError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);

    const inputRef = useRef(null)
    useEffect(()=> {
        if(inputRef?.current) {
            inputRef?.current?.focus()
        }
    },[]);

    const handleSubmit = (e)=> {
        setData(null)
        e.preventDefault();
        setValidateError(null);
        setError(null)
        setIsLoading(true)
        if(item.priceInHalala <= priceInput) {
            setValidateError([{path:['offerPrice'],message:'offer price should be less the original price'}]);
            setIsLoading(false)
            return
        }

        const data = {
            offerPrice: priceInput,
            expiresDate :  new Date(dateInput),
            id: item?.id
        }

       const validate = addingOfferSchema.safeParse(data);

       if(validate.success){
        updateData(`admin/offers?offerPrice=${priceInput}&expiresAt=${dateInput}&id=${item?.id}`)
            .then((data)=> {
                setProducts((prev)=> {
                    const productIndex = prev.findIndex(e=> e.id === product.id);
                    const colorIndex = product.colors.findIndex(e=> e.id === item.id);
                    prev[productIndex].colors.splice(colorIndex,1,data)
                    return [...prev];
                });
                setData(data);
            }).catch((error)=> {
                setError(error)
            }).finally(()=> {
                setIsLoading(false);
            })
       }else {
            setIsLoading(false)
           setValidateError(JSON.parse(validate.error))
       }
    };

    const className = {
        smallHead : 'text-sm font-bold text-teal-950 dark:text-teal-50'
    };

    const SuccessMessage = ()=> {
        return (
            <div className="mt-4">
                <div className="flex items-center gap-3">
                    <div className="text-center flex-1">
                        <FaRegCalendarCheck color="#14b8a6 " size={240} />
                    </div>
                    <div className="flex-1 capitalize">
                        <header className="mb-5 text-center">
                            <h5 className="text-center text-lg font-bold text-teal-950 dark:text-teal-50 mb-2">
                                sale price {getCurrency(priceInput)}
                            </h5>
                            <time 
                                className={className.smallHead}
                                datetime={new Date(dateInput)}>
                                expier date: {new Date(dateInput).toLocaleString()}
                            </time>
                        </header>
                        <ButtonWithIcon 
                            onClick={()=> setIsOfferModel(false)}
                            disabled={isLoading}
                            text='done' 
                            Icon={FaCheck} 
                            type='primary' />
                        <hr className="my-3" />

                        <ButtonWithIcon 
                            onClick={()=> setData(null)}
                            disabled={isLoading}
                            text='containue' 
                            Icon={FiGitCommit} 
                            type='save' />
                    </div>

                </div>
            </div>
        )
    };

    return (
        
        data ?  
        <SuccessMessage />
        : error ? 
        <Error onClick={()=> setError(null)} /> :
        <form onSubmit={(e)=> handleSubmit(e)} className=" mt-8 mb-3">
            {
                isLoading ? <Loading />: null
            }
            <div className="sm:flex items-center gap-3 mb-3 ">
                <div className="flex-1">
                    <label 
                        className={className.smallHead}
                        htmlFor="newOffer"
                        >old price: {getCurrency(item?.priceInHalala)}
                    </label>
                    <div className="flex items-center my-3 gap-3 w-full rounded-md bg-white dark:bg-stone-800 overflow-hidden px-3">
                        <p className={className.smallHead}>  
                            {getCurrency(priceInput)}
                        </p>
                        <input 
                                ref={inputRef}
                                className={`${className.smallHead} w-full p-3 bg-transparent`}
                                onChange={(e)=> setPriceInput(+e.target.value)} 
                                type="number" 
                                name="offerPrice" 
                                id="newOffer" 
                                required
                                placeholder="0.00"
                                min='100'
                                max={priceInput}
                                />
                    </div>
                    <ZodError error={validateError} field='offerPrice' />

                </div>
                <div className="flex-1">
                    <label className={className.smallHead} htmlFor="date">
                        offer expires at: 
                    </label>
                    <input 
                        onChange={(e)=> setDateInput(e.target.value)}
                        className={`${className.smallHead} w-full rounded-md bg-white dark:bg-stone-800 overflow-hidden p-3 my-3`} 
                        type="datetime-local" 
                        name="" 
                        id="date" 
                        />
                    <ZodError error={validateError} field='expiresDate' />
                </div>

            </div>
            <ButtonWithIcon 
                disabled={isLoading}
                text='submit' 
                Icon={VscSaveAll} 
                type='save' />
        </form>

        
    )
}