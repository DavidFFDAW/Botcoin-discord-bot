# Coin-Gaming Bot [Provisional name]

![logotipo](./logos/Coin-Gaming.jpg)

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

  ## En desarrollo:

  ```javascript
   Flip A Coin:
    ¿ Quien establece los coins, el juego o el jugador ?

    - Un jugador retará a otro e indicará la cantidad de coins a jugarse (o si no se juega con coins).
        - feature: ¿Posibilidad de rechazar la partida?
        - feature: Validar que ambos jugadores tienen suficientes coins para jugar.
    
    - El bot contestará de alguna manera y habrá dos reacciones (Cara y Cruz).
    - El bot esperará a las respuestas (Las respuestas solo pueden ser de los jugadores con el id que inician el juego).
    - Si los dos jugadores reaccionan se jugará y si no, se cancelará la partida y ningún jugador perdera coins
    - Internamente el juego generará un numero aleatorio entre 0 y 1 (50% de probabilidades).
    - El jugador con la reacción ganadora recibirá del perdedor la cantidad pactada de coins.
  ```
  