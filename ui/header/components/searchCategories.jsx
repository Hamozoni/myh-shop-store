"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Overlay from "../../../components/Overlay";


const categories = ["all","men","women","kids"]

function SearchCategories({category,setCategory}) {
  
  const [isCategory,setIsCategory] = useState(false);

  const className = {
    catgory: `flex items-center min-h-full p-2 text-md font-medium cursor-pointer bg-slate-300 capitalize`,
    categoryUl: ' absolute left-0 top-10 min-w-fit rounded-md bg-green-100 capitalize overflow-hidden z-50',
    categoryLi: ' cursor-pointer py-2 px-4 min-w-fit hover:bg-green-300',
  };

  const setActiveCategory = (category)=> {
    setCategory(category);
    setIsCategory(false);
  };

  return (
    <div className="relative">
      <div 
          className={className.catgory} 
          onClick={()=> setIsCategory(!isCategory)}
          >
          <h6 className="w-[55px] min-w-fit">{category}</h6>
          <IoMdArrowDropdown/>
      </div>
      {
        isCategory && (
          <>
           <Overlay onClick={()=> setIsCategory(false) } />
          <ul className={className.categoryUl}>
            {
              categories?.map(cate=> (
                <li
                  key={cate}
                  className={`${className.categoryLi} ${category === cate ? "bg-green-200 border-b border-green-500" :""}`} 
                  onClick={()=> setActiveCategory(cate) }
                  >{cate}
                </li>

              ))
            }
          </ul>
          </>
        )
      }
  </div>
  )
}

export default SearchCategories