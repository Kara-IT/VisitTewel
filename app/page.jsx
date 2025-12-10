import { MoveRight } from "lucide-react";
import Link from "next/link";
import KabarKetewel from "./Section/Home/KabarKetewel";
import Wisata from "./Section/Home/Wisata";
import FAQ from "./Section/Home/FAQ";

export default function Home() {
  const dataKeunikan = [
    {
      id: 1,
      title: "LAYANAN DESA",
      description: "Akses Mudah Pelayanan Digital",
    },
    {
      id: 2,
      title: "BUDAYA & TRADISI",
      description: "Menjaga Warisan Leluhur",
    },
    {
      id: 3,
      title: "WISATA KETEWEL",
      description: "Pura Bersejarah & Wisata Pantai",
    },
  ];

  return (
    <div className="pb-24">
      <section id="bgHero" className="mt-18 lg:mt-26 relative w-full h-[800px]">
        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto px-4 lg:px-10 h-full -mt-16 lg:-mt-0 flex items-center">
            <div className="text-white">
              <h1 className=" text-3xl lg:text-6xl font-semibold">
                Selamat Datang di Portal Resmi
                <br />
                Desa Adat Ketewel
              </h1>
              <p className=" text-sm lg:text-base mt-4">
                Menyediakan informasi desa, layanan adat, keuangan, dan potensi
                wisata dalam <br className="hidden lg:block" /> satu platform
                digital yang mudah diakses.
              </p>
              <Link
                href="/TentangDesa/Sejarah"
                className=" gap-4 flex lg:text-base text-sm items-center mt-8"
              >
                Jelajahi Desa <MoveRight className="size-5" />
              </Link>

              <div className=" mt-24 lg:mt-32">
                <div className=" space-y-6 lg:space-y-0 block lg:flex gap-24">
                  {dataKeunikan.map((item) => (
                    <div key={item.id}>
                      <h2 className="text-sm text-[#BCDAFF] font-semibold uppercase">
                        {item.title}
                      </h2>
                      <p className="mt-1 lg:text-base text-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="KabarKetewel"
        className="container mx-auto px-4 lg:px-10 mt-10 lg:mt-18"
      >
        <KabarKetewel />
      </section>

      <section
        id="Wisata"
        className="container mx-auto px-4 lg:px-10 mt-10 lg:mt-18"
      >
        <Wisata />
      </section>

      <section
        id="FAQ"
        className="container mx-auto px-4 lg:px-10 mt-10 lg:mt-18"
      >
        <FAQ />
      </section>
    </div>
  );
}
