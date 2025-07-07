## Clonacion del proyecto

Abre la carpeta donde desea clonar el proyecto y ejecuta este comando en un cmd

```bash
$ git clone https://github.com/migueldev2006/Backendnestjs.git
```
luego de clonarlo le aparecera una carpeta "Backendnestjs" abrala con un click o en la terminal con cd + tabulador

## Crear contenedor Docker

Como siguiente punto es necesario llenar las variables de entorno las cuales seran utilizadas en el proyecto, tales como las credenciales de la base de datos, nota viene un .env.example de ejemplo pero debe crear su propio .env

Una vez clonado el proyecto asegurese de tener Docker Desktop instalado y corriendo para luego, crear un contenedor de Docker mediante el comando en una consola powershell

```bash
$ docker compose up --build -d
```

## Instalacion de dependencias 

Luego de esto pasamos a ejecutar este comando para que se descarguen todas las dependencias necesarias 

```bash
$ npm install
```

Despues pasamos a poblar la base de datos por medio de un seeder con el siguiente comando 

```bash
$ npx nestjs-command seed:database
```

## Compile y corra el proyecto

```bash
$ npm run start:dev
```
