export interface MangaData {
  ultimoVolumen?: number;
  ultimoCapitulo?: number;
  contentRating?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
  titulo?: string;
  genero?: string;
  estado?: string;
}
export interface personal {
  artista?: string;
  autor?: string;
  imagen?: string;
}

export class TrueManga {
  private id?: number;

  private Datos: MangaData;

  private Personal: personal;

  private Tags?: Array<Object>;

  private tipo?: string;

  private apiID: string;

  // eslint-disable-next-line max-len
  constructor(
    Datos: MangaData,
    Personal: personal,
    tags: Array<Object>,
    tipo: string,
    ApiID: string,
    id?: number
  ) {
    this.id = id;
    this.Datos = Datos;
    this.Personal = Personal;
    this.Tags = tags;
    this.tipo = tipo;
    this.apiID = ApiID;
  }

  get tags() {
    return this.Tags;
  }
}
