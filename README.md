# Laboratoro RIA: Frontend de una web de películas

En este taller se realizó un frontend con el uso de APIs públicas disponibles para investigar acerca del uso de React en el desarrollo frontend. La web cuenta con el uso de distintos endpoint de la API para presentar un listado de películas, realizar búsquedas y ver detalles de las películas.

## Índice
1. [Grupo](#grupo)
1. [Tecnologías usadas](#tecnologías-usadas)
1. [Utilización](#utilización)
	1. [Uso local](#uso-local)
	1. [Despliegue en Docker](#despliegue-en-docker)
1. [Historias de usuario](#historias-de-usuario)
1. [API REST](#api-rest)
	1. [APIs públicas tentativas](#apis-públicas-tentativas)
	1. [API REST a utilizar](#api-rest-a-utilizar)
		1. [/discover/movie](#discovermovie)
		1. [/search/movie](#searchmovie)
		1. [/movie/`id`](#movieid)
		1. [/configuration/countries](#configurationcountries)
1. [Mockups](#mockups)
	1. [Pantalla principal](#pantalla-principal)
	1. [Ver datos de una película](#ver-datos-de-una-película)
1. [Mapa de navegación y usabilidad](#mapa-de-navegación-y-usabilidad)
	1. [Decisiones de usabilidad](#decisiones-de-usabilidad)

## Grupo
- Bruno Collazo
- Enzo Gularte
- Federico Acosta
- Santiago Paván

## Tecnologías usadas

- [React v18.2.0](https://es.react.dev)
- [React Router v6](https://reactrouter.com)
- [Material UI v5](https://mui.com/material-ui/)
- [Vite 4](https://vitejs.dev)
- [Node.js v21.7.3](https://nodejs.org)
- [NPM v10.5.2](https://www.npmjs.com)
- [API pública (The Movie Database)](https://developer.themoviedb.org)
- [Docker](https://docs.docker.com/get-docker/)

## Utilización

### Uso local
1. Instalar Node.js y NPM desde su [página oficial](nodejs.org).
2. Descargar la app desde este mismo repositorio.
3. Abrir la carpeta del proyecto con VSCode o desde la consola de comandos del SO.
4. Utilizar el siguiente comando para instalar las librerías necesarias:
  ```
   npm install
  ```

5. Levantar el programa con
  ```
   npm run dev
  ``` 

### Despliegue en Docker
Para desplegar en Docker, tenemos que asegurarnos de tener [**Docker**](https://docs.docker.com/get-docker/) (ya sea *Engine* y *CLI*, o simplemente *Desktop*) con [**Docker Compose**](https://docs.docker.com/compose/install/) instalados y andando.<br>
Una vez instalado, únicamente hace falta ejecutar el siguiente comando en la terminal:<br>

```
docker-compose up -d
```
Este comando se encarga de ejecutar los comandos de [**NPM**](https://www.npmjs.com) contenidos en el [**Dockerfile**](Dockerfile):
- **`npm install`:** Instala las dependencias.
- **`npm run build`:** Compila el código.

Finalmente, copia el código en un servidor web [**nginx**](https://nginx.org/en/), ejecutando en la línea de comando de la VM:
- **`nginx -g daemon off`:** Levanta el servidor con la aplicación.

La aplicación se expone en el puerto `8001`, pudiendo acceder desde [localhost:8001](http://localhost:8001) desde el dispositivo en el que estamos corriendo el Docker.

Otra táctica hubiese sido hacer uso del comando `preview` de Vite, agregando la siguiente línea al final del Dockerfile en lugar del *staging* de nginx:
```
CMD [ "npm", "run", "preview" ]
```
Es importante notar que el *preview* que ofrece Vite es una forma de que los desarrolladores puedan probar localmente el *build*, pero **NO** es un servidor de producción.

## Historias de usuario

1. **Ver peliculas disponibles**<br>
Como usuario de la web, quiero ver la totalidad de películas disponibles en la web para poder elegir alguna de ellas y ver más información.<br>
**Criterio de aceptación:**<br>
Dado que el usuario se encuentra en la pantalla principal cuando este haga clic en el botón “ver todas las películas” entonces se le mostrará un listado de todas las películas que hay, separadas de 20 en 20.

2. **Ver detalles de una película**<br>
Como usuario de la web, quiero poder ver la información adicional de una película (Portada, Título, lanzamiento, actores, géneros, sinopsis,etc.) para poder ver si me va a gustar o no dicha película.<br>
**Criterio de aceptación:**<br>
Dado que el usuario se encuentra en la pantalla donde se listan todas las películas, cuando haga clic en una de las portadas, entonces se desplegará toda la información de dicha película.

3. **Buscar una película**<br>
Como usuario de la web quiero poder buscar películas de mi interés por el nombre, fecha de estreno o idioma, para poder buscar la película que deseo ver junto a su información.<br>
**Criterio de aceptación:**<br>
Dado que el usuario de la web desea buscar una película particular, encontrándose en la página de inicio de la web. Se dirige a un cuadro de búsqueda y escribe el nombre de la película para ver un listado detallado de la misma

## API REST
### APIs públicas tentativas

1. [**The Movie Database**](https://developer.themoviedb.org/docs/getting-started)<br>
API pública y de uso gratuito para poder disponer de una base de datos llena de información sobre películas, series y demás. Además permite crear listas “Watchlist” o agregar a favoritos. La misma cuenta con una documentación que la hace muy accesible.

2. [**Letterboxd**](https://api-docs.letterboxd.com)<br>
API pública y de uso gratuito para poder disponer de un montón de información sobre películas, series, recomendaciones, reseñas, puntuaciones y demás. Además permite crear diversas listas y compartir temas con la comunidad. Cuenta con una documentación extensa y el uso de oauth2.

3. [**Fake Store API**](https://fakestoreapi.com/docs)<br>
API pública y de uso gratuito para poder disponer de un montón de información sobre artículos de tienda. Permite mostrar, agregar, actualizar, eliminar e incluso usar un carrito de compras. Tiene una buena documentación, sencilla y al grano.

### API REST a utilizar
Se optó por el uso de la API de The Movie Database, por una decisión unánime en el equipo para hacer algo relacionado con películas, sumado a eso su buena documentación permite la fácil implementación de la API. Por último y como punto a favor, el no requerir el uso de oauth2 para realizar peticiones a la misma. Esto agiliza el uso en el frontend y permite al equipo centrarse en otras áreas.

#### /discover/movie
[Documentación oficial](https://developer.themoviedb.org/reference/discover-movie)<br>
Lista películas de forma paginada. Por defecto, estas se ordenan por popularidad.

#### /search/movie
[Documentación oficial](https://developer.themoviedb.org/reference/search-movie)<br>
Dado un *query*, busca películas que coincidan con la query en su título original, traducido o alternativo y las lista.

#### /movie/`id`
[Documentación oficial](https://developer.themoviedb.org/reference/movie-details)<br>
Dado el *id* de una película, devuelve los detalles de la misma.

### /configuration/countries
[Documentación oficial](https://developer.themoviedb.org/reference/configuration-countries)<br>
Devuelve una lista con la etiqueta *ISO 3166-1*, el nombre en inglés y el nombre traducido de todos los países en la base de datos de *TMDB*. Se utiliza para obtener los nombres traducidos de los países que producen una película ya que */movie/`id`* no lo hace.

## Mockups
### Pantalla principal
![Pestaña principal](https://github.com/EnzoGaGu/RIA-project/assets/50501652/0217e5e0-f22a-46e9-bde2-5d4045c65212)

### Ver datos de una película
![Detalles de una pelicula](https://github.com/EnzoGaGu/RIA-project/assets/50501652/15673d96-7f0b-4e76-a061-27bf26e969d0)

## Mapa de navegación y usabilidad
![Mapa de navegación](https://github.com/EnzoGaGu/RIA-project/assets/50501652/12e379be-f4b1-43bb-86a4-5b8d6157d87c)

**Leyenda**

- <font color="white">**Blanco:**</font> Páginas que el usuario visita
- <font color="red">**Rojo:**</font> Acciones que el usuario realiza.

### Decisiones de usabilidad
Se tomó la decisión de hacer una web que vaya directo al listado debido a dos factores; el primero es que la mayoría de webs del estilo cuenta con un listado de películas apenas se ingresa, lo cual le facilita al usuario ver el catálogo y adicionalmente ya se encuentra familiarizado con dicha forma. Por otra parte fue una decisión del grupo para generar menores puntos intermedios para poder llegar a la información.<br>
Luego ofrecemos funcionalidades para filtrar y que le sea más ágil el proceso de identificar su película en el propio menú inicial, sin realizar una carga de otra sección. Todo esto para reducir los tiempos que al usuario le toma llegar a la información de una película en cuestión y reducir los posibles tiempos de carga o pantallas intermedias.
