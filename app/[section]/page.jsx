
import {fetchData} from "../../lip/fetchData";
// import ProductCard from "../../ui/products/ProductCard";

async function page({params,searchParams}) {

    const {section} = params;
    const {sub} = searchParams;
    const  Data  = await fetchData(`products/${section}?sub=${sub}`);

    // console.log(data);


    return (
        <div className="p-4 lg:px-8">
            {/* {
                data?.map((product)=> (
                    <ProductCard product={product}/>
                ))
            } */}
            {Data }
        </div>
    )
}

export default page