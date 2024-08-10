"use client";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { ButtonWithIcon } from "../../../../../ui/buttons/buttons";
import { IoMdAdd } from "react-icons/io";
import { CardHeader } from "./productCard";
import { ProductColors } from "./productColors";
export const AddOffer = ({product})=> {

    const [isOfferModel,setIsOfferModel] = useState(false)
    return (
        <>
            <div className="absolute -top-6 right-2">
                <div className="max-w-[100px]">
                    <ButtonWithIcon 
                        text={isOfferModel ? 'open':'offer' }
                        Icon={isOfferModel ? FaMinus : IoMdAdd} 
                        type={isOfferModel ? 'delete' :'primary'}
                        onClick={()=> 
                        setIsOfferModel(true)} 
                        />
                </div>
            </div>
            {
                isOfferModel ? 
                <div className=" capitalize">
                    <div onClick={()=> setIsOfferModel(false)} className="z-[100] fixed top-0 left-0 h-screen w-screen dark:bg-white bg-black opacity-35">
                    </div>
                    <div className="fixed z-[102] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-fit min-w-[300px] sm:min-w-[600px] lg:min-w-[900px] max-w-full p-5 rounded-md bg-gray-100">
                        <h5 className="text-teal-950 font-bold text-lg mb-5">adding offer to </h5>
                        <CardHeader product={product}/>
                        <div className="">
                            <h6 className='my-3 text-teal-950 font-bold text-sm'>pleace select a color : </h6>
                            <div className="flex items-center justify-center gap-3 flex-wrap border border-teal-300 rounded-md p-3">
                                {
                                    product?.colors?.map((color)=> (
                                        <div key={color?.id} className="border-2 border-teal-300 rounded-md">
                                            <ProductColors color={color} sizes={product?.sizes} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                : null

            }
        </>
    )
};
