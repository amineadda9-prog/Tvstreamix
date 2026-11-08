/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  YOUR CONTACT DETAILS — edit this file before you go live.       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Leave a value empty ("") to hide that option from the website.
 */
type ContactConfig = {
  /** WhatsApp Business number — international format, digits only (no "+", no spaces). Example: "447700900123" */
  whatsapp: string;
  /** Facebook page username — the part after facebook.com/ . Opens a Messenger chat. */
  facebook: string;
  /** Instagram username — the part after instagram.com/ . Opens a direct message. */
  instagram: string;
  /** Public support email (shown in the FAQ and footer). */
  email: string;
  /**
   * Where the "Leave your details" form is delivered.
   *  1. Create a free form at https://formspree.io (or https://web3forms.com)
   *  2. Paste its URL here, e.g. "https://formspree.io/f/abcdwxyz"
   *  3. Web3Forms only: also paste your access key into `formAccessKey`
   * While this is empty, the form opens WhatsApp with the client's details
   * pre-filled instead, so no request is ever lost.
   */
  formEndpoint: string;
  formAccessKey: string;
};

export const CONTACT: ContactConfig = {
  whatsapp: "15550000000", // ← REPLACE with your WhatsApp Business number
  facebook: "tvstreamix", // ← REPLACE with your Facebook page username
  instagram: "tvstreamix", // ← REPLACE with your Instagram username
  email: "support@tvstreamix.com", // ← REPLACE with your support email
  formEndpoint: "",
  formAccessKey: "",
};

const waNumber = () => CONTACT.whatsapp.replace(/\D/g, "");

export const links = {
  /** Opens a WhatsApp chat with you, optionally with a pre-written message. */
  whatsapp: (text?: string) => `https://wa.me/${waNumber()}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
  /** Opens a Messenger chat with your Facebook page. */
  messenger: () => `https://m.me/${CONTACT.facebook}`,
  /** Opens an Instagram direct message. */
  instagramDm: () => `https://ig.me/m/${CONTACT.instagram}`,
  facebookPage: () => `https://www.facebook.com/${CONTACT.facebook}`,
  instagramPage: () => `https://www.instagram.com/${CONTACT.instagram}`,
};
