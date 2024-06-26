import men from "../public/categories/men/men.webp";
import women from "../public/categories/women/women.jpg";
import kids from "../public/categories/kids/kids.jpg";

import men_shirts from "../public/categories/men/men_shirts.jpg";
import men_t_shirts from "../public/categories/men/men_t-shirts.webp";
import men_accessories from "../public/categories/men/menAccessories.webp";
import men_activewear from "../public/categories/men/menActivewear.jpg";
import men_bagsWallets from "../public/categories/men/menBagsWallets.webp";
import men_cardigansSweaters from "../public/categories/men/menCardigansSweaters.jpg";
import men_coatsJackets from "../public/categories/men/menCoatsJackets.jpg";
import men_hoodiesSweatshirts from "../public/categories/men/menHoodiesSweatshirts.webp";
import men_innerwear from "../public/categories/men/menInnerwear.jpg";
import men_jeansTrousers from "../public/categories/men/menJeansTrousers.jpg";
import men_nightwear from "../public/categories/men/menNightwear.jpg";
import men_shoes from "../public/categories/men/menShoes.webp";

import women_shoes from "../public/categories/women/womenShoes.jpg";
import women_accessories from "../public/categories/women/womenAccessories.webp";
import women_activewear from "../public/categories/women/womenActivewear.jpg";
import women_bagsWallets from "../public/categories/women/womenBagsWallets.webp";
import women_beautyPerfumes from "../public/categories/women/womenBeautyPerfumes.jpg";
import women_cardigansSweaters from "../public/categories/women/womenCardigansSweaters.jpg";
import women_dressesJumpsuits from "../public/categories/women/womenDressesJumpsuits.jpg";
import women_hoodiesSweatshirts from "../public/categories/women/womenHoodiesSweatShirts.webp";
import women_jackets from "../public/categories/women/womenJackets.jpg";
import women_jeansJeggings from "../public/categories/women/womenJeansJeggings.jpg";
import women_leggings from "../public/categories/women/womenLeggings.jpg";
import women_lingerie from "../public/categories/women/womenLingerie.webp";
import women_maternity from "../public/categories/women/womenMaternity.webp";
import women_nightwear from "../public/categories/women/womenNightwear.jpg";
import women_pantsTrousers from "../public/categories/women/womenPantsTrousers.webp";
import women_plusSize from "../public/categories/women/womenPlusSize.webp";
import women_topsTees from "../public/categories/women/womenTopsTees.jpg";
import women_skirts from "../public/categories/women/womenSkirts.jpg";

import kids_tops from "../public/categories/kids/kidsTops.jpg";
import kids_accessories from "../public/categories/kids/kidsAccessories.jpg";
import kids_bottoms from "../public/categories/kids/kidsBottoms.webp";
import kids_clothingSets from "../public/categories/kids/kidsClothingSets.jpg";
import kids_coatsJackets from "../public/categories/kids/kidsCoatsJackets.webp";
import kids_dresses from "../public/categories/kids/kidsDresses.jpg";
import kids_hoodiesSweatshirts from "../public/categories/kids/kidsHoodiesSweatshirts.jpg";
import kids_nightwear from "../public/categories/kids/kidsNightwear.jpg";
import kids_rompersJumpsuits from "../public/categories/kids/kidsRompersJumpsuits.jpg";
import kids_shoes from "../public/categories/kids/kidsShoes.jpg";
import kids_sweatersCardigans from "../public/categories/kids/kidsSweatersCardigans.jpg";

export  const categoriesData = [
    {
        name : "men",
        image: men,
        subName : [
            {
                name: "t-shirt", 
                image: men_t_shirts

            },
            {
                name:  "shirts",
                image: men_shirts 
            },
            {
                name: "jeans & Trousers",
                image: men_jeansTrousers 
            },
            {
                name:  "Activewear",
                image: men_activewear
            },
            {
                name:  "Cardigans & Sweaters",
                image: men_cardigansSweaters
            },
            {
                name:  "Hoodies & Sweatshirts",
                image: men_hoodiesSweatshirts
            },
            {
                name: "Coats & Jackets",
                image: men_coatsJackets
            },
            {
                name:  "Nightwear",
                image: men_nightwear
            },
            {
                name:  "Innerwear",
                image: men_innerwear
            },
            {
                name:  "Accessories",
                image: men_accessories
            }, 
            {
                name:   "Shoes",
                image: men_shoes
            },           
            {         
                name:  "Bags & Wallets",
                image: men_bagsWallets
            }, 
        ]
    },
    {
        name: "women",
        image: women,
         subName : [
            {
                name: "Tops & Tees",
                image: women_topsTees
            },
            {
                name: "Dresses & Jumpsuits",
                image: women_dressesJumpsuits
            },
            {
                name: "Jeans & Jeggings",
                image: women_jeansJeggings
            },
            {
                name:  "Pants & Trousers",
                image: women_pantsTrousers
            },
            {
                name:   "Leggings",
                image: women_leggings
            },
            {
                name:  "Skirts",
                image: women_skirts
            },
            {
                name:"Cardigans & Sweaters",
                image: women_cardigansSweaters
            },
            {
                name:"Hoodies & Sweatshirts",
                image: women_hoodiesSweatshirts
            },
            {
                name: "Activewear",
                image: women_activewear
            },
            {
                name: "Jackets",
                image: women_jackets
            },
            {
                name: "Lingerie",
                image: women_lingerie
            },
            {
                name: "Nightwear",
                image: women_nightwear
            },
            {
                name:  "Plus Size",
                image: women_plusSize
            },
            {
                name:  "Maternity",
                image: women_maternity
            },
            {
                name: "Shoes",
                image: women_shoes
            },
            {
                name:  "Bags & Wallets",
                image: women_bagsWallets
            },
            {
                name:  "Accessories",
                image: women_accessories
            },
            {
                name:  "Beauty & Perfumes",
                image: women_beautyPerfumes
            },
           
         ]
    },
    {
        name : "kids",
        image: kids,
        subName : [
            {
                name: "Tops",
                image: kids_tops
            },
            {
                name:  "Dresses",
                image: kids_dresses
            },
            {
                name: "Bottoms",
                image: kids_bottoms
            },
            {
                name:"Clothing sets",
                image: kids_clothingSets
            },
            {
                name:"Nightwear",
                image: kids_nightwear
            },
            {
                name: "Rompers & Jumpsuits",
                image: kids_rompersJumpsuits
            },
            {
                name:"Hoodies & Sweatshirts",
                image: kids_hoodiesSweatshirts
            },
            {
                name:"Coats & Jackets",
                image: kids_coatsJackets
            },
            {
                name: "Shoes",
                image: kids_shoes
            },
            {
                name:  "Accessories",                
                image: kids_accessories
            },
            {
                name:  "Sweaters & Cardigans",                
                image: kids_sweatersCardigans
            },
            
        ]
    }
]