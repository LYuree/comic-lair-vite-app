import { FC, memo } from "react";
import { TbHeartPlus } from "react-icons/tb";
import { truncateText } from "../../utils/truncateText.ts";
import { formatPrice } from "../../utils/formatPrice.ts";
import { IProductItem } from "../../api/products/fetchProducts.ts";
import { cartItem } from "../../api/products/fetchCartProducts.ts";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";

export interface ProductCardProps {
  data: IProductItem;
  key: number | string;
}

const ProductCard: FC<ProductCardProps> = memo(({ data }) => {
  return (
    <div
      className="
            col-span-1
            cursor-pointer
            bg-white
            w-full
            max-w-[210px]
            hover:outline
            hover:outline-violet-300
            hover:outline-2
            mx-auto
            "
      key={data.id}
    >
      <div className="relative overflow-hidden flex justify-center">
        <Link to={`/product_details/${data.id}`}>
          <picture>
            <source />
            <img
              // src={data.images[0].image}
              src={data.cover_image}
              alt={data.name}
              className="hover:opacity-75 duration-500"
            />
          </picture>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[gray] text-xs font-semibold mt-2">
          {data.digital ? "ЭЛЕКТРОННАЯ КНИГА" : "ПЕЧАТНАЯ КНИГА"}
        </div>
        <div className="text-lg text-center font-bold">
          {truncateText(data.name)}
        </div>
        <div className="flex flex-col items-center text-sm mt-2 text-[gray] font-semibold max-w-[210px]">
          {data.discount ? (
            <>
              <del>{formatPrice(data.price)}</del>
              <span className="text-black">
                {formatPrice(data.price * (1 - data.discount))}
              </span>
              <span className="text-[#22B242]">
                экономия:{" "}
                {formatPrice(data.price - data.price * (1 - data.discount))}
              </span>
            </>
          ) : (
            <span>{formatPrice(data.price)}</span>
          )}
        </div>
        <div className="w-full mt-2 flex flex-row justify-between items-center mb-2 px-2">
          <TbHeartPlus className="text-3xl mr-4 ml-2 hover:text-[maroon] grow-0" />
          <button
            type="submit"
            className="btn relative inline-flex grow py-1 items-center justify-center overflow-hidden font-medium transition-all bg-indigo-100 hover:bg-white group py-1.5 px-2.5"
            onClick={() => {
              const cartStr = localStorage.getItem("cart");
              const cart = cartStr ? JSON.parse(cartStr) : null;
              if (!cart) {
                localStorage.setItem(
                  "cart",
                  JSON.stringify([
                    {
                      product_id: data.id,
                      quantity: 1,
                    },
                  ])
                );
                return;
              }
              if (
                cart &&
                !cart.some((item: cartItem) => item.product_id === data.id)
              )
                localStorage.setItem(
                  "cart",
                  JSON.stringify([
                    ...cart,
                    { product_id: data.id, quantity: 1 },
                  ])
                );
              console.log(`local storage cart: `, localStorage.getItem("cart"));
            }}
          >
            <span className="w-56 h-48 bg-[maroon] absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center text-[black] transition-colors duration-300 ease-in-out group-hover:text-white">
              <AiOutlineShopping className="cursor-pointer text-2xl mx-auto" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
