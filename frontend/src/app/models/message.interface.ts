// Estructura base de un mensaje de contacto.
export interface Message {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}
