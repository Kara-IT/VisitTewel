import React from "react";

export default function Footer() {
  const navigationLinks = [
    "Profile Desa",
    "Struktur Prajuru",
    "Demografi",
    "Prestasi",
    "Pura",
    "BUPDA",
    "Perpustakaan",
    "Laporan",
    "Regulasi",
    "Perencanaan",
    "Objek Wisata",
  ];

  return (
    <footer className="bg-blue-950 text-white">
      <div className="container mx-auto px-6">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  Desa Adat Ketewel
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Situs resmi Desa Adat Ketewel yang menyediakan informasi
                  terkini mengenai kegiatan, layanan, dan potensi desa untuk
                  masyarakat.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm border-l-2 pl-2 text-blue-100">
                  Jln.Pura Margatiga, Br. Puseh, Ketewel, Sukawati, Gianyar - Bali
                </p>
                <a
                  href="mailto:desaketewel04@gmail.com"
                  className="text-sm  border-l-2 pl-2 text-blue-100 block"
                >
                  desaadatketewel01@gmail.com
                </a>
                <a
                  href="tel:+6203612974774"
                  className="text-sm  border-l-2 pl-2 text-blue-100 block"
                >
                  +6285792558149
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-6">
                Navigasi Desa Ketewel
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 space-x-6 space-y-2">
                {navigationLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-blue-100 text-sm py-1 block"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-sm">
              © 2025 Desa Adat Ketewel. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 text-sm">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-blue-200 text-sm">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
