import { StorefrontNavbar } from "@/components/storefront/navbar";
import { StorefrontFooter } from "@/components/storefront/footer";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-zinc-50/40 dark:bg-zinc-950 transition-colors pb-14 md:pb-0">
        <StorefrontNavbar />
        <div className="flex-1">{children}</div>
        <StorefrontFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

