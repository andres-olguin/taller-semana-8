import { useEffect, useState } from "react";
import Header from "./components/Header";
import MascotaCard from "./components/MascotaCard";
import FormMascota from "./components/FormMascota";
import "./App.css";

export default function App() {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarMascotas() {
    try {
      setCargando(true);
      setError("");
      const respuesta = await fetch("http://localhost:3000/mascotas");
      if (!respuesta.ok) {
        throw new Error("No fue posible cargar las mascotas");
      }
      const datos = await respuesta.json();
      setMascotas(datos);
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarMascotas();
  }, []);

  async function registrarMascota(nuevaMascota) {
    try {
      setError("");
      const respuesta = await fetch("http://localhost:3000/mascotas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaMascota),
      });
      if (!respuesta.ok) {
        throw new Error("No fue posible registrar la mascota");
      }
      const mascotaCreada = await respuesta.json();
      setMascotas([...mascotas, mascotaCreada]);
    } catch (error) {
      setError(error.message);
    }
  }

  async function eliminarMascota(id) {
    try {
      setError("");
      const respuesta = await fetch(`http://localhost:3000/mascotas/${id}`, {
        method: "DELETE",
      });
      if (!respuesta.ok) {
        throw new Error("No fue posible eliminar la mascota");
      }
      setMascotas(mascotas.filter((m) => m.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <Header />
      <main className="contenedor">
        <FormMascota onRegistrar={registrarMascota} />

        <div className="header-mascotas">
          <h2>Mascotas Registradas</h2>
          <button className="btn-recargar" onClick={cargarMascotas} disabled={cargando}>
            {cargando ? "Cargando..." : "↻ Recargar mascotas"}
          </button>
        </div>

        {cargando && <p>Cargando mascotas...</p>}
        {error && <p className="mensaje-error">{error}</p>}
        {!cargando && !error && mascotas.length === 0 && (
          <p>No hay mascotas registradas.</p>
        )}

        <section className="lista-mascotas">
          {mascotas.map((mascota) => (
            <MascotaCard
              key={mascota.id}
              id={mascota.id}
              nombre={mascota.nombre}
              especie={mascota.especie}
              edad={mascota.edad}
              vacunada={mascota.vacunada}
              onEliminar={eliminarMascota}
            />
          ))}
        </section>
      </main>
    </>
  );
}
