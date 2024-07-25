'use client';
import React, { useState, useEffect } from 'react';
import './header.css';
import db from '@/db/db';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearch = (term) => {
    setSearchTerm(term);
    const results = db.filter((anime) =>
      anime.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClickOutside = (event) => {
    if (
      event.target.tagName !== 'INPUT' &&
      !event.target.closest('.search-nav')
    ) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleResetFilters = () => {
    // evento personalizado para comunicar el reset de filtros
    const event = new CustomEvent('resetFilters');
    window.dispatchEvent(event);
    router.push('/');
  };

  return (
    <header className="header">
     <div className="brand">
        <a href="/" onClick={handleResetFilters}>Listanimes</a>
      </div>
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          className="search-nav"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchTerm && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((anime) => (
              <Link key={anime.id} href={`/${encodeURIComponent(anime.name)}`} passHref>
                <div className="search-result">
                  <Image
                    src={anime.image}
                    alt={anime.name}
                    width={500}
                    height={300}
                    className="search-result-image"
                  />
                  <span className="search-result-name">{anime.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;