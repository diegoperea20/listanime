'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import db from '@/db/db';
import Name from '@/components/Name';

export async function generateStaticParams() {
  // Devuelve una lista de objetos con los valores de 'name' que deseas generar estáticamente
  return db.map(item => ({ name: item.name }));
}

function NamePage() {
  const searchParams = useSearchParams();
  const [anime, setAnime] = useState(null);
  const name = searchParams.get('name');

  useEffect(() => {
    const selectedAnime = db.find(item => item.name === name);
    setAnime(selectedAnime);
  }, [name]);

  if (anime === null) {
    return <div>Buscando anime...</div>;
  }

  if (!anime) {
    return <div>Anime no encontrado</div>;
  }

  return <Name anime={anime} />;
}

export default NamePage;