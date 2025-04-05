
export interface Videojuegos {
  imagen: string;
  titulo: string;
  precio: number;
  plataformas: string[];
}

export interface ApiResponse {
  videojuegos: Videojuegos[];
}
