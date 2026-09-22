import { Component, inject, signal, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  vacunada: boolean;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/mascotas";

  mascotas = signal<Mascota[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string>("");

  // Estado del formulario y edición
  mascotaEditando = signal<Mascota | null>(null);
  nombre = "";
  especie = "Perro";
  edad: number | null = null;

  ngOnInit() {
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.cargando.set(true);
    this.error.set("");
    this.http.get<Mascota[]>(this.apiUrl).subscribe({
      next: (datos) => {
        this.mascotas.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set("No fue posible cargar las mascotas desde el servidor NestJS.");
        this.cargando.set(false);
      }
    });
  }

  guardarMascota() {
    if (!this.nombre.trim() || this.edad === null) return;

    const datos = {
      nombre: this.nombre.trim(),
      especie: this.especie,
      edad: Number(this.edad),
      vacunada: this.mascotaEditando() ? this.mascotaEditando()!.vacunada : false
    };

    const editando = this.mascotaEditando();
    if (editando) {
      this.http.put<Mascota>(`${this.apiUrl}/${editando.id}`, datos).subscribe({
        next: (actualizada) => {
          this.mascotas.set(this.mascotas().map(m => m.id === actualizada.id ? actualizada : m));
          this.cancelarEdicion();
        },
        error: () => {
          this.error.set("Error al actualizar la mascota.");
        }
      });
    } else {
      this.http.post<Mascota>(this.apiUrl, datos).subscribe({
        next: (creada) => {
          this.mascotas.set([...this.mascotas(), creada]);
          this.limpiarFormulario();
        },
        error: () => {
          this.error.set("Error al registrar la mascota en NestJS.");
        }
      });
    }
  }

  prepararEdicion(mascota: Mascota) {
    this.mascotaEditando.set(mascota);
    this.nombre = mascota.nombre;
    this.especie = mascota.especie;
    this.edad = mascota.edad;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  cancelarEdicion() {
    this.mascotaEditando.set(null);
    this.limpiarFormulario();
  }

  private limpiarFormulario() {
    this.nombre = "";
    this.especie = "Perro";
    this.edad = null;
  }

  eliminarMascota(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.mascotas.set(this.mascotas().filter(m => m.id !== id));
        if (this.mascotaEditando()?.id === id) {
          this.cancelarEdicion();
        }
      },
      error: () => {
        this.error.set("Error al eliminar la mascota.");
      }
    });
  }
}
