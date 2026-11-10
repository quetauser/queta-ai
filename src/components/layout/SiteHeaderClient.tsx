"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface Navigation {
  solutions: readonly NavItem[];
  links: readonly NavItem[];
  faq: NavItem;
  cta: NavItem;
}

interface SiteHeaderClientProps {
  logo: ReactNode;
  navigation: Navigation;
  menuIcon: ReactNode;
  closeIcon: ReactNode;
  chevronIcon: ReactNode;
}

export function SiteHeaderClient({
  logo,
  navigation,
  menuIcon,
  closeIcon,
  chevronIcon,
}: SiteHeaderClientProps) {
  const headerLinks = navigation.links.filter((item) => item.href !== "/about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-transparent md:bg-transparent md:border-none">
      <div className="relative mx-auto h-16 max-w-7xl">
        <div className="absolute left-6 top-0 flex h-16 items-center">{logo}</div>

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 top-0 hidden h-16 -translate-x-1/2 items-center gap-4 md:flex lg:gap-8"
        >
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              aria-expanded={solutionsOpen}
            >
              Solutions
              <span className={solutionsOpen ? "rotate-180 transition-transform duration-200" : "transition-transform duration-200"}>
                {chevronIcon}
              </span>
            </button>
            {solutionsOpen ? (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div className="rounded-xl border border-border bg-white shadow-lg py-2">
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/40"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {headerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navigation.faq.href}
            className="whitespace-nowrap text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            {navigation.faq.label}
          </Link>
          <Link
            href={navigation.cta.href}
            className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {navigation.cta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="absolute right-4 top-0 flex h-16 items-center md:hidden p-2 rounded-md text-foreground"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? closeIcon : menuIcon}
        </button>
      </div>

      {mobileOpen ? (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Solutions
          </p>
          <div className="flex flex-col gap-2">
            {navigation.solutions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foreground/80"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {headerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm font-medium text-foreground/80"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navigation.faq.href}
            className="block text-sm font-medium text-foreground/80"
            onClick={() => setMobileOpen(false)}
          >
            {navigation.faq.label}
          </Link>
          <Link
            href={navigation.cta.href}
            className="inline-flex px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground"
            onClick={() => setMobileOpen(false)}
          >
            {navigation.cta.label}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
