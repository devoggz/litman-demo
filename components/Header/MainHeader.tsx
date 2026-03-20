"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { menuData } from "./menuData";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import {
  SearchIcon,
  UserIcon,
  HeartIcon,
  CartIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

import { useCart } from "@/hooks/useCart";
import { HeaderSetting } from "@/types/header-setting";
import { useAppSelector } from "@/redux/store";

type IProps = {
  headerData?: HeaderSetting | null;
};

const MainHeader = ({ headerData }: IProps) => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const { handleCartClick, cartCount } = useCart();

  const wishlistCount = useAppSelector(
    (state) => state.wishlistReducer.items,
  )?.length;

  const handleOpenCartModal = () => {
    handleCartClick();
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setNavigationOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full z-50 bg-white transition-all ease-in-out duration-300 ${
          stickyMenu ? "shadow-sm" : ""
        }`}
      >
        {/* Topbar */}
        <div className="bg-dark-6 py-1">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 xl:px-0">
            <div className="flex justify-between">
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-white">
                  {headerData?.headerText || "Free delivery around Kakamega"}
                </p>
              </div>
              <div className="flex divide-x divide-white/20">
                <Link
                  className="pr-3 text-sm font-medium text-white transition hover:text-blue-300"
                  href="/signup"
                >
                  Create an account
                </Link>
                <Link
                  className="pl-3 text-sm font-medium text-white transition hover:text-blue-300"
                  href="#"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 mx-auto max-w-7xl sm:px-6 xl:px-0">
          <div className="flex items-center justify-between py-4 xl:py-0">
            {/* Logo */}
            <div>
              <Link className="block py-2 shrink-0" href="/">
                <div className="flex items-center gap-1">
                  <Image
                    priority
                    alt="Logo"
                    height={80}
                    src={headerData?.headerLogo || "/images/logo/logo.svg"}
                    width={160}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:block">
              <DesktopMenu menuData={menuData} stickyMenu={stickyMenu} />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Search"
                className="transition hover:text-green-bright focus:outline-none"
                type="button"
              >
                <SearchIcon />
              </button>

              <Link
                aria-label="Account"
                className="transition hover:text-green-bright focus:outline-none"
                href="#"
              >
                <UserIcon />
              </Link>

              <Link
                aria-label="Wishlist"
                className="relative text-gray-700 transition hover:text-green-bright focus:outline-none"
                href="/wishlist"
              >
                <HeartIcon />
                <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] text-white bg-green-bright text-[10px] font-normal rounded-full inline-flex items-center justify-center">
                  {wishlistCount || 0}
                </span>
              </Link>

              <button
                aria-label="Cart"
                className="relative text-gray-700 transition hover:text-green-bright focus:outline-none"
                type="button"
                onClick={handleOpenCartModal}
              >
                <CartIcon />
                <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] text-white bg-green-bright text-[10px] font-normal rounded-full inline-flex items-center justify-center">
                  {cartCount || 0}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                aria-label={navigationOpen ? "Close menu" : "Open menu"}
                className="transition xl:hidden focus:outline-none"
                type="button"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                {navigationOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        headerLogo={headerData?.headerLogo || null}
        isOpen={navigationOpen}
        menuData={menuData}
        onClose={() => setNavigationOpen(false)}
      />
    </>
  );
};

export default MainHeader;
