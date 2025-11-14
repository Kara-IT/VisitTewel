import React from 'react'

export default function page() {
  const summaryData = [
    { label: "Total Penduduk", value: "8,337" },
    { label: "Total Kepala Keluarga", value: "1,577" },
    { label: "Laki-laki", value: "4,127" },
    { label: "Perempuan", value: "4,210" }
  ];

  const detailData = [
    { no: 1, dusun: "Tengah", kk: 84, lakilaki: 231, perempuan: 218, total: 449 },
    { no: 2, dusun: "Kacagan", kk: 284, lakilaki: 651, perempuan: 678, total: 1329 },
    { no: 3, dusun: "Puseh", kk: 326, lakilaki: 833, perempuan: 870, total: 1703 },
    { no: 4, dusun: "Pasekan", kk: 109, lakilaki: 330, perempuan: 317, total: 647 },
    { no: 5, dusun: "Pamesan", kk: 180, lakilaki: 499, perempuan: 506, total: 1005 },
    { no: 6, dusun: "Keden", kk: 59, lakilaki: 142, perempuan: 173, total: 315 },
    { no: 7, dusun: "Kucupin", kk: 86, lakilaki: 224, perempuan: 229, total: 453 },
    { no: 8, dusun: "Pabean", kk: 78, lakilaki: 251, perempuan: 241, total: 492 },
    { no: 9, dusun: "Gumicik", kk: 158, lakilaki: 419, perempuan: 430, total: 849 },
    { no: 10, dusun: "Kubur", kk: 124, lakilaki: 307, perempuan: 301, total: 608 },
    { no: 11, dusun: "Manyar", kk: 89, lakilaki: 240, perempuan: 247, total: 487 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-28 pb-16 lg:mt-40 container mx-auto px-4 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
            Demografi Desa Ketewel
          </h1>
          <p className="text-gray-600 text-lg">
            Data kependudukan berdasarkan data terkini
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {summaryData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 border-t-4 border-primary">
              <p className="text-gray-600 text-sm font-medium mb-2">{item.label}</p>
              <p className="text-3xl lg:text-4xl font-bold text-primary">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Detail Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Rincian Penduduk Berdasarkan Dusun
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Dusun/Banjar</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Jumlah KK</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Laki-laki</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Perempuan</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Total Penduduk</th>
                </tr>
              </thead>
              <tbody>
                {detailData.map((item, idx) => (
                  <tr 
                    key={idx}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-800 font-medium">{item.no}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{item.dusun}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-center">{item.kk}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-center">{item.lakilaki}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-center">{item.perempuan}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-center font-semibold text-primary">{item.total}</td>
                  </tr>
                ))}
                <tr className="bg-primary text-white font-semibold">
                  <td colSpan="2" className="px-4 py-3 text-sm">Total (Verifikasi)</td>
                  <td className="px-4 py-3 text-sm text-center">1,577</td>
                  <td className="px-4 py-3 text-sm text-center">4,127</td>
                  <td className="px-4 py-3 text-sm text-center">4,210</td>
                  <td className="px-4 py-3 text-sm text-center">8,337</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer Info */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Catatan:</span> Data demografi Desa Ketewel berdasarkan verifikasi terakhir dengan rincian 11 dusun/banjar.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rasio Jenis Kelamin</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Laki-laki</span>
                <span className="text-xl font-bold text-primary">49.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Perempuan</span>
                <span className="text-xl font-bold text-primary">50.5%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rata-rata Per Dusun</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jumlah KK</span>
                <span className="text-xl font-bold text-primary">143</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Jumlah Penduduk</span>
                <span className="text-xl font-bold text-primary">758</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Dusun Terbesar</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nama</span>
                <span className="text-xl font-bold text-primary">Puseh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Penduduk</span>
                <span className="text-xl font-bold text-primary">1,703</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
