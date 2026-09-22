import { NestFactory } from "@nestjs/core";
import { Module, Injectable, Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";

@Injectable()
export class MascotasService {
  private mascotas = [
    { id: 1, nombre: "Firulais", especie: "Perro", edad: 5, vacunada: true },
    { id: 2, nombre: "Michi", especie: "Gato", edad: 3, vacunada: false },
  ];

  obtenerTodas() {
    return this.mascotas;
  }

  crear(nuevaMascota: any) {
    const mascota = {
      id: Date.now(),
      ...nuevaMascota,
    };
    this.mascotas.push(mascota);
    return mascota;
  }

  eliminar(id: number) {
    this.mascotas = this.mascotas.filter((m) => m.id !== id);
    return { ok: true, id };
  }
}

@Controller("mascotas")
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get()
  obtenerTodas() {
    return this.mascotasService.obtenerTodas();
  }

  @Post()
  crear(@Body() nuevaMascota: any) {
    return this.mascotasService.crear(nuevaMascota);
  }

  @Delete(":id")
  eliminar(@Param("id") id: string) {
    return this.mascotasService.eliminar(Number(id));
  }
}

@Module({
  controllers: [MascotasController],
  providers: [MascotasService],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
