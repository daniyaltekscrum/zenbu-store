import { CartView } from "@/components/storefront/cart-view";
import { STORE_NAME } from "@/lib/constants";

export const metadata = {
  title: "Shopping Cart — Review Your Items",
  description: "Review your selected baby formulas and diapers before Cash on Delivery checkout.",
  alternates: {
    canonical: "/cart",
  },
  openGraph: {
    title: `Shopping Cart — ${STORE_NAME}`,
    description: "Review your selected items with Cash on Delivery across Pakistan.",
    url: "/cart",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <CartView />
    </main>
  );
}
