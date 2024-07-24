import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const showEllipsis = totalPages > 7
  const startPage = Math.max(2, currentPage - 2)
  const endPage = Math.min(totalPages - 1, currentPage + 2)

  const pages = []

  // Agregar primer número de página
  pages.push(
    <span
      key={1}
      className={`pagination-item ${currentPage === 1 ? 'active' : ''}`}
      onClick={() => onPageChange(1)}
    >
      1
    </span>
  )

  // Agregar puntos suspensivos al inicio si es necesario
  if (showEllipsis && startPage > 2) {
    pages.push(
      <span
        key="ellipsis-start"
        className="pagination-item"
      >
        ...
      </span>
    )
  }

  // Agregar números de página intermedios
  for (let i = startPage; i <= endPage; i++) {
    if (i !== 1 && i !== totalPages) {
      pages.push(
        <span
          key={i}
          className={`pagination-item ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      )
    }
  }

  // Agregar puntos suspensivos al final si es necesario
  if (showEllipsis && endPage < totalPages - 1) {
    pages.push(
      <span
        key="ellipsis-end"
        className="pagination-item"
      >
        ...
      </span>
    )
  }

  // Agregar último número de página
  if (totalPages > 1) {
    pages.push(
      <span
        key={totalPages}
        className={`pagination-item ${currentPage === totalPages ? 'active' : ''}`}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </span>
    )
  }

  return (
    <div className="pagination">
      <span
        className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        &laquo;
      </span>
      {pages}
      <span
        className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        &raquo;
      </span>
    </div>
  )
}

export default Pagination