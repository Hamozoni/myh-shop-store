import RatingInfo from "./RatingInfo";

function RatingsReviews() {

  return (
    <section className="py-4">
        <h4 className="text-lg  font-bold text-green-950">
            Product Ratings & Reviews
        </h4>
        <div className="flex gap-5 pt-3 ">
            <RatingInfo />
            <section className="flex-1 basis-0.5">
              <h5 
                className="text-md font-medium text-green-900 pb-2 mb-2 border-b border-gray-100"
                >6 Reviews
              </h5>
              <div className="">
                 <div className=""></div>
              </div>
            </section>
        </div>
    </section>
  )
}

export default RatingsReviews