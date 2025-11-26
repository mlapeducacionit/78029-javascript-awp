# Clase 02 - Javascript AWP (Progressive Web App)

## Arrancar un proyecto Vite

```sh
npm create vite@latest ./ -- --template vanilla
```

## Para arrancar el servidor de desarrollo

1. Instalar dependencias

Nota: Si no tengo los node_modules tengo que hacer la instalación

```sh
npm i # npm install 
```

2. Arrancar el servidor

```sh
npm run dev
```

## Detener el servidor

Ctrl + C

## Subir el proyecto a la nube (GitHub)

1. Crear un repo

```sh
git init
``` 

2. Agregar el remoto en el repo local

```sh
git remote add origin https://github.com/mlapeducacionit/78029-javascript-awp.git
```

3. Hago el add y despues el commit

```sh
git add . 
git commit -m "Arranco la PWA"
```

4. Ver el listado de commits

```sh
git log --oneline
``` 

5. Actualizo el repositorio remoto con los cambios realizado en el repositorio local

```sh
git push -u origin main # primera vez
git push
```