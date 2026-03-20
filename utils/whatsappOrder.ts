import { formatPrice } from "./formatePrice";

export const openWhatsAppOrder = (
  productTitle: string,
  productPrice: number,
  productSlug: string,
  quantity: number = 1,
  selectedColor?: string,
  selectedSize?: string,
  sku?: string,
  phoneNumber: string = "254747896429", // Replace with your WhatsApp business number
) => {
  const productUrl = `${window.location.origin}/products/${productSlug}`;
  const totalPrice = productPrice * quantity;

  // Clean, professional message format
  let message = `Hello! 👋\n\n`;
  message += `I'm interested in ordering the following item:\n\n`;

  message += `━━━━━━━━━━━━━━━━━━━\n`;
  message += `*${productTitle}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━\n\n`;

  // Product details in a cleaner format
  const details = [];

  if (sku) {
    details.push(`SKU: ${sku}`);
  }

  if (selectedColor) {
    details.push(`Color: ${selectedColor}`);
  }

  if (selectedSize) {
    details.push(`Size: ${selectedSize}`);
  }

  details.push(`Quantity: ${quantity}`);
  details.push(`Unit Price: ${formatPrice(productPrice)}`);

  message += details.join("\n") + "\n\n";

  message += `━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Total: ${formatPrice(totalPrice)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `Product Link:\n${productUrl}\n\n`;
  message += `Please let me know the next steps to complete my order. Thank you! 😊`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};
