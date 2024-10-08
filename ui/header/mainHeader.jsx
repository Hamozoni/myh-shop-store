"use client";
import Link from "next/link";
import { useContext } from "react";
import {usePathname} from "next/navigation"
// components
import {HeaderUserBar} from "../models/headerUserBar";
import {SearchBar} from "./components/searchBar";
import {UserAddress} from "./components/userAddress";
import {HeaderCart} from "./components/headerCart";
import {MobileMenu} from "../models/mobileMenu";
import {LikedList} from "./components/likedList"
import { HeaderCategories } from "./components/headerCategories";
// app context
import { AppContext } from "../../app/contextProvider";

export const MainHeader = ()=> {

    const pathname = usePathname();

    const className = {
        flex:  'flex items-center gap-4 relative',
    };

  const {innerWidth} = useContext(AppContext)


  return (

    pathname?.startsWith("/admin") ? null :
    <header className="sticky top-0 left-0 w-full max-w-full z-50 py-2 px-4 lg:px-8 bg-white dark:bg-black border-t-8 border-teal-100">
        <div className={`${className.flex} justify-between lg:gap-6 w-full`}>
            <div className="flex items-center gap-2">
                {
                    innerWidth < 768 && 
                    <MobileMenu/>
                    
                }
                <Link 
                    href='/' 
                    className=' capitalize text-2xl lg:text-3xl font-extrabold text-teal-500 dark:text-teal-200'
                    >
                    fashion
                </Link>
            </div>
            <section className={`${className.flex} flex-1 justify-end`}>
                {
                    innerWidth > 767 && 
                    <HeaderCategories />
                    
                }
                <SearchBar />
                {
                    innerWidth > 991 ? 
                    <UserAddress/> : null
                }
                <LikedList />
                <HeaderCart/>
                <HeaderUserBar />
            </section>
        </div>
    </header>
  )
};
