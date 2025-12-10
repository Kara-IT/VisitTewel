import "./globals.css";
import Navbar from "./Components/Navbar";
import Marque from "./Components/Marque";
import Footer from "./Components/Footer";

export const metadata = {
  title: "Desa Adat Ketewel - Website Resmi | Informasi Kegiatan & Layanan Desa",
  description:
    "Situs resmi Desa Adat Ketewel menyediakan informasi lengkap mengenai kegiatan, layanan, dan potensi desa. Hubungi kami untuk informasi lebih lanjut tentang infrastruktur dan pembangunan desa.",
  keywords: [
    "Desa Adat Ketewel",
    "Kecamatan Sukawati",
    "Kabupaten Gianyar",
    "Bali",
    "layanan desa",
    "kegiatan desa",
    "pembangunan infrastruktur",
  ],
  authors: [{ name: "Desa Adat Ketewel" }],
  creator: "Desa Adat Ketewel",
  publisher: "Desa Adat Ketewel",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://visitketewel.com",
    title: "Desa Adat Ketewel - Website Resmi | Informasi Kegiatan & Layanan Desa",
    description:
      "Situs resmi Desa Adat Ketewel menyediakan informasi lengkap mengenai kegiatan, layanan, dan potensi desa untuk masyarakat.",
    siteName: "Desa Adat Ketewel",
    images: [
      {
        url: "https://visitketewel.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Desa Adat Ketewel",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Adat Ketewel - Website Resmi",
    description:
      "Informasi lengkap tentang kegiatan, layanan, dan potensi Desa Adat Ketewel",
    images: ["https://visitketewel.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  canonical: "https://visitketewel.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="Indonesian" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href="https://visitketewel.com" />
        <meta property="og:locale" content="id_ID" />
      </head>
      <body>
        <Navbar />
        <Marque />
        {children}
        <Footer />
      </body>
    </html>
  );
}
