# Backend BookIA Store

API REST para una tienda de libros construida con Node.js, Express, MySQL y CORS. Este backend queda listo para ser consumido despues desde Angular, React, Vue o cualquier cliente HTTP.

## Estructura recomendada

```text
backend/
|-- config/
|   |-- db.js
|-- controllers/
|   |-- books.controller.js
|   |-- messages.controller.js
|-- middlewares/
|   |-- errorHandler.js
|   |-- notFound.js
|   |-- validation.js
|-- routes/
|   |-- books.routes.js
|   |-- index.js
|   |-- messages.routes.js
|-- sql/
|   |-- schema.sql
|-- .env.example
|-- package.json
|-- server.js
```

## Instalacion y ejecucion

1. Entra a `backend/`.
2. Instala dependencias con `npm install`.
3. Crea un archivo `.env` a partir de `.env.example`.
4. Ejecuta el script `sql/schema.sql` en MySQL.
5. Inicia el servidor con `npm run dev` o `npm start`.

## Variables de entorno

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bookia_store
```

## Endpoints disponibles

### `GET /api/books`

Respuesta:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Dummy book",
      "author": "John Doe",
      "genre": "Fantasy",
      "price": 29.99,
      "stock": 14,
      "cover": "image_file.jpg",
      "description": "This is a dummy description",
      "available": true
    }
  ]
}
```

### `GET /api/books/:id`

Respuesta exitosa:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Dummy book",
    "author": "John Doe",
    "genre": "Fantasy",
    "price": 29.99,
    "stock": 14,
    "cover": "image_file.jpg",
    "description": "This is a dummy description",
    "available": true
  }
}
```

Respuesta si no existe:

```json
{
  "success": false,
  "message": "Libro no encontrado."
}
```

### `POST /api/books`

Request:

```json
{
  "title": "Dummy book",
  "author": "John Doe",
  "genre": "Fantasy",
  "price": 29.99,
  "stock": 14,
  "cover": "image_file.jpg",
  "description": "This is a dummy description"
}
```

Response:

```json
{
  "success": true,
  "message": "Libro creado correctamente.",
  "data": {
    "id": 1,
    "title": "Dummy book",
    "author": "John Doe",
    "genre": "Fantasy",
    "price": 29.99,
    "stock": 14,
    "cover": "image_file.jpg",
    "description": "This is a dummy description",
    "available": true
  }
}
```

### `POST /api/messages`

Request:

```json
{
  "name": "Jane Doe",
  "email": "janedoe@test.com",
  "subject": "Dummy Subject",
  "message": "For testing purposes only"
}
```

Response:

```json
{
  "success": true,
  "message": "Mensaje guardado correctamente.",
  "data": {
    "id": 1001,
    "name": "Jane Doe",
    "email": "janedoe@test.com",
    "subject": "Dummy Subject",
    "message": "For testing purposes only"
  }
}
```

## Validaciones implementadas

- Campos obligatorios no vacios.
- `price` debe ser mayor que `0`.
- `stock` debe ser un entero mayor o igual que `0`.
- `email` debe tener un formato valido.
- `message` no puede estar vacio.

Ejemplo de error de validacion:

```json
{
  "success": false,
  "message": "Los datos enviados no son validos.",
  "errors": [
    {
      "field": "email",
      "message": "El email debe tener un formato valido."
    }
  ]
}
```

## Sobre el campo `available`

`available` no se inserta manualmente. Se calcula automaticamente a partir del `stock` dentro de MySQL mediante una columna generada:

- Si `stock > 0`, `available` devuelve `true`.
- Si `stock = 0`, `available` devuelve `false`.

Esto evita inconsistencias entre inventario y disponibilidad.
