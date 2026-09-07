export const STORE_NAME = "Zenbu.Store";
export const STORE_DESCRIPTION =
  "Curated premium products with effortless shopping, Cash on Delivery, and direct WhatsApp support.";

// WhatsApp configuration (locked in per spec)
export const WHATSAPP_PHONE = "+92 312 0813050";
export const WHATSAPP_PHONE_CLEAN = "923120813050";

export const getWhatsAppOrderUrl = (
  orderId: string,
  itemsOrTotal: string[] | number,
  total?: number,
  deliveryAddress?: string,
  customerPhone?: string
) => {
  let message = "";
  if (Array.isArray(itemsOrTotal)) {
    const lines = itemsOrTotal.join("\n- ");
    message = `Hi Zenbu.Store! I have placed order #${orderId}.\n\nItems:\n- ${lines}\n\nTotal: Rs. ${total?.toLocaleString()}\nAddress: ${deliveryAddress || "N/A"}\nPhone: ${customerPhone || "N/A"}\n\nPlease confirm my Cash on Delivery order!`;
  } else {
    message = `Hi Zenbu.Store! I would like to inquire about my order #${orderId} (Total: Rs. ${itemsOrTotal.toLocaleString()}).`;
  }
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${text}`;
};

export const getWhatsAppProductInquiryUrl = (
  productTitle: string,
  productUrl?: string
) => {
  const text = encodeURIComponent(
    `Hi Zenbu.Store! I'm interested in "${productTitle}"${productUrl ? ` (${productUrl})` : ""}. Could you provide more details?`
  );
  return `https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${text}`;
};

export const getWhatsAppGeneralUrl = () => {
  const text = encodeURIComponent(
    `Hi Zenbu.Store! I have a question about shopping on your store.`
  );
  return `https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${text}`;
};

// Payment methods: strictly COD and WhatsApp
export const PAYMENT_METHODS = {
  COD: "cod",
  WHATSAPP: "whatsapp",
} as const;

export const PAYMENT_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;
