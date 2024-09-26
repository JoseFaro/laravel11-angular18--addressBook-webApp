# Capi Contacts App

Aplicación de listado de contactos para agregar, editar, eliminar y ver, permite filtrado a través de un campo de búsqueda.

El proyecto está hecho en **Laravel 11** para el backend y **Angular 18** para el frontend.

## Instrucciones para levantar Laravel

pasos:

1.- Desde la carpeta raíz, instalar librerías de composer

-   run: **composer install**

2.- Crear base de datos y actualizar archivo

-   ajustar datos en archivo .env
-   copiar del archivo **.env.example** y ajustar

3.- Correr migraciones y seeds

-   run: **php artisan migrate**
-   run: **php artisan db:seed**

4.- Iniciar servidor de laravel

-   run: **php artisan serve**

## Instrucciones para levantar Angular

pasos:

1.- Instalar dependencias

-   ir a la carpeta **resources/angular**
-   run: **npm install**

2.- Iniciar aplicación en Angular

-   run: **ng serve**
-   abrir pagina: http://localhost:4200
