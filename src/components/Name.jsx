'use client';
import React from 'react';
import PropTypes from 'prop-types';
import './name.css';

function Name({ anime }) {
  return (
    <div className="name-container">
      <div className="name-box">
        <div className="name-image-container">
          <img src={anime.image} alt={anime.name} className="name-image" />
          <div className={anime.status === 'Finalizado' ? 'name-status-finish' : 'name-status'}>{anime.status}</div>
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

Name.propTypes = {
  anime: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
};

export default Name;