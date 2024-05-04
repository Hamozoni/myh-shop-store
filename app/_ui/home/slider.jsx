import Image from "next/image";
import slide1 from "../../../public/slide/slide1.webp";
import slide2 from "../../../public/slide/slide2.webp";
import slide3 from "../../../public/slide/slide3.jpg";
import slide4 from "../../../public/slide/slide4.webp";
import slide5 from "../../../public/slide/slide5.jpg";
import slide6 from "../../../public/slide/slide6.jpg";
import slide7 from "../../../public/slide/slide7.jpg";
import slide8 from "../../../public/slide/slide8.jpg";
import slide9 from "../../../public/slide/slide9.jpg";

const slide = [slide1,slide2,slide3,slide4,slide5,slide6,slide7,slide8,slide9];

function Slider() {
  return (
    <div className="snap-x overflow-auto">
        <div className="min-w-fit flex items-center ">
            {
                slide?.map((image)=> (
                    <div key={image} className="snap-normal snap-center w-svw min-w-screen h-svh min-h-svh  max-h-svh">
                        <Image className="min-w-screen h-svh min-h-svh w-svw  max-h-svh" src={image} alt="slide image"/>
                    </div>
                ))

            }

        </div>
    </div>
  )
}

export default Slider