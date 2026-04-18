// Estructura base de un mensaje de contacto.
export interface Message {
  id?: number;
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
}
