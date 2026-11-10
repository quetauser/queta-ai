import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-horizontal.png"
                alt={site.name}
                width={140}
                height={32}
                className="block h-auto max-h-8 w-auto object-contain"
              />
            </Link>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Solutions
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navigation.solutions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navigation.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={navigation.faq.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  {navigation.faq.label}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {navigation.legal.label}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navigation.legal.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
