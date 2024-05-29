'use client'
import React, { useState , useEffect} from 'react'
import db from '@/db/db'
import "./listanimes.css"
import Pagination from '@/components/Pagination'
import Filter from '@/components/Filter';
import Link from 'next/link';

function Listanimes() {
  const data = db
    //pagination start
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      //pagination end
      const [filteredData, setFilteredData] = useState(db);
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
              <Link href={`/${encodeURIComponent(anime.name)}`} passHref>
                <img src={anime.image} alt={anime.name} className="image" />
              </Link>
              <h3 className="name">{anime.name}</h3>
              <p className="value">⭐{anime.value}</p>
            </div>
          ))}
      </div>
      <div>
      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
      </div>
    </div>
  )
}

export default Listanimes