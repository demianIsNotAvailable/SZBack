# The Survival Zombie APP - Backend

## Contenidos

1. [Introducción](#Introducción)
2. [Stack Tecnológico](#stack-tecnológico)
3. [¡Prueba la app!](#¡Prueba-la-app!)
4. [API Endpoints](#api-endpoints)
5. [Licencia](#licencia)
6. [Contacto](#contacto)

## Introducción
¡Bienvenido a **The Survival Zombie App**! El Proyecto Final del [Full Stack Developer](https://geekshubsacademy.com/producto/full-stack-developer/) bootcamp de [GeeksHubs Academy](https://geekshubsacademy.com/). <br/> <br/>
 
## Stack Tecnológico
Para la realización del proyecto se ha usado la pila MERN. Ésta es la parte correspondiente al backend:

<div>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
	<code><img height="40" src="https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png" alt="mongoose" title="mongoose"/></code>
    <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
    <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
    <code><img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></code>
</div> <br/> <br/>

## ¡Prueba la app!
Si quieres probar a jugar con la app en tu máquina o simplemente descargarla por algún otro motivo, sigue estos pasos

### Requisitos
Necesitarás instalar [Visual Studio](https://code.visualstudio.com/) o cualquier otro entorno de desarrollo similar, junto con [NodeJS y algún gestor de paquetes como npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Instalación
Puedes [descargarte manualmente el .zip](https://github.com/demianIsNotAvailable/SZBack/archive/refs/heads/master.zip), o puedes clonarlo desde el terminal git.

```bash
git clone https://github.com/demianIsNotAvailable/SZBack.git     #clonamos el repositorio
npm i   #descargamos dependencias
npm run dbseed    #poblamos la base de datos (los seeders se pueden configurar manualmente desde /core/seeders/<seeder>)
npm run start    #lanzamos la app, o
nodemon    #lanzamos la app en modo desarrollo
```
 <br/> <br/>

## API Endpoints

| Método | Endpoint      | Descripción               | Rol mínimo requerido | Parámetros de Request | Body de Request | Response devuelve: |
|--------|---------------|---------------------------|---------------|-------------------|--------------|--------------|
| POST   | /users        | Registra un usuario nuevo        | -             | -                 | {email, password} | { User }        |
| POST   | /users/login  | Login de usuario       | -             | -                 | {email, password} | Token        |
| GET    | /users/profile| Acceso al perfil de usuario | GUEST  | -                 | -            | { User }         |
| GET    | /users/users  | Lista de usuarios (filtro opcional)            | USER          | query.name (.page .limit para paginar)                 | -            | [ Lista de { Users }]|
| GET    | /users/users/:id | Lista de usuarios por rol    | ADMIN         | params.id                | -            | [ Lista de { Users }]|
| GET    | /users/:id    | Devuelve un usuario por ID         | USER          | params.id                | -            | { User }         |
| PUT    | /users/profile| Actualiza perfil propio| GUEST | -                 | {name, lastname, email...} | { User } actualizado         |
| PUT    | /users/:id    | Actualiza cualquier usuario       | SUPERADMIN    | id                | {name, lastname, email...} | { User } actualizado       |
| DELETE | /users/profile| Borrado lógico del perfil| GUEST | -                 | -            | { User }        |
| DELETE | /users/:id    | Borrado lógico de cualquier usuario      | ADMIN         | params.id                | -            | { User }        |
| POST   | /editions     | Registra una nueva edición     | ADMIN         | -                 | {type, location, date...}| { Edition }    |
| GET    | /editions     | Lista de ediciones (filtro opcional)         | -             | query.start .end .location, token                 | -            | [Lista de { Editions }]|
| GET    | /editions/:id | Devuelve una lista por ID     | -             | params.id                | -            | { Edition }      |
| PUT    | /editions/:id | Actualiza una edición por ID   | ADMIN         | params.id                | {type, location, date...}| { Edition } actualizada    |
| POST   | /editions/:id | Usuario se apunta o desapunta a edición     | GUEST    | params.id                | -            | { ids } |
 <br/>

## Licencia
Pendiente 
 <br/>

## Contacto
Pendiente
