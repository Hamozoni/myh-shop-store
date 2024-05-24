import Image from "next/image";
import getCurrency from "../../_lip/getCurrency";
import QuantityBtn from "../../_ui/products/QuantityBtn";
import { removeItemFromCart } from "../../../features/cartSlice";
import { useAppDispatch } from "../../../store/store";
import { MdOutlineDeleteOutline } from "react-icons/md";

function CartItemsCard({product}) {
    const dispatch = useAppDispatch();
  return (
    <div className="flex gap-3 items-center p-3 border border-gray-100 bg-gray-50 rounded-md w-full">
        <div className="min-w-[150px]">
            <Image 
                src={product?.image?.replace("public","")}
                width={150}
                height={150}
                alt='product image'
                 />
        </div>
        <section>
            <h4 className="pb-2">{product?.name}</h4>
            <div className="flex gap-5 items-center flex-wrap">
                <div className="border-r px-2 border-green-100">
                    <h6 className="flex items-center gap-2"> color: 
                        <p 
                            style={{backgroundColor: product?.selectedColor}}
                            className="w-[35px] h-[15px] rounded-full"
                            >
                        </p>
                    </h6>
                    <h6 className="flex items-center gap-2"> size: 
                        <p 
                            className="w-[35px] h-[35px] rounded-full"
                            >
                                {product?.selectedSize}
                        </p>
                    </h6>
                </div>
                <div className="border-r px-2 border-green-100">
                    <h6>price</h6>
                    <h4>{getCurrency(product?.priceInCent)}</h4>
                </div>
                <QuantityBtn id={product.id} />
                <div className="border-r px-2 border-green-100">
                    <h6>total price</h6>
                    <h4>{getCurrency(product?.priceInCent * product?.quantity)}</h4>
                </div>
                <botton 
                    onClick={()=> dispatch(removeItemFromCart(product.id))}
                    className={ `flex items-center cursor-pointer text-md font-bold text-rose-600 hover:text-rose-700`}>
                        remove <MdOutlineDeleteOutline size={16} />
                </botton>
            </div>
        </section>
    </div>
  )
}

export default CartItemsCard