🐾 Taller Semana 8 — Ecosistema Full-Stack Multi-Framework

Solución integral con backend centralizado en NestJS, consumido simultáneamente por clientes desacoplados en React y Angular, junto con implementaciones interactivas de Tic-Tac-Toe.

🏛 Arquitectura del Proyecto
                  ┌───────────────────────┐
                  │     vetconnect-api    │
                  │   (NestJS en :3000)   │
                  └───────────┬───────────┘
                              │ REST API (JSON)
             ┌────────────────┴────────────────┐
             ▼                                 ▼
  ┌─────────────────────┐           ┌─────────────────────┐
  │  vetconnect-react   │           │  vetconnect-angular │
  │   (React + Vite)    │           │ (Angular + Signals) │
  └─────────────────────┘           └─────────────────────┘

📂 Estructura del Repositorio
Directorio	Tecnología	Descripción
vetconnect-api/	NestJS + TypeScript	Servidor REST con soporte GET, POST, DELETE y PUT para reemplazo de mascotas.
vetconnect-react/	React + Vite	Cliente frontend reactivo para gestión y edición de mascotas.
vetconnect-angular/	Angular + Signals	Cliente frontend con componentes standalone y consumo HTTP reactivo.
tic-tac-toe-react/	React	Juego Tic-Tac-Toe con control de turnos e historial.
tic-tac-toe-angular/	Angular	Implementación de Tic-Tac-Toe con reactividad basada en Signals.
🔌 Endpoints de la API (NestJS)

Base URL: http://localhost:3000/mascotas

Método	Endpoint	Descripción	Body Requerido
GET	/mascotas	Obtiene todas las mascotas registradas	Ninguno
POST	/mascotas	Registra una nueva mascota	{ nombre, especie, edad, vacunada }
PUT	/mascotas/:id	Reemplaza/actualiza los datos de una mascota	{ nombre, especie, edad, vacunada }
DELETE	/mascotas/:id	Elimina una mascota por ID	Ninguno
🚀 Puesta en Marcha
1. Backend (vetconnect-api)
cd vetconnect-api
npm install
npm run start:dev


Servidor disponible en http://localhost:3000 con CORS habilitado.

2. Clientes VetConnect

Angular:

cd vetconnect-angular
npx ng serve --port 4300


React:

cd vetconnect-react
npm run dev

📄 Licencia

Distribuido bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
