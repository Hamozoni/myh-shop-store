"use client";

import { useEffect, useState } from "react";
import {z} from 'zod';

const sizesZSchema = z.object({
    name: z.enum(['xs','s','m','l','xl','2xl','3xl','4xl','5xl']),
    description: z.string().min(3),
    productId: z.string()
})


export default function Sizes({id,setdata,className}) {

    const [sizes,setSizes] = useState([{
        name: '',
        description: '',
        productId: id
    }]);

    const [errors,setErrors] = useState(null);


    const addMore = ()=> {
        setSizes(prev=> [...prev,{name: '',description: '',productId: id}])
    }

    const removeField = (leng)=> {
        setSizes(prev=> {
            prev.length = leng - 1;
            return [...prev]
        })
    };

    useEffect(()=> {
        const test = sizesZSchema.array().safeParse(sizes);

        if(test.success){
            setErrors(null)
            setdata([...sizes]);
        }else {
            setErrors(JSON.parse(test?.error))
        }

    },[sizes]);

  return (
    <div>
        <h4 className={`${className.label} pb-3`}>sizes </h4>
        <div  className={className.inputsDev}>
            {
                sizes.map((_,i)=> (
                    <div className="md:flex items-center gap-3 w-full" key={i}>
                        <div className="md:w-1/2" >
                            <label >name :</label>
                            <input 
                                type="text" 
                                className={className.inputClass} 
                                placeholder="enter the name of your size..."
                                onChange={e=> {
                                    setSizes(prev=> {
                                        prev[i].name = e.target.value

                                        return [...prev]
                                    })
                                }}
                             />
                            {
                                (errors && errors.find((e=> e.path[0] === i )) !== undefined) ? 
                                    <p className={className.error}>{errors?.find((e=> e.path[1] === 'name'))?.message}</p>
                                :''
                            }
                        </div>
                        <div className="md:w-1/2">
                            <label >description :</label>
                            <input 
                                className={className.inputClass} 
                                type="text" 
                                placeholder="enter the description of your size..."
                                onChange={e=> {
                                    setSizes(prev=> {
                                        prev[i].description = e.target.value

                                        return [...prev]
                                    })
                                }}
                                 />
                             {
                                (errors && errors.find((e=> e.path[0] === i )) !== undefined) ? 
                                    <p className={className.error}>{errors?.find((e=> e.path[1] === 'description'))?.message}</p>
                                :''
                            }
                        </div>
                    </div>
                ))
            }
            <div className="flex items-center gap-4 w-fit mx-auto text-center cursor-pointer py-3">

                <p className="font-bold px-4 py-1  rounded-lg border-slate-200 border hover:bg-slate-200 " onClick={addMore}>add more field</p>
                {
                    sizes.length > 1 ?
                <p className="text-red-600 hover:font-bold" onClick={()=> removeField(sizes.length)}>delete field</p>
                :''
                }

            </div>
        </div>
    </div>
  )
}
