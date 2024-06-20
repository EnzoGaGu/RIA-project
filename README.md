# Laboratoro RIA: Frontend de una web de películas

En este taller se realizó un frontend con el uso de APIs públicas disponibles para investigar hacerca del uso de React en el desarrollo frontend. La web cuenta con el uso de distintos endpoint del API para presentar un listado de películas, realizar búsquedas y ver detalles delas películas.

## Grupo
- Bruno Collazo
- Enzo Gularte
- Federico Acosta
- Santiago Paván

## Tecnologías usadas

- React version ...
- API pública (The Movie Database)

## **Historias de usuario**

1. Ver peliculas disponibles
Como usuario de la web, quiero ver la totalidad de películas disponibles en la web para poder elegir alguna de ellas y ver más información.

**Criterio de aceptación:**
Dado que el usuario se encuentra en la pantalla principal cuando este haga clic en el botón “ver todas las películas” entonces se le mostrará un listado de todas las películas que hay, separadas de 20 en 20.

2. Ver detalles de una película
Como usuario de la web, quiero poder ver la información adicional de una película (Portada, Título, lanzamiento, actores, géneros, sinopsis,etc.) para poder ver si me va a gustar o no dicha película.

**Criterio de aceptación:**
Dado que el usuario se encuentra en la pantalla donde se listan todas las películas, cuando haga clic en una de las portadas, entonces se desplegará toda la información de dicha película.

3. Buscar una película
Como usuario de la web quiero poder buscar películas de mi interés por el nombre, fecha de estreno o idioma, para poder buscar la película que deseo ver junto a su información.

**Criterio de aceptación:**
Dado que el usuario de la web desea buscar una película particular, encontrándose en la página de inicio de la web. Se dirige a un cuadro de búsqueda y escribe el nombre de la película para ver un listado detallado de la misma

## **Servicios web públicos tentativos**

1. The Movie Database 
API pública y de uso gratuito para poder disponer de una base de datos llena de información sobre películas, series y demás. Además permite crear listas “Watchlist” o agregar a favoritos. La misma cuenta con una documentación que la hace muy accesible. 
https://developer.themoviedb.org/docs/getting-started

2. Letterboxd
API pública y de uso gratuito para poder disponer de un montón de información sobre películas, series, recomendaciones, reseñas, puntuaciones y demás. Además permite crear diversas listas y compartir temas con la comunidad. Cuenta con una documentación extensa y el uso de oauth2.
https://api-docs.letterboxd.com/#overview

3. Fake Store API
API pública y de uso gratuito para poder disponer de un montón de información sobre artículos de tienda. Permite mostrar, agregar, actualizar, eliminar e incluso usar un carrito de compras. Tiene una buena documentación, sencilla y al grano.
https://fakestoreapi.com/docs


### Servicio rest a utilizar
Se optó por el uso de The Movie Database, por una decisión unánime en el equipo para hacer algo relacionado con películas, sumado a eso su buena documentación permite la fácil implementación de la API. Por último y como punto a favor, el no requerir el uso de oauth2 para realizar peticiones a la misma. Esto agiliza el uso en el frontend y permite al equipo centrarse en otras áreas.


## Mockups
### Pantalla principal:
![Pestaña principal](https://github.com/EnzoGaGu/RIA-project/assets/50501652/0217e5e0-f22a-46e9-bde2-5d4045c65212)

### Ver datos de una película:
![Detalles de una pelicula](https://github.com/EnzoGaGu/RIA-project/assets/50501652/15673d96-7f0b-4e76-a061-27bf26e969d0)

## Mapa de navegación y usabilidad.
![Mapa de navegación](https://github.com/EnzoGaGu/RIA-project/assets/50501652/12e379be-f4b1-43bb-86a4-5b8d6157d87c)

**Leyenda**

- Blanco: páginas que el usuario visita
- Rojo: acciones que el usuario realiza

### Decisiones de usabilidad
Se tomó la decisión de hacer una web que vaya directo al listado debido a dos factores; el primero es que la mayoría de webs del estilo cuenta con un listado de películas apenas se ingresa, lo cual le facilita al usuario ver el catálogo y adicionalmente ya se encuentra familiarizado con dicha forma. Por otra parte fue una decisión del grupo para generar menores puntos intermedios para poder llegar a la información.
Luego ofrecemos funcionalidades para filtrar y que le sea más ágil el proceso de identificar su película en el propio menú inicial, sin realizar una carga de otra sección. Todo esto para reducir los tiempos que al usuario le toma llegar a la información de una película en cuestión y reducir los posibles tiempos de carga o pantallas intermedias.

