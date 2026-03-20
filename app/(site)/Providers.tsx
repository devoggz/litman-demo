"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/system";

import { ReduxProvider } from "@/redux/provider";
import CartProvider from "@/components/Providers/CartProvider";
import CartHydration from "@/components/Providers/CartHydration";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import { PreviewSliderProvider } from "@/app/context/PreviewSliderContext";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export default function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <ReduxProvider>
          <CartHydration />
          <CartProvider>
            <ModalProvider>
              <PreviewSliderProvider>
                {children}

                {/* Global Modals */}
                <QuickViewModal />
                <CartSidebarModal />
                <PreviewSliderModal />
              </PreviewSliderProvider>
            </ModalProvider>
          </CartProvider>
        </ReduxProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

// "use client";
//
// import type { ThemeProviderProps } from "next-themes";
//
// import * as React from "react";
// import { HeroUIProvider } from "@heroui/system";
// import { useRouter } from "next/navigation";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
//
//
// export interface ProvidersProps {
//   children: React.ReactNode;
//   themeProps?: ThemeProviderProps;
// }
//
// declare module "@react-types/shared" {
//   interface RouterConfig {
//     routerOptions: NonNullable<
//       Parameters<ReturnType<typeof useRouter>["push"]>[1]
//     >;
//   }
// }
//
// export function Providers({ children, themeProps }: ProvidersProps) {
//   const router = useRouter();
//
//   return (
//     <HeroUIProvider navigate={router.push}>
//       <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
//     </HeroUIProvider>
//   );
// }
