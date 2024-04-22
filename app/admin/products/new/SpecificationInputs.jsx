"use client"

import {  useEffect, useState } from "react"


export default function SpecificationInputs({id,setData,className}) {



    const [specificationArr,setSpecification] = useState([{ key:'',value: '',id,}]);

    console.log(specificationArr)

    const addMore = ()=> {
        setSpecification(prev=> {
            return [...prev,{
                key:'',
                value: '',
                id,
            }]
        })
    };

    useEffect(()=> {
        setData(prev => {
            prev.specifications = specificationArr.filter(el=> el !== undefined)
          return prev
        })
    },[specificationArr]);

    const handleDelete = (i)=> {
        if(i !== 0) {
            setSpecification(prev=> {
                console.log(i)
                
                prev[i] = undefined
             return[...prev]
            })
        }
    }

    const addKey = (e,i)=> {

       setSpecification(prev=> {
            prev[i].key = e.target.value;
            prev[i].id = id
            return [...prev]
           }
        )

     document.getElementById(`${'key-'+i}`).focus()
        
    }

    const addValue =  (e,i)=> {
           setSpecification(prev=> {
                prev[i].value = e.target.value;
                prev[i].id = id
                return [...prev]
            })
                document.getElementById(`${'value-'+i}`).focus()

    }

  return (
    <div className={className.inputsDev} >
        <div className="flex items-center justify-between">
            <h4 className={className.label} >Specifications :</h4>
        </div>
        {
            specificationArr?.map((el,i)=> (
                el !== undefined &&

                <div  className="flex align-middle gap-4">
                    <div className="flex items-center gap-3 w-1/2">
                        <label className={className.label} htmlFor={'key-'+i}>key:</label>
                        <input 
                            value={el.key}
                            className={className.inputClass}
                            onChange={e=> addKey(e,i)}
                            type="text" 
                            required  
                            id={'key-'+i} 
                            placeholder="enter your specifications key" 
                            />

                    </div>
                    <div className="flex items-center gap-3 w-1/2">
                        <label className={className.label} htmlFor={'value-'+i}>value:</label>
                        <input
                            className={className.inputClass}
                            value={el.value}
                            onChange={e=> addValue(e,i)}
                            type="text" 
                            required  
                            id={'value-'+i} 
                            placeholder="enter your specifications value" 
                          />
                    </div>
                    {
                        i === 0 ?  <p onClick={addMore}>more</p>:
                        <p onClick={()=> handleDelete(i)}>delete</p>
                    }
                </div>
            ))
        }
    </div>
  )
}
