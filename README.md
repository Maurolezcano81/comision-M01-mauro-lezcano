# Descripción

Este repositorio almacena los archivos del proyecto para la finalizacion del curso de Epica "Lenguajes de Programacion II, Tramo III".

> **_NOTA:_**  SE HICIERON LAS CORRECCIONES MENCIONADAS. 14/12/2023

> **_Segunda nota:_** En el historial de commits no quedo asentado todo el proceso de cambio realizado mas que nada de estilos, debido a que lo empece a desarrollar en un repositorio nuevo, despues de la primera entrega ya que no queria interrumpir en las correciones modificando el respositorio principal y luego hice un push de ese repositorio a el repositorio actual y no consegui traer el historial de commits.

## Instalación

El proyecto se divide en 2 carpetas, sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:


1. Clona este repositorio en tu máquina local usando el siguiente comando:
   ```bash
   git clone https://github.com/Maurolezcano81/comision-m01-mauro-lezcano
   Al clonar el repositorio, veremos las carpetas "backend y frontend":
   cd comision-m01-mauro-lezcano
2. En una terminal navegar hacia la carpeta backend
    ```bash 
    cd backend
3. Crear y configurar el archivo de entorno .env:
    ```bash 
    touch .env;
    SV_PORT = 3000,
    MONGO_URI = [URL DE LA CONEXION],
    JWT_SECRET = [palabra_secreta]
4. Instala las dependencias:
    ```bash
    npm install
5. Ejecuta la aplicacion:
    ```bash
    node main.js
6. **Para iniciar el frontend** abrir una nueva terminal y navegar a la carpeta de frontend
    ```bash
    cd frontend
8. Crear y configurar el archivo de entorno .env:
    ```bash 
    touch .env;
    VITE_SV_URL = 'http://127.0.0.1:3000/api'

> _IMPORTANTE:_  En la variable de entorno se debe colocar la direccion del servidor creado anteriormente.
7. Instalar las dependencias
    ```bash
    npm install
8. Ejecutar el frontend
    ```bash
    npm run dev

Muchas gracias por leer.
