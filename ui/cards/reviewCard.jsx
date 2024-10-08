"use clent"
import { useContext, useState, useTransition } from "react";
import Image from "next/image"
// components
import {ButtonWithIcon} from "../buttons/buttons";
import {RatingStars} from "../productReviews/components/reviewsRating"
// icons
import { VscEdit } from "react-icons/vsc";
import { MdDelete,MdOutlineSaveAs } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
// server actions
import {removeReviewAction} from "../../actions/productReviews/removeReview";
import {updatereviewAction} from "../../actions/productReviews/updateReview";
// context
import { ReviewsContext } from "../productReviews/reviewsContext";
import { AppContext } from "../../app/contextProvider";
// overlay model
import {Overlay} from "../models/overlay";
import { FaUserLarge } from "react-icons/fa6";
const FIREBASE_IMAGES_URL = 'https://firebasestorage.googleapis.com/v0/b/e-commrerce.appspot.com/o/';

export function ReviewCard({review,index}) {
    // review data and user data context
    const {setReviews} = useContext(ReviewsContext)
    const {currentUser} = useContext(AppContext);

    const [loading,startTransition] = useTransition();
    // review card status
    const [isRemoveModle,setIsRemoveModle] = useState(false);
    const [isEdidable,setIsEdidable] = useState(false);
    const [reviewTitle,setReviewTitle] = useState(review?.rateTitle);
    const [reviewText,setReviewText] = useState(review?.rateText);
    const [rating,setRating] = useState(review?.rating);

    const handleRevomeReview = ()=> {

        startTransition(()=> {
            removeReviewAction(review?.id,review?.images)
            .then((data)=> {
                if(data?.success) {
                    setReviews(prev=> prev?.filter(e=> e.id !== review?.id))
                }
            })
        });

    };

    const handleUpdateReview = ()=> {

        startTransition(()=> {
            updatereviewAction(review?.id,
                {
                    rateTitle: reviewTitle,
                    rateText: reviewText,
                    rating: +rating
                }
            )
            .then(data=> {
                if(data?.data) {
                    setReviews(prev=> {
                        prev[index] = {...data?.data,auther:{name: currentUser?.name,image: currentUser?.image}}
                        return [...prev]
                    });
                };
            })
            .finally(()=>{
                setIsEdidable(false);
            })
        });
    };

    const className = {
        card: 'my-8 rounded-md p-3 border-x-2 border-x-teal-300 '
    }


// if review has been edited shows edit date
const updatedAt = Date.parse(review?.createdAt) < Date.parse(review?.updatedAt) ? "Edited at" :'';

  return (
        <div className={`${isEdidable ? 'border border-gray-100 dark:border-stone-700':' shadow-md border-b border-b-teal-50 dark:border-b-stone-800'} ${className.card} `}>
            <header className="flex items-center gap-2 pb-2">
                {
                    review?.auther?.image ?
                    <Image
                        className="rounded-md" 
                        src={review?.auther?.image} 
                        width={50} height={50} 
                        alt="auther"
                        />
                    :
                    <FaUserLarge
                        size={50} 
                        className="text-teal-900 dark:text-teal-100 rounded-md border border-teal-900 dark:border-teal-100" 
                   />
                }
                <section className="">
                    <h4 className="text-teal-950 dark:text-teal-50 font-bold text-lg">
                        {review?.auther?.name}
                    </h4>
                    <time 
                        className="text-teal-900 dark:text-teal-100 text-sm"
                        dateTime={new Date(review.createdAt).toDateString()}
                        >{updatedAt} {new Date(review?.updatedAt).toDateString()}
                    </time>
                </section>
            </header>
            <section className="flex items-center gap-2 mb-4">
                <RatingStars rating={rating} setRating={isEdidable ? setRating : ()=> ''}/>
                {
                    (isEdidable && review?.autherId === currentUser?.id) ?
                    <input 
                        className="border-b bg-transparent text-lg border-teal-200 text-teal-950 dark:text-teal-50 focus:border-teal-400"
                        type="text" 
                        value={reviewTitle}
                        onChange={(e)=> setReviewTitle(e.target.value)}
                        />
                    :
                  <h5 className="text-lg text-teal-950 dark:text-teal-50" >
                    {review?.rateTitle}
                </h5>
                }
            </section>
            <div className="">
                {
                    (isEdidable && review?.autherId === currentUser?.id) ? 
                    <textarea 
                        className="text-teal-900 bg-transparent dark:text-teal-100 text-sm font-bold h-[100px] focus:outline-none w-full border-b border-teal-200 focus:border-green-400"
                        value={reviewText}
                        onChange={(e)=> setReviewText(e.target.value)}
                        
                        >
                    </textarea>
                    :
                    <article 
                        className="text-teal-900 dark:text-teal-100  text-sm font-bold pb-3 max-w-full break-words overflow-auto"
                        >{review?.rateText}
                    </article>
                }
                {
                    review?.images?.length > 0 ?
                    <div className="p-3 flex max-w-full gap-1 flex-wrap justify-center items-center">
                        {
                            review?.images?.map(({imagePath,id})=> (
                                <div key={id} className="bg-white dark:bg-stone-950 rounded-md ">
                                    <Image
                                        className=""
                                        src={`${FIREBASE_IMAGES_URL}${imagePath}`}
                                        width={160} height={200} alt='product image'
                                        />

                                </div>
                            ))
                        }
                    </div> : null
                }
            </div>
            {
                currentUser?.id === review?.autherId && (
                    <footer className="flex items-center gap-1 w-[180px]">
                        <ButtonWithIcon 
                          text={isEdidable ? 'save' : 'edit'}
                          Icon={isEdidable ? MdOutlineSaveAs : VscEdit}
                          type='primary'
                          disabled={loading}
                          onClick={isEdidable ? handleUpdateReview : ()=> setIsEdidable(true)}
                        />
                        <ButtonWithIcon 
                          text={isEdidable ? 'back' : 'delete'}
                          Icon={isEdidable ? IoIosArrowRoundBack : MdDelete}
                          type='delete'
                          onClick={isEdidable ? ()=> setIsEdidable(false) : ()=> setIsRemoveModle(true)}
                        />
                    </footer>
                )
            }
            {
                isRemoveModle && (
                    <>
                       <Overlay onClick={()=> setIsRemoveModle(false)}/>
                        <div className="bg-teal-50 dark:bg-stone-950 capitalize z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md w-[370px]">
                            <h5 className="text-teal-950 dark:text-teal-50  mb-3 font-medium text-lg">
                                are you sure you want to delete your review ?
                            </h5>
                            <div className=" flex items-center gap-3">
                                <ButtonWithIcon 
                                    text='delete'
                                    Icon={MdDelete}
                                    type='delete'
                                    disabled={loading}
                                    onClick={handleRevomeReview}
                                    />
                                <ButtonWithIcon 
                                    text='back'
                                    Icon={IoIosArrowRoundBack}
                                    type='save'
                                    onClick={()=> setIsRemoveModle(false)}
                                    />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
};