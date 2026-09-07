import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 space-y-4">
      <h1 className="text-6xl font-black text-emerald-600">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-sm text-zinc-500 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-2xl font-bold min-h-[44px]">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
