
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Clonacion del proyecto

Abre la carpeta donde desea clonar el proyecto y ejecuta este comando en un cmd

```bash
$ git clone https://github.com/migueldev2006/Backendnestjs.git
```
luego de clonarlo le aparecera una carpeta "Backendnestjs" abrala con un click o en la terminal con cd + tabulador

## Crear contenedor Docker

Una vez clonado el proyecto asegurese de tener Docker instalador y de crear un contenedor de Docker mediante el comando en una consola powershell

```bash
$ docker compose up --build -d
```

Luego de que haya creado el contenedor es necesario llenar las variables de entorno las cuales seran utilizadas en el proyecto, tales como las credenciales de la base de datos 

## Instalacion de dependencias 

Luego de esto pasamos a ejecutar este comando para que se descarguen todas las dependencias necesarias 

```bash
$ npm install
```

Despues pasamos a poblar la base de datos por medio de un seeder con el siguiente comando 

```bash
$ npx nestjs-command seed:database
```

## Compile and run the proyecto

```bash
$ npm run start:dev
```






