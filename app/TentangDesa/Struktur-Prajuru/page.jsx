'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function page() {
  const [expandedLevel, setExpandedLevel] = useState({})

  const toggleExpand = (key) => {
    setExpandedLevel(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const paiketanItems = [
    'PECALANG DESA',
    'YOWANA DESA',
    'PEMANGKU PASURTI',
    'PRAWALEN DESA',
    'PEMANGKU PENANGLUK MERANA',
    'TAPPNI DESA',
    'SERATI DESA',
    'GONG INDRA PARIWATI',
    'GONG INDRA PARIWATA',
    'GONG SLONDING',
    'RATU DEDARI',
    'RATU LAMANG',
    'BAJR JAGO',
    'REJANG DEWA',
    'GABOR PITALOKA INDRAKESARI',
    'REJANG RENTENG',
    'REJANG KESARI',
    'REJANG SARI',
    'WAYAAG LEMAH',
    'ENGINEERING DESA',
    'KRAMA ISTRI DESA',
    'KRAMA WERGIA DESA (LANSIA)',
    'KEBERSIHAN LAN TAMANSARI DESA',
    'MERPEPE DESA & PENGOLAHAN SAMPAH DESA (UPS, TPS3R)',
    'USADA DESA (KESEHATAN)',
    'BAYADESA',
    'UNDAGI',
    'PEKASEH',
    'BANDEGA'
  ]

  const StructureBox = ({ title, subtitle, onClick, expanded, hasChildren, level = 0 }) => {
    const baseStyle = level === 0 ? 'bg-primary' :
                     level === 1 ? 'bg-primary/90' :
                     'bg-primary/80'
    
    return (
      <button
        onClick={onClick}
        className={`w-full text-left transition-all duration-200 ${baseStyle} text-white py-3 md:py-4 px-4 rounded-xl shadow-sm hover:shadow-md active:scale-95 flex justify-between items-start gap-3`}
      >
        <div className='flex-1 min-w-0'>
          <div className='text-sm md:text-base font-bold leading-tight'>{title}</div>
          {subtitle && <div className='text-xs md:text-sm text-white/70 mt-1.5 font-medium'>{subtitle}</div>}
        </div>
        {hasChildren && (
          <div className={`flex-shrink-0 mt-0.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={18} className='text-white/70' strokeWidth={2.5} />
          </div>
        )}
      </button>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 pt-24 md:pt-40 pb-12 md:pb-24'>
        <div className='text-center mb-8 md:mb-12'>
          <h1 className='text-2xl md:text-4xl font-bold text-gray-800 mb-2'>
            Struktur Prajuru
          </h1>
          <p className='text-sm md:text-base text-gray-600'>Desa Adat Ketewel</p>
        </div>

        {/* Desktop View - Original Image */}
        <div className='hidden lg:block bg-white p-8'>
          <img src="/struktur.png" alt="Struktur Prajuru Desa" className='w-full h-auto rounded-lg' />
        </div>

        {/* Mobile & Tablet View */}
        <div className='lg:hidden space-y-4 md:space-y-5'>
          {/* PARUMAN DESA */}
          <div className='space-y-4'>
            <StructureBox
              title="PARUMAN DESA"
              hasChildren={true}
              expanded={true}
              level={0}
            />

            {/* Level 1: Main Structure */}
            <div className='space-y-3 md:space-y-4 ml-1 md:ml-2 border-l-2 border-primary/30 pl-4 md:pl-5'>
              
              {/* SABHA DESA */}
              <StructureBox
                title="SABHA DESA"
                subtitle="(40 Diri)"
                level={1}
              />

              {/* BANDESA */}
              <div className='space-y-3 md:space-y-4'>
                <StructureBox
                  title="BANDESA"
                  subtitle="(6 Diri)"
                  onClick={() => toggleExpand('bandesa')}
                  expanded={expandedLevel.bandesa}
                  hasChildren={true}
                  level={1}
                />

                {/* Level 2: Under BANDESA */}
                {expandedLevel.bandesa && (
                  <div className='space-y-3 md:space-y-4 ml-1 md:ml-2 bg-primary/10 p-4 md:p-5 rounded-xl border border-primary/20 border-l-1 border-l-primary/50'>
                    
                    <StructureBox
                      title="JURU ARAH"
                      subtitle="(4 Diri)"
                      level={2}
                    />

                    <StructureBox
                      title="KLIAN ADAT"
                      subtitle="(11 Sanjar)"
                      level={2}
                    />

                    <StructureBox
                      title="BAGA - BAGA PRAJURU"
                      subtitle="(8 - 9 Diri)"
                      level={2}
                    />

                    {/* PAIKETAN DESA ADAT */}
                    <div>
                      <StructureBox
                        title="PAIKETAN DESA ADAT"
                        subtitle="(29 Paiket)"
                        onClick={() => toggleExpand('paiketan')}
                        expanded={expandedLevel.paiketan}
                        hasChildren={true}
                        level={2}
                      />

                      {expandedLevel.paiketan && (
                        <div className='mt-4 bg-white p-4 md:p-5 rounded-xl border-2 border-primary/20 shadow-sm'>
                          <div className='grid grid-cols-1 gap-2.5'>
                            {paiketanItems.map((item, idx) => (
                              <div key={idx} className='flex gap-2.5 text-xs md:text-sm'>
                                <span className='font-bold text-primary flex-shrink-0 w-5 text-center'>{idx + 1}.</span>
                                <span className='text-gray-700 leading-tight'>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* KERTHA DESA */}
              <StructureBox
                title="KERTHA DESA"
                subtitle="(9 Diri)"
                level={1}
              />

              {/* PAWIRASA DESA */}
              <StructureBox
                title="PAWIRASA DESA"
                level={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
