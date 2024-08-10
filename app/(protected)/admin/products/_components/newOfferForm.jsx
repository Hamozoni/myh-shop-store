"use status";

import { useEffect, useRef, useState } from "react";
import { getCurrency } from "../../../../../lip/getCurrency";
import { ButtonWithIcon } from "../../../../../ui/buttons/buttons";
import { VscSaveAll } from "react-icons/vsc";
import { PostData } from "../../../../../lip/fetchData";
import {addingOfferSchema} from "../../../../../validationSchemas/newProductSchemas";

export const NewOfferForm = ({item})=> {
    const [priceInput,setPriceInput] = useState(0);
    const [dateInput,setDateInput] = useState(null);
    const [error,setError] = useState(null);

    const inputRef = useRef(null)
    useEffect(()=> {
        if(inputRef?.current) {
            inputRef?.current?.focus()
        }
    },[]);

    const handleSubmit = (e)=> {
        e.preventDefault();

        setError(null);

        if(item.priceInHalala >= priceInput) {
            setError('offer price should be less the original price');
            return
        }
        const formData = new FormData();
        formData.set('offerPrice',Number(priceInput));
        formData.set('expiresDate',dateInput);

        console.log(dateInput)

       const validate = addingOfferSchema.safeParse(Object.fromEntries(formData.entries()));

       if(validate.success){

       }else {
           console.log(JSON.parse(validate.error));
       }
    };

    const className = {
        smallHead : 'text-sm font-bold text-teal-950'
    }

    return (
        <form onSubmit={(e)=> handleSubmit(e)} className=" mt-8 mb-3">
            <div className="flex items-center gap-3 ">
                <div className="flex-1">
                    <label 
                        className={className.smallHead}
                        htmlFor="newOffer"
                        >old price: {getCurrency(item?.priceInHalala)}
                    </label>
                    <div className="flex items-center my-3 gap-3 w-full rounded-md bg-white overflow-hidden px-3">
                        <input 
                                ref={inputRef}
                                className="w-full p-3"
                                onChange={(e)=> setPriceInput(+e.target.value)} 
                                type="number" 
                                name="offerPrice" 
                                id="newOffer" 
                                required
                                />
                        <p className={className.smallHead}>  
                            {getCurrency(priceInput)}
                        </p>
                    </div>

                </div>
                <div className="flex-1">
                    <label className={className.smallHead} htmlFor="date">
                        offer expires at: 
                    </label>
                    <input 
                        onClick={(e)=> setDateInput(e.target.value)}
                        className="w-full rounded-md bg-white overflow-hidden p-3 my-3" 
                        type="datetime-local" 
                        name="" 
                        id="date" 
                       />
                </div>

            </div>
            <ButtonWithIcon text='submit' Icon={VscSaveAll} type='save' />
        </form>
    )
}