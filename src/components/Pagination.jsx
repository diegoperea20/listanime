const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={`pagination-item ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
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
    );
  };
  
  export default Pagination;


/*  PAGINACION CON PUNTOS ...  */
/* PAGINATION WITH POINTS */

 /*  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const showEllipsis = totalPages > 4;
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 2);
  
    const pages = [];
  
    // Agregar primer número de página
    pages.push(
      <span
        key={1}
        className={`pagination-item ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => onPageChange(1)}
      >
        1
      </span>
    );
  
    // Agregar segundo número de página
    if (startPage > 2) {
      pages.push(
        <span
          key={2}
          className={`pagination-item ${currentPage === 2 ? 'active' : ''}`}
          onClick={() => onPageChange(2)}
        >
          2
        </span>
      );
    }
  
    // Agregar puntos suspensivos si es necesario
    if (showEllipsis && startPage > 3) {
      pages.push(
        <span
          key="ellipsis-start"
          className="pagination-item"
          onClick={() => onPageChange(startPage - 1)}
        >
          ...
        </span>
      );
    }
  
    // Agregar números de página intermedios
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          className={`pagination-item ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }
  
    // Agregar puntos suspensivos si es necesario
    if (showEllipsis && endPage < totalPages - 1) {
      pages.push(
        <span
          key="ellipsis-end"
          className="pagination-item"
          onClick={() => onPageChange(endPage + 1)}
        >
          ...
        </span>
      );
    }
  
    // Agregar último número de página
    pages.push(
      <span
        key={totalPages}
        className={`pagination-item ${currentPage === totalPages ? 'active' : ''}`}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </span>
    );
  
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
    );
  };
  
  export default Pagination; */