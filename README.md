# discord-Bot [unnamed]

## Descripción:

Este bot permitirá almacenar para cada usuario en el servidor actual una cantidad pactada de coins.
Además este bot incluirá una serie de juegos y variados donde se permitirá poner en juego una cantidad de dichas monedas entre otras cosas.
:wrench: Este bot está actualmente en construcción :hammer:

## Instalación:

Antes de empezar deberás ejecutar: ```npm i``` en la linea de comandos.

## Funcionamiento:

Para iniciar el bot de forma que pueda escuchar todos los cambios y actualizarse automaticamente utiliza:´

```javascript
npm run start:dev 
```

Para iniciarlo de forma indefinida y definitiva sin necesidad de actualizarse sobre la marcha utiliza: 

```javascript 
npm run start:prod
```

## Licencia:

Este proyecto utiliza la licencia MIT:
  *  **No existe garantía:** El producto es entregado "tal cual" (como se dice en la licencia) sin garantía de ningún tipo ni explícita ni implícita sobre el producto.
  *  **Responsabilidad:** En ningún caso los autores o titulares de los derechos de autor serán los responsables ante cualquier reclamo, daños u otras responsabilidades que surja de fuera de o en relación con el software o el uso del mismo.

## Dependencias:

Las principales dependencias que utiliza este proyecto son:

```javascript
  "dependencies": {
    "fs": "0.0.1-security"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
```

  *  **[fs (FileSystem):](https://nodejs.org/api/fs.html)** Esta dependencia se requiere para poder escribir y leer archivos utilizando nodeJS.

  *  **[nodemon:](https://www.npmjs.com/package/nodemon)** Esta dependencia se utiliza en este proyecto para iniciar el bot en modo desarrollador y no se utiliza en la aplicación normal.