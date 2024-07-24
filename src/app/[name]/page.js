'use client'
import db from '@/db/db'
import './name.css'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function getDataName(anime_name, setAnime) {
  const selectedAnime = db.find(item => item.name === anime_name)
  setAnime(selectedAnime)
}

function Name({ params }) {
  const [anime, setAnime] = useState(() => {
    const decodedName = decodeURIComponent(params.name)
    return db.find(item => item.name === decodedName) || null
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  
  if (!anime) {
    return null // O podrías retornar un componente de error aquí
  }

  const handleBack = () => {
    router.push(`/?${searchParams.toString()}`)
  }

  return (
    <div className="name-container">
      {/* <button onClick={handleBack} className="back-button">Volver a la lista</button> */}
      <div className="name-box">
        <div className="name-image-container">
          <img src={anime.image} alt={anime.name} className="name-image" />
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