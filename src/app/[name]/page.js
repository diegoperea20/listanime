'use client'

import db from '@/db/db'
import './name.css'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

function Name({ params }) {
  const [anime, setAnime] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const decodedName = decodeURIComponent(params.name)
    const foundAnime = db.find(item => item.name === decodedName)
    if (foundAnime) {
      setAnime(foundAnime)
    } else {
      setError('Anime no encontrado')
    }
  }, [params.name])

  const handleBack = () => {
    router.push(`/?${searchParams.toString()}`)
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  if (!anime) {
    return <div className="loading-container">Cargando...</div>
  }

  return (
    <div className="name-container">
     {/*  <button onClick={handleBack} className="back-button">Volver a la lista</button> */}
      <div className="name-box">
        <div className="name-image-container">
          <Image 
            src={anime.image} 
            alt={anime.name} 
            width={500} 
            height={300} 
            className="name-image"
          />
          <div className={anime.status === 'Finalizado' ? 'name-status-finish' : 'name-status'}>
            {anime.status}
          </div>
        </div>
        <div className="name-info">
          <div className="name-title">{anime.name}</div>
          <div className="name-category">{anime.category.join(', ')}</div>
          <div className="name-description">{anime.description}</div>
          <div className="name-value">⭐{anime.value}/10</div>
        </div>
      </div>
    </div>
  )
}

export default Name