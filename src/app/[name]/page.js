"use client"
import db from '@/db/db';
import './name.css';
import React, { useState, useEffect } from 'react';

function getDataName(anime_name, setAnime) {
  const selectedAnime = db.find(item => item.name === anime_name);
  setAnime(selectedAnime);
}

function Name({ params }) {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const decodedName = decodeURIComponent(params.name);
    getDataName(decodedName, setAnime);
  }, [params.name]);  // Dependencias para que se ejecute cuando params.name cambie

  if (!anime) {
    return <div>Loading...</div>;  // Manejo de estado de carga
  }

  return (
    <div className="name-container">
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
  );
}

export default Name;
