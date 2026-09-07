import { StorefrontNavbar } from "@/components/storefront/navbar";
import { StorefrontFooter } from "@/components/storefront/footer";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/40 dark:bg-zinc-950 transition-colors">
      <StorefrontNavbar />
      <div className="flex-1">{children}</div>
      <StorefrontFooter />
    </div>
  );
}
