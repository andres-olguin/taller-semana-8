export default function MascotaCard({ id, nombre, especie, edad, vacunada, onEliminar }) {
  return (
    <article className="mascota-card">
      <div className="card-top">
        <h3>{nombre}</h3>
        <button className="btn-eliminar" title="Eliminar mascota" onClick={() => onEliminar(id)}>
          ✕
        </button>
      </div>
      <p><strong>Especie:</strong> {especie}</p>
      <p><strong>Edad:</strong> {edad} años</p>
      <span className={`badge-vacuna ${vacunada ? "badge-ok" : "badge-pendiente"}`}>
        {vacunada ? "✓ Vacunación al día" : "⚠ Vacunación pendiente"}
      </span>
    </article>
  );
}
