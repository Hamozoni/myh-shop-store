
// component
import ReviewsDetails from "./components/reviewsDetails";
import Reviews from "./components/reviews";
// context provider
import ReviewsContext from "./components/reviewsContext";

function ProductReviews({product}) {

  return (
    <section className="py-4">
       <ReviewsContext product={product}>
          <header>
            <h4 className="text-lg  font-bold text-green-950">
                  Product Ratings & Reviews
              </h4>
          </header>
          <div className="md:flex gap-4 lg:gap-8 pt-3 max-w-full ">
              <ReviewsDetails />
              <Reviews />
          </div>
       </ReviewsContext>
    </section>
  )
}

export default ProductReviews