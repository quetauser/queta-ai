"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface Navigation {
  solutions: readonly NavItem[];
  links: readonly NavItem[];
  legal: { label: string; links: readonly NavItem[] };
  feedback: NavItem;
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
  const pathname = usePathname();
  const showDemoCta = pathname !== "/contact";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  useEffect(() => {
    if (!legalOpen) {
      return;
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLegalOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [legalOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-transparent md:bg-transparent md:border-none">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {logo}

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-4 lg:gap-8"
        >
          <div
            className="relative"
            onMouseEnter={() => {
              setSolutionsOpen(true);
              setLegalOpen(false);
            }}
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
          {navigation.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => {
              setSolutionsOpen(false);
              setLegalOpen(true);
            }}
            onMouseLeave={() => {
              setLegalOpen(false);
            }}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              aria-expanded={legalOpen}
              onClick={(event) => {
                setSolutionsOpen(false);
                if (event.detail > 0) {
                  return;
                }
                setLegalOpen((open) => !open);
              }}
            >
              {navigation.legal.label}
              <span className={legalOpen ? "rotate-180 transition-transform duration-200" : "transition-transform duration-200"}>
                {chevronIcon}
              </span>
            </button>
            {legalOpen ? (
              <div className="absolute top-full left-0 pt-2 w-56">
                <div className="rounded-xl border border-border bg-white shadow-lg py-2">
                  {navigation.legal.links.map((item) => (
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
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href={navigation.feedback.href}
            className="whitespace-nowrap text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            {navigation.feedback.label}
          </Link>
          {showDemoCta ? (
            <Link
              href={navigation.cta.href}
              className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {navigation.cta.label}
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground"
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
          {navigation.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm font-medium text-foreground/80"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {navigation.legal.label}
          </p>
          <div className="flex flex-col gap-2">
            {navigation.legal.links.map((item) => (
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
          <Link
            href={navigation.feedback.href}
            className="block text-sm font-medium text-foreground/80"
            onClick={() => setMobileOpen(false)}
          >
            {navigation.feedback.label}
          </Link>
          {showDemoCta ? (
            <Link
              href={navigation.cta.href}
              className="inline-flex px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {navigation.cta.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
