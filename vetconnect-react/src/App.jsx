import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/mascotas";

export default function App() {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("Perro");
  const [edad, setEdad] = useState("");
  
  // Estado para saber si estamos editando
  const [mascotaEditando, setMascotaEditando] = useState(null);

  const cargarMascotas = async () => {
    setCargando(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error en red");
      const datos = await res.json();
      setMascotas(datos);
    } catch (err) {
      setError("No fue posible cargar las mascotas desde el servidor NestJS.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || edad === "") return;

    const datosMascota = {
      nombre: nombre.trim(),
      especie,
      edad: Number(edad),
      vacunada: mascotaEditando ? mascotaEditando.vacunada : false,
    };

    try {
      if (mascotaEditando) {
        // Petición PUT para actualizar
        const res = await fetch(`${API_URL}/${mascotaEditando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosMascota),
        });
        const actualizada = await res.json();
        setMascotas(mascotas.map(m => m.id === actualizada.id ? actualizada : m));
        setMascotaEditando(null);
      } else {
        // Petición POST para crear
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datosMascota),
        });
        const creada = await res.json();
        setMascotas([...mascotas, creada]);
      }
      setNombre("");
      setEspecie("Perro");
      setEdad("");
    } catch (err) {
      setError("Error al procesar la mascota.");
    }
  };

  const prepararEdicion = (mascota) => {
    setMascotaEditando(mascota);
    setNombre(mascota.nombre);
    setEspecie(mascota.especie);
    setEdad(mascota.edad);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setMascotaEditando(null);
    setNombre("");
    setEspecie("Perro");
    setEdad("");
  };

  const eliminarMascota = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setMascotas(mascotas.filter((m) => m.id !== id));
      if (mascotaEditando?.id === id) cancelarEdicion();
    } catch (err) {
      setError("Error al eliminar la mascota.");
    }
  };

  return (
    <>
      <header className="header">
        <div className="contenedor">
          <h1>VetConnect</h1>
          <p>Gestión simple de mascotas (React Client)</p>
        </div>
      </header>

      <main className="contenedor">
        <form className="formulario" onSubmit={handleSubmit}>
          <h2>{mascotaEditando ? `Editar mascota: ${mascotaEditando.nombre}` : "Registrar mascota"}</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>
          <input
            type="number"
            min="0"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ flex: 1 }}>
              {mascotaEditando ? "Guardar Cambios" : "Registrar"}
            </button>
            {mascotaEditando && (
              <button type="button" onClick={cancelarEdicion} style={{ flex: 1, backgroundColor: "#64748b" }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="header-mascotas">
          <h2>Mascotas Registradas</h2>
          <button className="btn-recargar" onClick={cargarMascotas} disabled={cargando}>
            {cargando ? "Cargando..." : "↻ Recargar mascotas"}
          </button>
        </div>

        {error && <p className="mensaje-error">{error}</p>}
        {!cargando && !error && mascotas.length === 0 && <p>No hay mascotas registradas.</p>}

        <section className="lista-mascotas">
          {mascotas.map((mascota) => (
            <article key={mascota.id} className="mascota-card">
              <div className="card-top">
                <h3>{mascota.nombre}</h3>
                <div>
                  <button className="btn-editar" title="Editar mascota" onClick={() => prepararEdicion(mascota)} style={{ marginRight: "8px", border: "none", background: "none", cursor: "pointer", fontSize: "1.2rem" }}>
                    ✏️
                  </button>
                  <button className="btn-eliminar" title="Eliminar mascota" onClick={() => eliminarMascota(mascota.id)}>
                    ✕
                  </button>
                </div>
              </div>
              <p><strong>Especie:</strong> {mascota.especie}</p>
              <p><strong>Edad:</strong> {mascota.edad} años</p>
              <span className={`badge-vacuna ${mascota.vacunada ? "badge-ok" : "badge-pendiente"}`}>
                {mascota.vacunada ? "✓ Vacunación al día" : "⚠ Vacunación pendiente"}
              </span>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
