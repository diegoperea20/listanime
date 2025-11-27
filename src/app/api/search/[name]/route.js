import db from '@/db/db';

export async function GET(request, { params }) {
  try {
    const { name } = params;

    // Validar que el parámetro name no esté vacío
    if (!name || name.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'El parámetro name es requerido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Convertir a minúsculas para búsqueda case-insensitive
    const searchTerm = name.toLowerCase().trim();

    // Filtrar animes que contengan el término de búsqueda en el nombre
    const results = db.filter(anime =>
      anime.name.toLowerCase().includes(searchTerm)
    );

    // Retornar resultados
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}