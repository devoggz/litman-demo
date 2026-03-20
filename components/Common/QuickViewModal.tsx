"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import ReviewStar from "../Shop/ReviewStar";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import {
  CircleCheckIcon,
  CloseLine,
  FullScreenIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from "@/app/assets/icons";
import { updateproductDetails } from "@/redux/features/product-details";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { formatPrice } from "@/utils/formatePrice";
import { useCart } from "@/hooks/useCart";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { addItem } = useCart();
  const [avgRating, setAvgRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const product = useAppSelector((state) => state.quickViewReducer.value);
  const [activePreview, setActivePreview] = useState(0);

  const defaultVariant = product?.productVariants?.find(
    (variant) => variant.isDefault,
  );

  const handlePreviewSlider = () => {
    dispatch(
      updateproductDetails({
        ...product,
        updatedAt: product.updatedAt,
      }),
    );
    openPreviewModal();
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.discountedPrice ? product.discountedPrice : product.price,
      currency: "usd",
      image: defaultVariant?.image ? defaultVariant.image : "",
      price_id: null,
      slug: product?.slug,
      availableQuantity: product.quantity,
      color: defaultVariant?.color ? defaultVariant.color : "",
      size: defaultVariant?.size ? defaultVariant.size : "",
    };

    if (product.quantity > 0) {
      // @ts-ignore
      addItem(cartItem);
      toast.success("Product added to cart!");
      closeModal();
    } else {
      toast.error("This product is out of stock!");
    }
  };

  const handleAddToWishlist = () => {
    dispatch(
      addItemToWishlist({
        id: product.id,
        title: product.title,
        slug: product.slug,
        image: defaultVariant?.image ? defaultVariant.image : "",
        price: product.discountedPrice
          ? product.discountedPrice
          : product.price,
        quantity: product.quantity,
        color: defaultVariant?.color ? defaultVariant.color : "",
      }),
    );
  };

  const isAlreadyInWishlist = useAppSelector((state) =>
    state.wishlistReducer.items?.some((item) => item.id === product.id),
  );

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setQuantity(1);
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (product?.slug) {
      fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productSlug: product.slug }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTotalRating(data?.review?.length);
          setAvgRating(
            data?.review?.reduce(
              (acc: number, review: any) => acc + review?.ratings,
              0,
            ) / data?.review?.length,
          );
          setLoading(false);
        })
        .catch(() => {
          // prod-safe: no console noise
          setLoading(false);
        });
    }
  }, [product?.slug]);

  return (
    <>
      {product?.title && (
        <div
          className={`${
            isModalOpen ? "z-99999" : "hidden"
          } fixed top-0 left-0 overflow-y-scroll no-scrollbar max-h-[100vh] w-full sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
        >
          <div className="flex items-center justify-center ">
            <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
              <button
                className="absolute top-0 right-0 flex items-center justify-center duration-150 ease-in rounded-full sm:top-6 sm:right-6 text-body hover:text-dark-6"
                onClick={() => closeModal()}
              >
                <span className="sr-only">Close modal</span>
                <CloseLine />
              </button>

              <div className="flex flex-wrap items-center gap-12.5">
                <div className="max-w-[526px] w-full">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-5">
                      {product?.productVariants?.map((thumb, key: number) => (
                        <button
                          key={key}
                          className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 ease-out duration-200 hover:border-2 hover:border-green-bright ${
                            activePreview === key &&
                            "border-2 border-green-bright"
                          }`}
                          onClick={() => setActivePreview(key)}
                        >
                          <Image
                            alt="thumbnail"
                            className="aspect-square"
                            height={61}
                            src={thumb.image}
                            width={61}
                          />
                        </button>
                      ))}
                    </div>

                    <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px] bg-gray-1 rounded-lg border border-gray-3">
                      <div>
                        <button
                          className="absolute z-50 flex items-center justify-center w-10 h-10 duration-200 ease-out bg-white rounded-lg gallery__Image shadow-1 text-dark-6 hover:text-green-bright top-4 lg:top-8 right-4 lg:right-8"
                          onClick={handlePreviewSlider}
                        >
                          <span className="sr-only">Fullscreen</span>
                          <FullScreenIcon />
                        </button>

                        <Image
                          alt="products-details"
                          height={400}
                          src={
                            product?.productVariants?.[activePreview]?.image
                              ? product.productVariants[activePreview].image
                              : ""
                          }
                          width={400}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[445px] w-full">
                  {product.discountedPrice &&
                    product.discountedPrice < product.price && (
                      <span className="inline-block text-custom-xs uppercase rounded-full font-medium text-white py-1 px-3 bg-green-bright mb-6.5">
                        sale{" "}
                        {Math.round(
                          ((product.price - product.discountedPrice) /
                            product.price) *
                            100,
                        )}
                        % OFF
                      </span>
                    )}

                  <h3 className="mb-4 text-xl font-semibold xl:text-heading-5 text-dark-6">
                    {product.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-5 mb-6">
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <ReviewStar avgRating={avgRating} />
                        <span className="text-dark-2">
                          ( {totalRating} reviews )
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {product.quantity > 0 ? (
                        <>
                          <CircleCheckIcon className="fill-green-bright" />
                          <span className="text-dark-6"> In Stock </span>
                        </>
                      ) : (
                        <>
                          <CircleCheckIcon className="fill-red" />
                          <span className="text-body"> Out Of Stock </span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-base line-clamp-3 text-dark-3">
                    {product?.shortDescription}
                  </p>

                  <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                    <div>
                      <h4 className="font-medium text-base text-dark-2 mb-3.5">
                        Price
                      </h4>

                      <span className="flex items-center gap-2">
                        <span
                          className={`text-lg font-medium text-dark-4 xl:text-2xl ${
                            product.discountedPrice ? "line-through" : ""
                          }`}
                        >
                          {formatPrice(product.price)}
                        </span>
                        {product.discountedPrice && (
                          <span className="text-xl font-semibold text-dark xl:text-heading-4">
                            {formatPrice(product.discountedPrice)}
                          </span>
                        )}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-medium text-base text-dark-3 mb-3.5">
                        Quantity
                      </h4>

                      <div className="flex items-center gap-3">
                        <button
                          className="flex items-center justify-center w-10 h-10 duration-200 ease-out rounded-lg bg-gray-2 text-dark-6 hover:text-green-bright"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <span className="sr-only">Increase quantity</span>
                          <PlusIcon />
                        </button>

                        <span className="flex items-center justify-center w-20 h-10 font-medium bg-white border rounded-lg border-gray-4 text-dark-6">
                          {quantity}
                        </span>

                        <button
                          className="flex items-center justify-center w-10 h-10 duration-200 ease-out rounded-lg bg-gray-2 text-dark-6 hover:text-green-bright"
                          disabled={quantity <= 1}
                          onClick={() =>
                            quantity > 1 && setQuantity(quantity - 1)
                          }
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <MinusIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      className="inline-flex py-3 font-medium text-white duration-200 ease-out rounded-lg bg-green-bright px-7 hover:bg-green-bright/80"
                      disabled={quantity < 1 || product.quantity < 1}
                      onClick={handleAddToCart}
                    >
                      {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>

                    <button
                      className="inline-flex items-center gap-2 px-7 py-3 font-medium text-white duration-200 ease-out rounded-lg bg-dark-6 hover:bg-green-bright"
                      disabled={isAlreadyInWishlist}
                      onClick={handleAddToWishlist}
                    >
                      <HeartIcon />
                      {isAlreadyInWishlist
                        ? "Added to Wishlist"
                        : "Add to Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickViewModal;
