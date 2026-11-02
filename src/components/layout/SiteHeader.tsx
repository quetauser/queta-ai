import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation, site } from "@/content/site-content";
import { SiteHeaderClient } from "@/components/layout/SiteHeaderClient";

export function SiteHeader() {
  return (
    <SiteHeaderClient
      logo={
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-horizontal.png"
            alt={site.name}
            width={160}
            height={36}
            className="block h-auto max-h-9 w-auto max-w-full object-contain"
            priority
          />
        </Link>
      }
      navigation={navigation}
      menuIcon={<Menu size={22} />}
      closeIcon={<X size={22} />}
      chevronIcon={<ChevronDown size={14} />}
    />
  );
}
