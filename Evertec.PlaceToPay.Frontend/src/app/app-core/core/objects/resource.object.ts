export interface Resource {
  id: number;
  tipoRecurso: string;
  nombre: string;
  orden: number;
  url: string;
  auxiliar: string;
  icono: boolean;
  codigo: string;
  idMenuPadre: number;
  permiso: string[];
}
