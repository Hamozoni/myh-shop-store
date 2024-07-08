"use client";
import { useState } from "react";
// components
import { SubCatories } from "./headerCategories";
import Overlay from "../../../components/Overlay";
// icons
import { TiThMenuOutline } from "react-icons/ti";
import { GiTireIronCross } from "react-icons/gi";
import { IoIosArrowForward,IoIosArrowUp } from "react-icons/io";
// categories data
import { categoriesData } from "../../../data/categoriesData";
import Image from "next/image";


const MobileMenu = () => {
  
  const [isCategory,setIsCategory] = useState(false);
  const [openedSubCategoyIndex,setOpenedSubCategoyIndex] = useState(null)
  
  const MobileCategories = ()=> {


    const handleSubCatgoryOpen = (index)=> {
      if(index === openedSubCategoyIndex) {
        setOpenedSubCategoyIndex(null);
      }else {
        setOpenedSubCategoyIndex(index);

      }
    };

    return (
      <>
         <Overlay onClick={()=> setIsCategory(false)} />
        <div className="capitalize fixed min-w-[300px] left-3 z-[70] lg:left-8 top-[70px] w-[300px] bg-gray-50 rounded-md border border-teal-100 shadow-md">
            <header className="flex items-center justify-between p-3">
                <h4 className="text-teal-950 text-xl font-bold">categories</h4>
                <button><GiTireIronCross/></button>
            </header>
            <div className="h-[500px] max-h-[500px] overflow-y-auto">
              <ul className="py-3 h-fit min-h-fit">
                  {
                      categoriesData?.map(({name,imagePath,sub},index)=>(
                        <li 
                            key={name} 
                            className="p-3" 
                            onClick={()=> handleSubCatgoryOpen(index)}
                            >
                          <div className="flex items-center justify-between cursor-pointer rounded-md p-3 border-2 border-gray-200 hover:bg-gray-100">
                            <div className="flex items-center gap-2">
                              <Image className='rounded-md' src={imagePath} width={50} alt={name}/>
                              <h5 className="text-teal-950 font-bold text-xl">{name} fashion</h5>
                            </div>
                            {
                              index === openedSubCategoyIndex ? 
                              <IoIosArrowUp /> :
                              <IoIosArrowForward />
                            }
                          </div>
                          {
                            openedSubCategoyIndex === index &&
                            <SubCatories 
                              subCategories={sub}
                              setIsSubCategories={setIsCategory}
                              />
                          }
                        </li>
                      ))
                  }
              </ul>
            </div>
        </div>
      </>
    )
  }
    const className = {
        menuContainer: 'flex items-center justify-center fixed left-0 z-50 w-full bg-green-100',
    };

  return (
    <section>
        <h3 onClick={()=> setIsCategory(true)} className="cursor-pointer">
            <TiThMenuOutline size={26} />
        </h3>
        {
           isCategory &&
          <MobileCategories />
        }
    </section>
  )
}

export default MobileMenu