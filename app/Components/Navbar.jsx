"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Navbar() {
  const drawerToggleRef = useRef(null);

  const closeDrawer = () => {
    if (drawerToggleRef.current) {
      drawerToggleRef.current.checked = false;
    }
  };

  const navItems = [
    {
      title: "Tentang Desa",
      items: [
        { title: "Sejarah Desa", href: "/TentangDesa/Sejarah" },
        { title: "Demografi", href: "/TentangDesa/Demografi" },
        { title: "Struktur Prajuru", href: "/TentangDesa/Struktur-Prajuru" },
      ],
    },
    {
      title: "Keagamaan",
      items: [{ title: "Pura", href: "/Pura" }],
    },
    {
      title: "Keuangan & Laporan",
      items: [
        { title: "Laporan Keuangan", href: "/Laporan-Keuangan" },
        { title: "Laporan Perencanaan", href: "/Perencanaan-Desa" },
        {
          title: "Laporan Pembangunan",
          href: "/Pembangunan-Desa",
        },
      ],
    },
    {
      title: "Pariwisata",
      items: [{ title: "Objek Wisata", href: "/wisata" }],
    },
    {
      title: "Layanan Informasi",
      items: [
        { title: "Regulasi Desa Adat", href: "/Regulasi-Desa" },
        { title: "Berita", href: "/Blog" },
        { title: "Pengumuman", href: "/Blog" },
        {
          title: "Perpustakaan Digital",
          href: "/Perpustakaan-Digital",
        },
        { title: "Prestasi", href: "/Prestasi" },
        // { title: "BUBDA", href: "/layanan-informasi/bubda" },
      ],
    },
  ];

  return (
    <div className="drawer">
      <input
        ref={drawerToggleRef}
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content">
        <nav className="h-18 fixed bg-white border-b border-b-base-300 w-full z-50 flex items-center">
          <div className="container mx-auto flex justify-between items-center px-4">
            <a href="/">
              <Image src="/logo.svg" alt="Logo" width={48} height={48} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <ul className="flex space-x-2">
                {navItems.map((navItem, index) => (
                  <li key={index}>
                    <div className="dropdown dropdown-end dropdown-hover">
                      <div
                        tabIndex={0}
                        role="button"
                        className="text-gray-500 text-sm hover:text-primary my-3 mx-2 flex cursor-pointer items-center gap-1 transition-colors duration-200 group"
                      >
                        {navItem.title}
                        <ChevronDown className="transition-transform duration-200 size-5 group-hover:rotate-180" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 border text-sm border-base-300"
                      >
                        {navItem.items.map((item, itemIndex) => (
                          <li className="py-0.5" key={itemIndex}>
                            <Link
                              className="text-gray-500 hover:text-primary"
                              href={item.href}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <label
                htmlFor="mobile-drawer"
                className="btn btn-square btn-ghost"
              >
                <Menu className="size-6" />
              </label>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <aside className="min-h-full w-full bg-base-100">
          <div className="flex justify-between items-center border-b border-b-base-300 mb-2 px-3 py-4">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <label htmlFor="mobile-drawer" className="btn btn-square btn-ghost">
              <X className="size-6" />
            </label>
          </div>

          <ul className="space-y-1">
            {navItems.map((navItem, index) => (
              <li key={index}>
                <div className="collapse collapse-arrow">
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium text-gray-700">
                    {navItem.title}
                  </div>
                  <div className="collapse-content">
                    <ul className="space-y-1">
                      {navItem.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            className="block py-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded"
                            href={item.href}
                            onClick={closeDrawer}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
