const license = `MIT License

Copyright (c) 2026 Andres Olguin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const readme = `# 🐾 Taller Semana 8 — Ecosistema Full-Stack Multi-Framework

Solución integral con backend centralizado en **NestJS** consumido simultáneamente por clientes desacoplados en **React** y **Angular**, junto con implementaciones interactivas de **Tic-Tac-Toe**.

---

## 🏛 Arquitectura del Proyecto

\`\`\`text
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
\`\`\`

---

## 📂 Estructura del Repositorio

| Directorio | Tecnología | Descripción |
| :--- | :--- | :--- |
| \`vetconnect-api/\` | **NestJS + TypeScript** | Servidor REST con soporte GET, POST, DELETE y PUT para reemplazo de mascotas. |
| \`vetconnect-react/\` | **React + Vite** | Cliente frontend reactivo para gestión y edición de mascotas. |
| \`vetconnect-angular/\` | **Angular + Signals** | Cliente frontend con componentes standalone y consumo HTTP reactivo. |
| \`tic-tac-toe-react/\` | **React** | Juego Tic-Tac-Toe con control de turnos e historial. |
| \`tic-tac-toe-angular/\` | **Angular** | Implementación de Tic-Tac-Toe con reactividad basada en Signals. |

---

## 🔌 Endpoints de la API (NestJS)

Base URL: \`http://localhost:3000/mascotas\`

| Método | Endpoint | Descripción | Body Requerido |
| :---: | :--- | :--- | :---: |
| \`GET\` | \`/mascotas\` | Obtiene todas las mascotas registradas | Ninguno |
| \`POST\` | \`/mascotas\` | Registra una nueva mascota | \`{ nombre, especie, edad, vacunada }\` |
| \`PUT\` | \`/mascotas/:id\` | Reemplaza/actualiza los datos de una mascota | \`{ nombre, especie, edad, vacunada }\` |
| \`DELETE\` | \`/mascotas/:id\` | Elimina una mascota por ID | Ninguno |

---

## 🚀 Puesta en Marcha

### 1. Backend (\`vetconnect-api\`)
\`\`\`bash
cd vetconnect-api
npm install
npm run start:dev
\`\`\`

### 2. Clientes VetConnect
- **Angular:**
  \`\`\`bash
  cd vetconnect-angular
  npx ng serve --port 4300
  \`\`\`
- **React:**
  \`\`\`bash
  cd vetconnect-react
  npm run dev
  \`\`\`

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
`;

fs.writeFileSync("LICENSE", license, "utf8");
fs.writeFileSync("README.md", readme, "utf8");
console.log("Archivos creados con éxito.");
'
