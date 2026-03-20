"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import ActionBtn from "./ActionBtn";

import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatePrice";

const SingleItem = ({ item }: { item: Product }) => {
  const defaultVariant = item?.productVariants.find(
    (variant) => variant.isDefault,
  );

  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const { addItem, cartDetails } = useCart();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  const isAlradyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id === item.id,
  );

  const isAlradyWishListed = Object.values(wishlistItems ?? {}).some(
    (wishlistItem) => wishlistItem.id === item.id,
  );

  const cartItem = {
    id: item.id,
    name: item.title,
    price: item.discountedPrice ? item.discountedPrice : item.price,
    currency: "usd",
    image: defaultVariant?.image ? defaultVariant.image : "",
    price_id: null,
    slug: item?.slug,
    availableQuantity: item.quantity,
    color: defaultVariant?.color ? defaultVariant.color : "",
    size: defaultVariant?.size ? defaultVariant.size : "",
  };

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    const serializableItem = {
      ...item,
      updatedAt:
        item.updatedAt instanceof Date
          ? item.updatedAt.toISOString()
          : item.updatedAt,
    };

    dispatch(updateQuickView(serializableItem));
    openModal();
  };

  // add to cart
  const handleAddToCart = () => {
    if (item.quantity > 0) {
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

  return (
    <div className="group">
      <div
        className="relative overflow-hidden rounded-xl bg-[#F6F7FB] min-h-[403px]"
        style={{
          backgroundBlendMode: "multiply",
          backgroundImage: `url('/images/hero/pattern.svg')`,
          backgroundSize: "auto",
        }}
      >
        <div className="text-center px-4 py-7.5">
          <h3 className="font-semibold text-lg text-dark-6 ease-out duration-200 hover:text-green-bright mb-1.5">
            <Link href={`/products/${item?.slug}`}>{item.title}</Link>
          </h3>

          <span className="flex items-center justify-center gap-2 text-base font-medium">
            <span className="text-dark-6">
              {formatPrice(item.discountedPrice || item.price)}
            </span>
            {item.discountedPrice && (
              <span className="line-through text-dark-4">
                {formatPrice(item.price)}
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-center">
          <Link href={`/products/${item?.slug}`}>
            <Image
              alt={item.title || "product-image"}
              height={280}
              src={defaultVariant?.image ? defaultVariant.image : ""}
              width={280}
            />
          </Link>
        </div>

        <div className="absolute right-0 bottom-0 w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0 translate-x-full">
          <ActionBtn
            handleClick={handleQuickViewUpdate}
            icon="quick-view"
            text="Quick View"
          />

          {isAlradyAdded ? (
            <ActionBtn icon="check-out" text="Checkout" />
          ) : (
            <ActionBtn
              handleClick={handleAddToCart}
              icon="cart"
              isDisabled={item.quantity < 1}
              text="Add to cart"
            />
          )}

          <ActionBtn
            addedToWishlist={isAlradyWishListed}
            handleClick={handleItemToWishList}
            icon="wishlist"
            text="Add to Wishlist"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
