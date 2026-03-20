import React from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

import Footer from "../../components/Footer";

import Providers from "./Providers";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import MainHeader from "@/components/Header/MainHeader";
import { getHeaderSettings } from "@/components/get-api-data/header-setting";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerSettingData = await getHeaderSettings();

  return (
    <div>
      <PreLoader />
      <>
        <Providers>
          <NextTopLoader
            color="#0DF205"
            crawlSpeed={300}
            shadow="none"
            showSpinner={false}
          />
          <MainHeader headerData={headerSettingData} />
          {/*<Breadcrumb />*/}
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </Providers>
        <ScrollToTop />
        <Footer />
      </>
    </div>
  );
}
