import { NestFactory } from "@nestjs/core";
import { Module, Controller, Get, Post, Delete, Put, Body, Param, NotFoundException } from "@nestjs/common";

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  vacunada: boolean;
}

@Controller("mascotas")
export class AppController {
  private mascotas: Mascota[] = [
    { id: 1, nombre: "Firulais", especie: "Perro", edad: 5, vacunada: true },
    { id: 2, nombre: "Michi", especie: "Gato", edad: 3, vacunada: false }
  ];
  private nextId = 3;

  @Get()
  obtenerMascotas(): Mascota[] {
    return this.mascotas;
  }

  @Post()
  crearMascota(@Body() body: Omit<Mascota, "id">): Mascota {
    const nuevaMascota = { id: this.nextId++, ...body };
    this.mascotas.push(nuevaMascota);
    return nuevaMascota;
  }

  @Delete(":id")
  eliminarMascota(@Param("id") id: string): { mensaje: string } {
    const existe = this.mascotas.some((m) => m.id === Number(id));
    if (!existe) {
      throw new NotFoundException("Mascota no encontrada");
    }
    this.mascotas = this.mascotas.filter((m) => m.id !== Number(id));
    return { mensaje: "Mascota eliminada" };
  }

  @Put(":id")
  actualizarMascota(@Param("id") id: string, @Body() body: Omit<Mascota, "id">): Mascota {
    const index = this.mascotas.findIndex((m) => m.id === Number(id));
    if (index === -1) {
      throw new NotFoundException("Mascota no encontrada");
    }
    this.mascotas[index] = { id: Number(id), ...body };
    return this.mascotas[index];
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "*",
  });
  await app.listen(3000);
}
bootstrap();