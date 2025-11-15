'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PembangunanService } from '../../Service/PembangunanService'
import { ChevronLeft } from 'lucide-react'

export default function page() {
  const params = useParams()
  const router = useRouter()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchDetail()
    }
  }, [params.id])

  const fetchDetail = async () => {
    try {
      setLoading(true)
      const result = await PembangunanService.getDevelopmentPlanById(params.id)
      setDetail(result.data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-center'>
          <p className='text-gray-600'>Data tidak ditemukan</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto px-4 pt-20 md:pt-40 pb-12 md:pb-24'>
        {/* Header */}
        <button
          onClick={() => router.back()}
          className='flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-8 transition-colors'
        >
          <ChevronLeft size={20} />
          Kembali
        </button>

        <div className='border border-gray-200 rounded-lg overflow-hidden'>
          {/* Images Gallery */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-8 bg-white border-b border-gray-200'>
            {[detail.image1, detail.image2, detail.image3, detail.image4].map(
              (image, idx) =>
                image && (
                  <div key={idx} className='rounded-lg overflow-hidden bg-gray-100 h-48 md:h-56 border border-gray-200'>
                    <img
                      src={image}
                      alt={`Gambar ${idx + 1}`}
                      className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                )
            )}
          </div>

          {/* Detail Content */}
          <div className='p-6 md:p-8'>
            <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-8'>{detail.name}</h1>

            {/* Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
              <DetailCard
                label="Alamat"
                value={detail.address}
                icon="📍"
              />
              <DetailCard
                label="Sumber Dana"
                value={detail.funding_source}
                icon="💰"
              />
              <DetailCard
                label="Tanggal Mulai"
                value={PembangunanService.formatDate(detail.start_date)}
                icon="📅"
              />
              <DetailCard
                label="Tanggal Selesai"
                value={PembangunanService.formatDate(detail.end_date)}
                icon="✓"
              />

              {/* Budget Info */}
              <div className='md:col-span-2 p-6 rounded-lg border border-gray-200'>
                <h3 className='font-bold text-gray-900 mb-4'>Informasi Anggaran</h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center pb-3 border-b border-gray-200'>
                    <span className='text-gray-700'>Total Anggaran</span>
                    <span className='font-semibold text-lg text-primary'>{PembangunanService.formatCurrency(detail.budget)}</span>
                  </div>
                  <div className='flex justify-between items-center pb-3 border-b border-gray-200'>
                    <span className='text-gray-700'>Dana Terealisasi</span>
                    <span className='font-semibold text-lg text-primary'>{PembangunanService.formatCurrency(detail.realized_funds)}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-700'>Dana Tersisa</span>
                    <span className='font-semibold text-lg text-primary'>{PembangunanService.formatCurrency(detail.remaining_funds)}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className='mt-4 pt-4 border-t border-gray-200'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-sm text-gray-600'>Realisasi</span>
                      <span className='text-sm font-semibold text-primary'>
                        {((detail.realized_funds / detail.budget) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-primary rounded-full h-2 transition-all duration-500'
                        style={{ width: `${(detail.realized_funds / detail.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maps Link */}
              {detail.location_link && (
                <div className='md:col-span-2'>
                  <a
                    href={detail.location_link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg text-center transition-colors border border-primary'
                  >
                    📍 Lihat Lokasi di Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Timestamps */}
            <div className='mt-8 pt-8 border-t border-gray-200'>
              <p className='text-xs text-gray-500'>
                Dibuat pada: {new Date(detail.created_at).toLocaleString('id-ID')}
              </p>
              <p className='text-xs text-gray-500'>
                Diperbarui pada: {new Date(detail.updated_at).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailCard = ({ label, value, icon }) => (
  <div className='p-5 rounded-lg border border-gray-200 bg-white'>
    <div className='flex items-start gap-3'>
      <span className='text-2xl flex-shrink-0'>{icon}</span>
      <div className='flex-1 min-w-0'>
        <label className='text-sm font-semibold text-gray-600'>{label}</label>
        <p className='text-gray-900 font-medium mt-1 break-words'>{value}</p>
      </div>
    </div>
  </div>
)
