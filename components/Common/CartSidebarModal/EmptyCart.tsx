import Link from "next/link";

import { EmptyCartIcon } from "@/app/assets/icons";
import { useCart } from "@/hooks/useCart";

const EmptyCart = () => {
  const { handleCartClick } = useCart();

  return (
    <div className="text-center">
      <div className="mx-auto pb-7.5">
        <EmptyCartIcon className="mx-auto" />
      </div>

      <p className="pb-6">Your cart is empty!</p>

      <Link
        className="w-full lg:w-10/12 mx-auto flex justify-center font-medium text-white bg-dark-6 py-[13px] px-6 rounded-lg ease-out duration-200 hover:bg-opacity-95"
        href="/shop-with-sidebar"
        onClick={() => {
          handleCartClick();
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
