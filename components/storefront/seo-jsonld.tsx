import React from "react";
import { CatalogProduct, CatalogCategory } from "@/lib/catalog";
import { STORE_NAME, STORE_DESCRIPTION, WHATSAPP_PHONE } from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zenbu.store";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: STORE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/1.png`,
    description: STORE_DESCRIPTION,
    telephone: WHATSAPP_PHONE,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: WHATSAPP_PHONE,
        contactType: "customer service",
        availableLanguage: ["English", "Urdu"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: STORE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: CatalogProduct }) {
  const productUrl = `${SITE_URL}/product/${product.slug}`;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [imageUrl],
    description: product.description || product.title,
    sku: product.sku || product.slug,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category.name,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "PKR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: STORE_NAME,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "18",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
