import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "coming soon",
  description: "coming soon",
  openGraph: {
    title: "coming soon",
    description: "coming soon",
    images: [],
  },
};

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <p className="text-2xl text-foreground">coming soon</p>
    </main>
  );
}
