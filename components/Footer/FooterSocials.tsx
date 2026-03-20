import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/app/assets/icons/social";

const socials = [
  {
    id: 1,
    href: "#",
    name: "Facebook",
    icon: FacebookIcon,
  },

  {
    id: 2,
    href: "#",
    name: "Instagram",
    icon: InstagramIcon,
  },
  {
    id: 3,
    href: "#",
    name: "LinkedIn",
    icon: LinkedInIcon,
  },
];

export default function FooterSocials() {
  return (
    <div className="flex items-center gap-4 mt-7.5">
      {socials.map((social) => (
        <Link
          key={social.id}
          className="flex ease-out duration-200 hover:text-blue"
          href={social.href}
        >
          <span className="sr-only">{social.name} link</span>
          <social.icon />
        </Link>
      ))}
    </div>
  );
}
