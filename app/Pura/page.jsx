"use client"

import React, { useEffect, useState } from 'react'
import { MapPin, Calendar, Church } from 'lucide-react'
import axios from 'axios'

export default function page() {
    const [infos, setInfos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const BaseURL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setLoading(true)
            const response = await axios.get(
                `${BaseURL}/infos/public?page=1&page_size=10&category=religi`
            )
            setInfos(response.data.data)
            setError(null)
        } catch (err) {
            console.error("Error fetching pura data:", err)
            setError("Gagal mengambil data pura")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-600">Memuat data pura...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mt-28 pb-16 lg:mt-40 container mx-auto px-4 lg:px-10">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                        Pura & Tempat Suci
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Jelajahi kekayaan warisan spiritual Desa Ketewel
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                        {error}
                    </div>
                )}

                {/* Content List */}
                {infos.length > 0 ? (
                    <div className="space-y-6">
                        {infos.map((info) => (
                            <div key={info.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                {/* Card Header with Icon */}
                                <div className="flex items-start gap-4 p-6">

                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                            {info.title}
                                        </h2>

                                    </div>
                                </div>

                                {/* Description */}
                                <div className="px-6 pb-6">
                                    <div
                                        className="text-gray-600 text-sm leading-relaxed line-clamp-4 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: info.description }}
                                    />
                                </div>

                                {/* Links */}
                                <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3 border-t border-gray-100 pt-6">
                                    {info.location_link && (
                                        <a
                                            href={info.location_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                                        >
                                            <MapPin size={18} />
                                            <span>Lokasi</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg">Tidak ada data pura ditemukan</p>
                    </div>
                )}

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-lg shadow p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Tentang Pura di Desa Ketewel
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        Desa Ketewel memiliki kekayaan spiritual yang luar biasa dengan berbagai pura dan tempat suci yang menjadi pusat kehidupan religius masyarakat Bali. Setiap pura memiliki makna dan sejarah yang mendalam, mencerminkan kedalaman tradisi Hindu-Bali yang telah diwariskan turun temurun. Kunjungi dan rasakan ketenangan spiritual di setiap sudut desa ini.
                    </p>
                </div>
            </div>
        </div>
    )
}
