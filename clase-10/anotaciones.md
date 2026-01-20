# Trabajando con PNPM

<https://pnpm.io/es/>

## Instalación de pnpm
Abrir terminal/Power Shell como admin y ejecutar lo siguientes comandos

```sh
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
```

> Agrego politica de exclusión en Windows Defender sobre el directorio del pnpm 

```sh
Add-MpPreference -ExclusionPath $(pnpm store path)
```

# Crear un proyecto de React con VITE utilizando pnpm

```sh
pnpm create vite ./
```

## Para instalar dependencias

```sh
pnpm i
```

## Para arrancar el servidor de desarrollo

```sh
pnpm dev
```

## Para hacer el build

```sh
pnpm build
``` 

# Plugin para facilitar el trabajo con progresive web app en Vite

<https://vite-pwa-org.netlify.app/>

Para trabajar con VITE PWA siempre tengo que hacer el build de mi aplicación.

```sh
pnpm build
```

## Para probar ese build (dist)

```sh
pnpm preview
``` 