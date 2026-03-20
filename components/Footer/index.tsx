import Link from "next/link";

import AccountLinks from "./AccountLinks";
import FooterBottom from "./FooterBottom";
import QuickLinks from "./QuickLinks";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/app/assets/icons/social";
import { CallIcon, EmailIcon, MapIcon } from "@/app/assets/icons";

const Footer = () => {
  return (
    <footer className="overflow-hidden border-t border-gray-3">
      <div className="px-4 mx-auto max-w-7xl sm:px-8 xl:px-0">
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-17.5 xl:pt-22.5 pb-10 xl:pb-20">
          <div className="max-w-[330px] w-full">
            <h2 className="mb-7.5 text-xl font-semibold text-dark">
              Visit or Talk to Us
            </h2>

            <ul className="flex flex-col gap-3">
              <li className="flex gap-4.5 text-base">
                <span className="shrink-0">
                  <MapIcon className="fill-dark-6" height={24} width={24} />
                </span>
                Ground Floor Premiere Building, Cannon Awuor Street Kakamega.
              </li>

              <li>
                <Link
                  className="flex items-center gap-4.5 text-base"
                  href="tel:+099 532-786-9843"
                >
                  <CallIcon className="fill-dark-6" height={24} width={24} />
                  +254 701 699 766
                </Link>
              </li>

              <li>
                <Link
                  className="flex items-center gap-4.5 text-base"
                  href="mailto:support@example.com"
                >
                  <EmailIcon className="fill-dark-6" height={24} width={24} />
                  support@litman.co.ke
                </Link>
              </li>
            </ul>

            {/* <!-- Social Links start --> */}
            <div className="flex items-center gap-4 mt-7.5">
              <Link
                className="flex duration-200 ease-out hover:text-green-bright"
                href="#"
              >
                <span className="sr-only">Facebook link</span>
                <FacebookIcon />
              </Link>

              <Link
                className="flex duration-200 ease-out hover:text-green-bright"
                href="#"
              >
                <span className="sr-only">Twitter link</span>
                <TwitterIcon />
              </Link>

              <Link
                className="flex duration-200 ease-out hover:text-green-bright"
                href="#"
              >
                <span className="sr-only">Instagram link</span>
                <InstagramIcon />
              </Link>

              <Link
                aria-label="Linkedin Social Link"
                className="flex duration-200 ease-out hover:text-green-bright"
                href="#"
              >
                <span className="sr-only">LinkedIn link</span>
                <LinkedInIcon />
              </Link>
            </div>
            {/* <!-- Social Links end --> */}
          </div>

          <AccountLinks />

          <QuickLinks />
        </div>
        {/* <!-- footer menu end --> */}
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
