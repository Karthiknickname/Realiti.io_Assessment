import Link from "next/link";

const footerLinks = [
  { name: "Privacy", href: "#privacy" },
  { name: "Help", href: "#help" },
  { name: "Contact", href: "mailto:hello@realiti.io.app" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Realiti.io. All rights reserved.
        </p>

        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-gray-500 transition-colors hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <p className="pb-5 text-center text-xs text-gray-400">
        Organize your work. Achieve more.
      </p>
    </footer>
  );
}