"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import CheckoutBtn from "../Shop/CheckoutBtn";
import WishlistButton from "../Wishlist/AddWishlistButton";

import Tooltip from "./Tooltip";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { EyeIcon } from "@/app/assets/icons";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { AppDispatch } from "@/redux/store";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatePrice";
import { calculateDiscountPercentage } from "@/utils/calculateDiscountPercentage";

type Props = {
  bgClr?: string;
  item: Product;
};

const ProductItem = ({ item, bgClr = "[#F6F7FB]" }: Props) => {
  const defaultVariant = item?.productVariants.find(
    (variant) => variant.isDefault,
  );

  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const { addItem, cartDetails } = useCart();
  const router = useRouter();

  const isAlreadyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id === item.id,
  );

  const cartItem = {
    id: item.id,
    name: item.title,
    price: item.discountedPrice ? item.discountedPrice : item.price,
    currency: "kes",
    image: defaultVariant?.image ? defaultVariant.image : "",
    slug: item?.slug,
    availableQuantity: item.quantity,
    color: defaultVariant?.color ? defaultVariant.color : "",
    size: defaultVariant?.size ? defaultVariant.size : "",
  };

  const productUrl = `/products/${item?.slug}`;

  const handleQuickViewUpdate = () => {
    const serializableItem = {
      ...item,
      updatedAt:
        typeof item.updatedAt === "string"
          ? item.updatedAt
          : item.updatedAt.toISOString(),
    };

    dispatch(updateQuickView(serializableItem));
  };

  const handleAddToCart = (product: Product) => {
    if (product.quantity > 0) {
      // @ts-ignore
      addItem(cartItem);
      toast.success("Product added to cart!");
    } else {
      toast.error("This product is out of stock!");
    }
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        id: item.id,
        title: item.title,
        slug: item.slug,
        image: defaultVariant?.image ? defaultVariant.image : "",
        price: item.discountedPrice ? item.discountedPrice : item.price,
        quantity: item.quantity,
        color: defaultVariant?.color ? defaultVariant.color : "",
      }),
    );
  };

  const stopProp = (e: React.KeyboardEvent | React.MouseEvent) =>
    e.stopPropagation();

  return (
    <article className="group">
      {/* Clickable card — uses role="button" to satisfy a11y rules */}
      <div
        className="w-full cursor-pointer text-left"
        role="button"
        tabIndex={0}
        onClick={() => router.push(productUrl)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") router.push(productUrl);
        }}
      >
        <div
          className={`relative overflow-hidden border border-gray-3 flex items-center justify-center rounded-xl bg-${bgClr} min-h-[270px] mb-4`}
        >
          <Image
            alt={item.title || "product-image"}
            height={250}
            src={defaultVariant?.image ? defaultVariant.image : ""}
            width={250}
          />

          <div className="absolute right-2 top-2">
            {item.quantity < 1 ? (
              <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                Out of Stock
              </span>
            ) : item?.discountedPrice && item?.discountedPrice > 0 ? (
              <span className="rounded-full bg-green-bright px-2 py-1 text-xs font-medium text-white">
                {calculateDiscountPercentage(item.discountedPrice, item.price)}%
                OFF
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-0 left-0 flex w-full translate-y-full items-center justify-center gap-2.5 pb-5 duration-200 ease-linear group-hover:translate-y-0">
            <Tooltip content="Quick View" placement="top">
              <button
                className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-gray-3 bg-white text-dark-6 hover:text-green-bright"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                  handleQuickViewUpdate();
                }}
              >
                <EyeIcon />
              </button>
            </Tooltip>

            {isAlreadyAdded ? (
              // role="presentation" tells a11y this div is purely structural,
              // not interactive — it only exists to stop event bubbling.
              <div role="presentation" onClick={stopProp} onKeyDown={stopProp}>
                <CheckoutBtn />
              </div>
            ) : (
              <button
                className="inline-flex h-[38px] rounded-lg bg-dark-6 px-5 py-2 text-custom-sm font-medium text-white duration-200 ease-out hover:bg-green-bright"
                disabled={item.quantity < 1}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                {item.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            )}

            {/* wishlist button */}
            <div role="presentation" onClick={stopProp} onKeyDown={stopProp}>
              <WishlistButton
                handleItemToWishList={handleItemToWishList}
                item={item}
              />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-1.5 line-clamp-1 text-base font-semibold text-dark-6 duration-200 ease-out hover:text-green-bright">
        {item.title}
      </h3>

      <span className="flex items-center gap-2 text-base font-medium">
        {item.discountedPrice && (
          <span className="text-dark-4 line-through">
            {formatPrice(item.price)}
          </span>
        )}
        <span className="text-dark-6">
          {formatPrice(item.discountedPrice || item.price)}
        </span>
      </span>
    </article>
  );
};

export default ProductItem;
