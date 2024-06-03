import { NextResponse } from "next/server";
import db from '@/db/db';

export async function GET(request, { params }) {
  try {
    // Obtener el ID del parámetro de la solicitud
    const { id } = params;
    
    // Buscar el elemento correspondiente en la base de datos por su ID
    const item = db.find(item => item.id === parseInt(id));

    if (item) {
      // Devolver el elemento encontrado como respuesta en formato JSON
      return NextResponse.json(item);
    } else {
      // Si el elemento no se encuentra, devolver un mensaje de error
      return NextResponse.error("El elemento no fue encontrado", { status: 404 });
    }
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante el proceso
    console.error("Error al obtener el elemento de la base de datos:", error);
    return NextResponse.error("Error al obtener el elemento de la base de datos");
  }
}
