import { useEffect, useState } from "react";

import Tooltip from "../Common/Tooltip";

import { HeartIcon, HeartSolid } from "@/app/assets/icons";
import { useAppSelector } from "@/redux/store";
import { Product } from "@/types/product";

// prop type
type IProps = {
  item: Product;
  handleItemToWishList: () => void;
};

const WishlistButton = ({ item, handleItemToWishList }: IProps) => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Avoid hydration issues by not rendering mismatched content
  }

  const isAlreadyWishListed = wishlistItems.some(
    (wishlistItem) => wishlistItem.id === item.id,
  );

  return (
    <Tooltip content="Wishlist" placement="top">
      {/* Changed button to div to avoid nested button issue */}
      <div
        aria-label="button for favorite select"
        className="flex items-center justify-center duration-200 h-[38px] w-[38px] ease-out bg-white border rounded-lg border-gray-3 text-dark-6 hover:text-green-bright cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={handleItemToWishList}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleItemToWishList();
          }
        }}
      >
        {isAlreadyWishListed ? (
          <HeartSolid />
        ) : (
          <HeartIcon height={16} width={16} />
        )}
      </div>
    </Tooltip>
  );
};

export default WishlistButton;
