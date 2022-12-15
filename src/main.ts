import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //ante sde poner a la escucha el servicio agregamos los use
  app.useGlobalPipes(
    new ValidationPipe({
      //cualquier cosa que no este en el dto se descarta en la peticion
      whitelist: true,
      // Lanzar error si existen datos prohibidos pero detiene la accion del post
      forbidNonWhitelisted: true,
      //Desabilitar mensajes de error (producción)
      disableErrorMessages: true,
    }),
  );
  await app.listen(3015);
  console.log('servidor corriendo por el puerto 3015');
}
bootstrap();
