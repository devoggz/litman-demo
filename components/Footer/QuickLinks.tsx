import Link from "next/link";

const quickLinks = [
  {
    id: 1,
    label: "Privacy Policy",
    href: "#",
  },
  {
    id: 2,
    label: "Refund Policy",
    href: "#",
  },
  {
    id: 3,
    label: "Terms of Use",
    href: "#",
  },
  {
    id: 4,
    label: "Contact",
    href: "#",
  },
];

export default function QuickLinks() {
  return (
    <div className="w-full sm:w-auto">
      <h2 className="mb-7.5 text-xl font-semibold text-dark-6">Quick Links</h2>

      <ul className="flex flex-col gap-3">
        {quickLinks.map((link) => (
          <li key={link.id}>
            <Link
              className="text-base duration-200 ease-out hover:text-green-bright"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
