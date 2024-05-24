"use client";

import { useAppSelector } from "../../../store/store";
import getCurrency from "../../_lip/getCurrency";
import { MdOutlineLocalShipping } from "react-icons/md";

import madaLogo from "../../../public/paymentLogos/logo-mada.webp"
import visaLogo from "../../../public/paymentLogos/logo-visa.webp"
import masterCLogo from "../../../public/paymentLogos/logo-mc.webp"
import paypalLogo from "../../../public/paymentLogos/logo-paypal.webp"
import applePayLogo from "../../../public/paymentLogos/logo-applepay.webp"
import Image from "next/image";


function CartSummary() {

    const cartItems = useAppSelector(state=> state.cart.cartItems);
    const totalPrice = cartItems?.reduce((total,curr)=> (total += curr?.product?.priceInCent * curr?.quantity),0)
    const subtotal = cartItems?.reduce((total,curr)=> (total += curr?.quantity),0);

    const deliveryFree = totalPrice > 14999 ? 0 : 1700;

    const paymentLogos = [madaLogo,visaLogo,masterCLogo,applePayLogo,paypalLogo];

    const payment = paymentLogos?.map((img)=> (
         <li key={img}>
            <Image  src={img} width={50} height={50} alt="payment"/>
        </li>
    ));

    const className = {
        section : 'p-3 border border-gray-100 mb-3 rounded-md',
        parts: 'flex items-center justify-between py-2 border-b border-gray-50',
        checkoutBtn: 'w-full rounded-md py-2 bg-green-900 uppercase text-green-50 hover:bg-green-800'
    }


  return (
    <div className="flex-1">
        <header className={className.section}>
            <div className="flex items-center gap-2">
                <MdOutlineLocalShipping size={22}/>
                <h4 className="uppercase text-green-900">free shipping</h4>
                <p className="text-sm text-green-800">on orders over <strong > SAR 150 </strong></p>
            </div>
        </header>
        <div className={className.section}>
            <div className={className.parts}>
                <h5>{`subtotal (${subtotal} items):`}</h5>
                <h5> {getCurrency(totalPrice)} </h5>
            </div>
            <div className={className.parts}>
                <h5>shipping fee</h5>
                <h5> {deliveryFree > 0 ? getCurrency(deliveryFree): "free"} </h5>
            </div>
            <div className={className.parts}>
                <h5>total: </h5>
                <h5> {getCurrency(totalPrice + deliveryFree)} </h5>
            </div>
            <button className={className.checkoutBtn}>
                checkout
            </button>
        </div>

        <section className={className.section}>
            <h5>ways you can pay :</h5>
            <ul className="flex items-center gap-2 flex-wrap justify-center">
                {payment}
            </ul>
        </section>
    </div>
  )
}

export default CartSummary