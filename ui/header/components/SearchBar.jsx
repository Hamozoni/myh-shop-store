"use client";

import { IoSearchSharp } from "react-icons/io5";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "../../../app/contextProvider";
import Overlay from "../../../components/Overlay";

function SearchBar() {


  const {innerWidth} = useContext(AppContext);
  const [isMobile,setIsMoble] = useState(false)
  const router = useRouter();

  const searchForm = useRef()

  const className = {
    flex : `flex items-center`,
    searchBox: 'rounded-full border border-teal-50 bg-white flex gap-2 items-center w-full p-1',
    serchBtn: 'bg-teal-50 min-w-fit rounded-full border-2 border-teal-200 text-teal-800 py-2.5 px-6 min-h-full'
  };

  const handleSubmit = ()=> {

    const formData = new FormData(searchForm?.current);
    const query = formData.get('query');

    if(query.length > 2){
      router.push(`/search?query=${query}`)
    }
  };

  const SearchForm = ({classN})=> {
    return (
      <section className={`${classN} ${className.flex} gap-4 flex-1 rounded-md`}>
         <form ref={searchForm} action={handleSubmit} className={className.searchBox}>
            <div className="w-full">
                <input
                    name="query"
                    className="w-full py-3 px-4 bg-transparent text-sm font-bold bg-gray-50 rounded-full border-2 focus:border-teal-200 "
                    type="search" 
                    placeholder="search myh store" 
                    />
            </div>
            <button className={className.serchBtn}>
                <IoSearchSharp size={22} />
            </button>
         </form>
    </section>
    )
  }
  
  return (
    <>
    {
      innerWidth > 720 ?
       <SearchForm className=''/>
    : (
      <>
      {
          isMobile &&
          <>
             <Overlay onClick={()=> setIsMoble(false)}/>
            <SearchForm classN='fixed left-0 top-1 w-full z-50'/>
          </>
      }
      <button 
      onClick={()=> setIsMoble(!isMobile)}
      className={className.serchBtn}>
        <IoSearchSharp size={22} />
      </button>
      </>
    )
    }
    
    </>
  )
}

export default SearchBar