"use client"
import { TbHeartPlus } from "react-icons/tb";
import cover from "/app/images/ipsum-man-joins-amet-avenger 210-320 V2.png";

interface ProductCardProps {
    data: any
}

const ProductCard: React.FC<ProductCardProps> = (({data}) => {
    return (
    <div className="
    col-span-1
    cursor-pointer
    bg-white
    w-full
    ">
        <div className="aspect-[6:9] relative overflow-hidden">
            <picture>
                <source />
                <img
                    src={data.images[0].image}
                    alt={data.name}
                />
            </picture>
            {/* <Image
            width={210}
            height={320}
            className="w-full h-full object-contain" //uncomment to see the result
            src={data.images[0].image}
            // src="/app/images/banner1.png"
            alt={data.name}
            /> */}
        </div>
        <div className="flex flex-col items-center">
            <div className="text-grey text-xs">ПЕЧАТНАЯ КНИГА</div>
            <div className="text-grey text-sm">МЯГКАЯ ОБЛОЖКА</div>
            <div className="text-lg">{data.images[0].image}</div>
            <div className="flex flex-row justify-between text-sm">old price, new price, you save</div>
            <div className="flex flex-row justify-between">
                <TbHeartPlus />
                <button type="submit" className="bg-violet-900 text-white">
                    В КОРЗИНУ
                </button>
            </div>
        </div>
    </div>
    );
});
 
export default ProductCard;