'use client'

import React, { useState, useEffect } from 'react'
import db from '@/db/db'
import "./listanimes.css"
import Pagination from '@/components/Pagination'
import Filter from '@/components/Filter'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Listanimes({ searchParams }) {
  const router = useRouter()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const [filteredData, setFilteredData] = useState(db)

  const itemsPerPage = 20
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`/?${params.toString()}`);
  }

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      handlePageChange(totalPages)
    }
  }, [currentPage, totalPages, handlePageChange]);

  useEffect(() => {
    const categories = searchParams.get('categories')?.split(',') || [];
    const minValue = searchParams.get('minValue') || "0";
    const maxValue = searchParams.get('maxValue') || "10";
    const sortOrder = searchParams.get('sortOrder') || null;
    const selectedStatus = searchParams.get('status') || null;
    const searchName = searchParams.get('name') || "";

    const filteredData = db.filter(item => {
      const categoryMatch = categories.length === 0 || item.category.some(c => categories.includes(c));
      const valueMatch = item.value >= parseFloat(minValue) && item.value <= parseFloat(maxValue);
      const statusMatch = selectedStatus === null || item.status === selectedStatus;
      const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
      return categoryMatch && valueMatch && statusMatch && nameMatch;
    });

    const sortedData = sortOrder
      ? filteredData.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
          } else if (sortOrder === 'desc') {
            return b.name.localeCompare(a.name);
          } else if (sortOrder === 'value-asc') {
            return a.value - b.value;
          } else if (sortOrder === 'value-desc') {
            return b.value - a.value;
          } else {
            return 0;
          }
        })
      : filteredData;

    setFilteredData(sortedData);
  }, [searchParams]);

  return (
    <div className="container">
      <h1 className='title'>Listanimes</h1>
      <Filter data={db} onFilter={setFilteredData} />
      <div className="cardContainer">
         {/* La función slice(0, 20) tomará los primeros 20 elementos del arreglo data */}
      {/* si no se quiere usar filtro cambiar abajo filteredData.slice por data.slice */}
        {filteredData
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((anime) => (
            <div key={anime.id} className="card">
              <Link href={`/${encodeURIComponent(anime.name)}?${searchParams.toString()}`} passHref>
                <img src={anime.image} alt={anime.name} className="image" />
              </Link>
              <h3 className="name">{anime.name}</h3>
              <p className="value">⭐{anime.value}</p>
            </div>
          ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Listanimes