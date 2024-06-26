
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import { db } from  "../../../../lip/db"

export async function POST (requist) {

    const formData  = await requist.formData();

    const exestProduct = await db.product.findMany({where : {
        serialNumber : formData.get("serialNumber")
    }});

    if(exestProduct.length > 0){
        console.log(exestProduct);
        return new NextResponse("Error the products already added before try another product", { status: 400 })
    }

   const specifKeys = formData.getAll("specifKey");
   const specifValues = formData.getAll("specifValue");

   const specifications = []

   for(let i = 0 ;i < specifKeys.length; i++){

    let specification = {key : specifKeys[i], value : specifValues[i]}

    specifications.push(specification)
   }


   const sizeName = formData.getAll("sizeName");
   const sizeDesc = formData.getAll("sizeDesc");

   const sizes = []

   for(let i = 0 ;i < sizeName.length; i++){

    let specification = {name : sizeName[i], description : sizeDesc[i]}

    sizes.push(specification)
   };


   
   
   
   const color = formData.getAll("color");
   

    

        await fs.mkdir("public/products",{recursive: true});
       
        

        const images = []
        
           for(let i = 0;i < color.length; i++){


                const imagesPath = formData.getAll(`imagePath-${color[i]}`);
        
    
                for(let p = 0; p < imagesPath.length; p++){
        
                    const imageUrl = `public/products/${crypto.randomUUID()}-${imagesPath[p].name}`;
        
                    await fs.writeFile(imageUrl,Buffer.from(await imagesPath[p].arrayBuffer()))
        
    
                    images.push({color: color[i] , imagePath : imageUrl})
                   
                    
                }
        
            }
    


  const product = await db.product.create({
        data : {
            name: formData.get("name"),
            priceInCent: Number(formData.get("priceInCent")),
            isAvailable: formData.get("isAvailable") === "true" ? true : false,
            description : formData.get("description"),
            category: formData.get("category"),
            subCategory: formData.get("subCategory"),
            aboutThisItem: formData.get("aboutThisItem"),
            serialNumber: formData.get("serialNumber"),
            brand: formData.get("brand"),
            specifications : {
                create :[
                    ...specifications
                ]
            },
            sizes : {
                create :[
                    ...sizes
                ]
            },
            images : {
                create : [...images]
            }
        }})
console.log(product)
    return new NextResponse(product)

}