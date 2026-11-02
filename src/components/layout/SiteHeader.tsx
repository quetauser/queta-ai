import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation, site } from "@/content/site-content";
import { SiteHeaderClient } from "@/components/layout/SiteHeaderClient";

export function SiteHeader() {
  return (
    <SiteHeaderClient
      logo={
        <Link href="/" className="flex shrink-0 flex-col items-start leading-none">
          <Image
            src="/logo-horizontal.png"
            alt={site.name}
            width={160}
            height={36}
            className="block h-auto max-h-7 w-auto max-w-full object-contain"
            priority
          />
          <span className="mt-0.5 text-[10px] font-medium tracking-wide text-foreground/55">
            {site.logoTagline}
          </span>
        </Link>
      }
      navigation={navigation}
      menuIcon={<Menu size={22} />}
      closeIcon={<X size={22} />}
      chevronIcon={<ChevronDown size={14} />}
    />
  );
}
