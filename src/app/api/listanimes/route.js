import { NextResponse } from "next/server";
import db from '@/db/db'; 

export async function GET() {
  try {
    // Devuelve los datos de la base de datos como JSON
    return NextResponse.json(db);
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la recuperación de datos
    console.error("Error al obtener datos de la base de datos:", error);
    return NextResponse.error("Error al obtener datos de la base de datos");
  }
}
