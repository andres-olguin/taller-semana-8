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

  // Formulario reactivo
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
      error: (err) => {
        this.error.set("No fue posible cargar las mascotas desde el servidor NestJS.");
        this.cargando.set(false);
      }
    });
  }

  registrarMascota() {
    if (!this.nombre.trim() || this.edad === null) return;

    const nuevaMascota = {
      nombre: this.nombre.trim(),
      especie: this.especie,
      edad: Number(this.edad),
      vacunada: false
    };

    this.http.post<Mascota>(this.apiUrl, nuevaMascota).subscribe({
      next: (creada) => {
        this.mascotas.set([...this.mascotas(), creada]);
        this.nombre = "";
        this.especie = "Perro";
        this.edad = null;
      },
      error: () => {
        this.error.set("Error al registrar la mascota en NestJS.");
      }
    });
  }

  eliminarMascota(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.mascotas.set(this.mascotas().filter(m => m.id !== id));
      },
      error: () => {
        this.error.set("Error al eliminar la mascota.");
      }
    });
  }
}
