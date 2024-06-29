"use client";

import React, { useContext} from 'react'
// icons
import { TiStarFullOutline,TiStarHalfOutline } from "react-icons/ti";
import { CiStar } from "react-icons/ci";
// context
import {ReviewsContext} from "./reviewsContext";

const reviewsStars = new Array(5).fill('star')

const reviewsAverage = () => {

    const {reviewsAvg} = useContext(ReviewsContext);

  return (
    <div className="flex items-center gap-2 mb-3">
        <h5 
            className="text-xl font-bold text-green-950"
            >{reviewsAvg?.toFixed(1) || 0} out of 5
        </h5>
        <div className="flex items-center text-yellow-400 text-[30px]">
            {
                reviewsStars?.map((_,index)=> (

                    (reviewsAvg > index && reviewsAvg < index + 1)  ? 
                    <TiStarHalfOutline />
                    :reviewsAvg > index ?
                    <TiStarFullOutline /> :
                    <CiStar />
                       
                ))
            }
        </div>
    </div>
  )
}

export default reviewsAverage