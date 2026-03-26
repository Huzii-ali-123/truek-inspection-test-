import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXRay,
} from "react-icons/fa";

export const socialLinks = [
  {
    icon: FaGithub,
    href: "https://TrueKinspection.com",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://TrueKinspection.com",
    label: "LinkedIn",
  },
  {
    icon: FaFacebook,
    href: "https://TrueKinspection.com",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://TrueKinspection.com",
    label: "Instagram",
  },
  { icon: FaXRay, href: "https://TrueKinspection.com", label: "Twitter" },
];

export const pricing = [
  {
    id: "10201",
    plan: "Our Plan",
    price: "$49",
    features: [
      "1 Vehicle Report",
      "Vehicle Specification",
      "DMV Title History",
      "Safety Recall Status",
      "Online Listing History",
      "Junk & Salvage Information",
      "Accident Information",
    ],
  },
];

// Development client ID
// const clientId = process.env.PAYPAL_CLIENT_ID || "AQsStKntXHJGDVxiJVmp4-J6bNf3M-umQ8M3WEPeUwOEnktYawrNdW0J38KDO8X1ltgIAFLdIhx58LTN"

// Production client ID
const clientId = process.env.PAYPAL_CLIENT_ID || "AZEJPyvW2kaGMzu2t2TtluJXbuzP946oSODsYs4vZjjAeQK0Kj5a1fg-bE-By1XhafgC1bXhKpe4x8ej"

export const initialOptions = {
  clientId: clientId,
  currency: "USD",
  intent: "capture",
};
