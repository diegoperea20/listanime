import React, { useState, useEffect } from 'react';
import './filter.css';

const Filter = ({ data, onFilter }) => {

  // Cierre y apertura del dropdown de categorías
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setShowInputs(false);
  };

  // Cierre y apertura del dropdown de valor
  const [showInputs, setShowInputs] = useState(false);
  const toggleInputs = () => {
    setShowInputs(!showInputs);
    setIsOpen(false);
  };

   // Manejador de eventos para cerrar el dropdown de categorias y valor al hacer clic en los dropdowns de selección de orden y estado
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.tagName === 'SELECT' ||
        event.target.closest('.select-container')
      ) {
        setShowInputs(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minValue, setMinValue] = useState("0");
  const [maxValue, setMaxValue] = useState("10");
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null); // Estado seleccionado (null, 'Finalizado', 'Activo')

  const [searchName, setSearchName] = useState(""); // Nuevo estado para el nombre


  const categories = [...new Set(data.flatMap(item => item.category))];
  const statuses = ['Finalizado', 'Activo'];

  useEffect(() => {
    handleFilter();
  }, [selectedCategories, minValue, maxValue, sortOrder, selectedStatus, searchName]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(c => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handleValueChange = (e, type) => {
    let value = e.target.value.replace(',', '.'); // Reemplazar coma con punto
    // Validar que el valor ingresado sea un número decimal válido con una sola decimal
    const regex = /^\d*\.?\d{0,1}$/;
    if (value === "" || (regex.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= 10)) {
      if (type === 'min') {
        setMinValue(value);
      } else {
        setMaxValue(value);
      }
    }
  };

  const handleValueBlur = (type) => {
    if (type === 'min') {
      setMinValue(minValue !== "" ? parseFloat(minValue).toFixed(1) : "0");
    } else {
      setMaxValue(maxValue !== "" ? parseFloat(maxValue).toFixed(1) : "10");
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value === 'null' ? null : e.target.value);
  };

  const handleFilter = () => {
    const filteredData = data.filter(item => {
      const categoryMatch = selectedCategories.length === 0 || item.category.some(c => selectedCategories.includes(c));
      const valueMatch = item.value >= parseFloat(minValue) && item.value <= parseFloat(maxValue);
      const statusMatch = selectedStatus === null || item.status === selectedStatus;
      const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase()); // Filtro por nombre
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

    onFilter(sortedData);
  };

  return (
    <div className='div-filters '>
      <div className={`category-container ${isOpen ? 'open' : ''}`}>
        <button className="category-button" onClick={toggleDropdown}>
          Categorías
        </button>
        <div className="category-dropdown">
          {categories.map(category => (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={`input-container ${showInputs ? 'open' : ''}`} >
      <button className="input-button" onClick={toggleInputs} style={{ cursor: 'pointer' }}>Valor⭐</button>
       
          <div className='div-value'>
            <label>
              Min⭐
              <div className="input-wrapper">
                <input
                  type="text"
                  value={minValue}
                  onChange={(e) => handleValueChange(e, 'min')}
                  onBlur={() => handleValueBlur('min')}
                  onKeyPress={(e) => {
                    if (e.key === ',') {
                      e.preventDefault();
                      e.target.value += '.';
                    }
                  }}
                />
              </div>
            </label>
            <label>
              Max⭐
              <div className="input-wrapper">
                <input
                  type="text"
                  value={maxValue}
                  onChange={(e) => handleValueChange(e, 'max')}
                  onBlur={() => handleValueBlur('max')}
                  onKeyPress={(e) => {
                    if (e.key === ',') {
                      e.preventDefault();
                      e.target.value += '.';
                    }
                  }}
                />
              </div>
            </label>
          </div>
       
      </div>

      <div className="select-container">
        <select value={sortOrder || ''} onChange={handleSortChange} >
          <option value="">Seleccionar Orden</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="value-asc">Valor⭐Ascendente</option>
          <option value="value-desc">Valor⭐Descendente</option>
        </select>
      </div>

      <div className="select-container">
        <select value={selectedStatus || 'null'} onChange={handleStatusChange}>
          <option value="null" >Seleccionar Estado</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Activo">Activo</option>
        </select>
      </div>

      {/* Nuevo div para la búsqueda por nombre */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filter;
