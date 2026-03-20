"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { formatPrice } from "@/utils/formatePrice";
import { calculateDiscountPercentage } from "@/utils/calculateDiscountPercentage";
import { useCart } from "@/hooks/useCart";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { openWhatsAppOrder } from "@/utils/whatsappOrder";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { HeartIcon, HeartSolid } from "@/app/assets/icons";
import Tooltip from "@/components/Common/Tooltip";

interface SerializedProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  shortDescription?: string;
  description?: string;
  sku?: string;
  reviews: number;
  tags?: string[];
  offers?: string[];
  updatedAt: string;
  category?: { title: string; slug: string };
  productVariants: Array<{
    image: string;
    color?: string;
    size?: string;
    isDefault?: boolean;
  }>;
  additionalInformation?: Array<{ name: string; description: string }>;
  body?: string;
}

interface ProductPageClientProps {
  product: SerializedProduct;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(() => {
    const defaultIndex = product.productVariants.findIndex((v) => v.isDefault);

    return defaultIndex >= 0 ? defaultIndex : 0;
  });

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "additional" | "reviews"
  >("description");
  const [hasMounted, setHasMounted] = useState(false);

  const { addItem, cartDetails } = useCart();
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const selectedVariant = product.productVariants[selectedVariantIndex];

  const isAlreadyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id === product.id,
  );

  const isAlreadyWishListed =
    hasMounted &&
    wishlistItems.some((wishlistItem) => wishlistItem.id === product.id);

  const cartItem = {
    id: product.id,
    name: product.title,
    price: product.discountedPrice ?? product.price,
    currency: "usd",
    image: selectedVariant?.image || "",
    slug: product.slug,
    availableQuantity: product.quantity,
    color: selectedVariant?.color || "",
    size: selectedVariant?.size || "",
  };

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      // @ts-ignore
      addItem({ ...cartItem, quantity });
      toast.success(`${quantity} item(s) added to cart!`);
    } else {
      toast.error("This product is out of stock!");
    }
  };

  const handleWhatsAppOrder = () => {
    openWhatsAppOrder(
      product.title,
      product.discountedPrice || product.price,
      product.slug,
      quantity,
      selectedVariant?.color,
      selectedVariant?.size,
      product.sku,
    );
    toast.success("Opening WhatsApp...");
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        id: product.id,
        title: product.title,
        slug: product.slug,
        image: selectedVariant?.image || "",
        price: product.discountedPrice ?? product.price,
        quantity: product.quantity,
        color: selectedVariant?.color || "",
      }),
    );
    toast.success(
      isAlreadyWishListed
        ? "Product removed from wishlist!"
        : "Product added to wishlist!",
    );
  };

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="pt-35 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 xl:px-0">
        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-15">
          {/* Image Section */}
          <div>
            <div className="relative border rounded-xl  min-h-[500px] mb-4 flex items-center justify-center">
              <Image
                alt={product.title}
                className="object-contain"
                height={500}
                src={selectedVariant?.image || "/images/placeholder.png"}
                width={500}
              />

              {product.discountedPrice && (
                <span className="absolute top-4 right-4 px-3 py-1.5 text-sm font-medium text-white rounded-full bg-green-bright">
                  {calculateDiscountPercentage(
                    product.discountedPrice,
                    product.price,
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.productVariants.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.productVariants.map((variant, index) => (
                  <button
                    key={index}
                    className={`relative min-w-20 w-20 h-20 border-2 rounded-lg overflow-hidden transition ${
                      selectedVariantIndex === index
                        ? "border-green-bright ring-1 ring-green-bright"
                        : "border-gray-3 hover:border-dark-5"
                    }`}
                    type="button"
                    onClick={() => setSelectedVariantIndex(index)}
                  >
                    <Image
                      fill
                      alt={`${product.title} variant`}
                      className="object-contain p-2"
                      src={variant.image}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-dark-6">
              {product.title}
            </h1>

            {/* Reviews and Stock Status */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    {i < 4 ? "★" : "☆"}
                  </span>
                ))}
                <span className="text-sm text-dark-4 ml-2">
                  ({product.reviews} customer review
                  {product.reviews !== 1 ? "s" : ""})
                </span>
              </div>
              {product.quantity > 0 && (
                <span className="flex items-center gap-2 text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full" />
                  In Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-sm text-dark-4 mr-2">Price:</span>
              {product.discountedPrice ? (
                <>
                  <span className="text-xl line-through text-dark-4">
                    {formatPrice(product.price)}
                  </span>
                  <span className="ml-3 text-3xl font-bold text-dark-6">
                    {formatPrice(product.discountedPrice)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-dark-6">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-dark-4 mb-6">{product.shortDescription}</p>
            )}

            {/* Color Selection */}
            {selectedVariant?.color && (
              <div className="mb-6">
                <span className="text-sm font-medium text-dark-6 mb-2 block">
                  Color:
                </span>
                <div className="flex gap-2">
                  {product.productVariants
                    .filter(
                      (v, i, arr) =>
                        arr.findIndex((x) => x.color === v.color) === i,
                    )
                    .map((variant, index) => (
                      <button
                        key={index}
                        aria-label={`Select ${variant.color} color`}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedVariant.color === variant.color
                            ? "border-blue ring-2 ring-blue ring-offset-2"
                            : "border-gray-3"
                        }`}
                        style={{
                          backgroundColor:
                            variant.color?.toLowerCase() === "black"
                              ? "#000"
                              : variant.color?.toLowerCase() === "white"
                                ? "#fff"
                                : variant.color?.toLowerCase() === "blue"
                                  ? "#3b82f6"
                                  : variant.color?.toLowerCase() === "gray" ||
                                      variant.color?.toLowerCase() ===
                                        "graphite"
                                    ? "#6b7280"
                                    : "#9ca3af",
                        }}
                        type="button"
                        onClick={() => {
                          const variantIndex =
                            product.productVariants.findIndex(
                              (v) => v.color === variant.color,
                            );

                          setSelectedVariantIndex(variantIndex);
                        }}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-3 rounded-lg">
                <button
                  className="px-4 py-2 text-dark-6 hover:bg-gray-100"
                  disabled={quantity <= 1}
                  type="button"
                  onClick={decrementQuantity}
                >
                  −
                </button>
                <input
                  className="w-16 text-center border-x border-gray-3 py-2"
                  max={product.quantity}
                  min="1"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);

                    if (val >= 1 && val <= product.quantity) {
                      setQuantity(val);
                    }
                  }}
                />
                <button
                  className="px-4 py-2 text-dark-6 hover:bg-gray-100"
                  disabled={quantity >= product.quantity}
                  type="button"
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                className="flex-1 px-8 py-3 text-white bg-dark-6 rounded-lg hover:bg-green-bright transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.quantity < 1 || isAlreadyAdded}
                onClick={handleAddToCart}
              >
                {isAlreadyAdded ? "Already in Cart" : "Add to Cart"}
              </button>

              {/* Wishlist Button with Tooltip */}
              <Tooltip content="Wishlist" placement="top">
                <div
                  aria-label={
                    isAlreadyWishListed
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="flex items-center justify-center p-3 border border-gray-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
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
                  {hasMounted && isAlreadyWishListed ? (
                    <HeartSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon height={24} width={24} />
                  )}
                </div>
              </Tooltip>
            </div>

            {/* WhatsApp Button */}
            <button
              className="w-full px-8 py-3.5 font-semibold text-white bg-dark-6 rounded-lg flex items-center justify-center gap-2 hover:bg-dark-6/90 transition"
              onClick={handleWhatsAppOrder}
            >
              Order on WhatsApp
            </button>

            {/* Product Meta */}
            {(product.sku || product.category || product.tags) && (
              <div className="mt-8 pt-8 border-t border-gray-3 space-y-3">
                {product.sku && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-dark-4">SKU:</span>
                    <span className="text-dark-6 font-medium">
                      {product.sku}
                    </span>
                  </div>
                )}
                {product.category && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-dark-4">Category:</span>
                    <span className="text-dark-6 font-medium">
                      {product.category.title}
                    </span>
                  </div>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-dark-4">Tags:</span>
                    <span className="text-dark-6 font-medium">
                      {product.tags.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-15">
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-3 mb-8">
            <button
              className={`pb-4 font-medium transition relative ${
                activeTab === "description"
                  ? "text-green-bright"
                  : "text-dark-4 hover:text-dark-6"
              }`}
              type="button"
              onClick={() => setActiveTab("description")}
            >
              Description
              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-bright" />
              )}
            </button>
            <button
              className={`pb-4 font-medium transition relative ${
                activeTab === "additional"
                  ? "text-green-bright"
                  : "text-dark-4 hover:text-dark-6"
              }`}
              type="button"
              onClick={() => setActiveTab("additional")}
            >
              Additional Information
              {activeTab === "additional" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-bright" />
              )}
            </button>
            <button
              className={`pb-4 font-medium transition relative ${
                activeTab === "reviews"
                  ? "text-green-bright"
                  : "text-dark-4 hover:text-dark-6"
              }`}
              type="button"
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-bright" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                {product.body ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.body }}
                    className="prose prose-lg max-w-none text-dark-6"
                  />
                ) : product.description ? (
                  <p className="text-dark-6 leading-relaxed">
                    {product.description}
                  </p>
                ) : (
                  <p className="text-dark-4">No description available.</p>
                )}
              </div>
            )}

            {/* Additional Information Tab */}
            {activeTab === "additional" && (
              <div>
                <h3 className="text-xl font-bold mb-6 text-dark-6">
                  Specifications:
                </h3>
                {product.additionalInformation &&
                product.additionalInformation.length > 0 ? (
                  <div className="space-y-4">
                    {product.additionalInformation.map((info, index) => (
                      <div
                        key={index}
                        className="flex py-3 border-b border-gray-3 last:border-0"
                      >
                        <span className="w-1/3 text-dark-4 font-medium">
                          {info.name}:
                        </span>
                        <span className="w-2/3 text-dark-6">
                          {info.description}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-dark-4">
                    No additional information available.
                  </p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <h3 className="text-xl font-bold mb-6 text-dark-6">
                  Customer Reviews
                </h3>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl text-yellow-400">
                        {i < 4 ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-dark-6">
                    {product.reviews} review{product.reviews !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-dark-4">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
