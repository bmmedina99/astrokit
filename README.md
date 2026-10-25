# AstroKit

[![Astro version](https://img.shields.io/npm/v/astro?style=for-the-badge&logo=astro&label=Astro&color=%23BC52EE)](https://docs.astro.build/) [![TailwindCSS version](https://img.shields.io/npm/v/tailwindcss?style=for-the-badge&logo=tailwindcss&label=TailwindCSS&color=%2306B6D4)](https://tailwindcss.com/docs) [![TypeScript version](https://img.shields.io/npm/v/typescript?style=for-the-badge&logo=typescript&label=TypeScript&color=%233178C6)](https://www.typescriptlang.org/) [![Biome version](https://img.shields.io/npm/v/@biomejs/biome?style=for-the-badge&logo=biome&label=Biome&color=%2360A5FA)](https://biomejs.dev/guides/getting-started/)

Plantilla de [Astro](https://astro.build/), [TailwindCSS](https://tailwindcss.com/) y [TypeScript](https://www.typescriptlang.org/) para crear sitios web estáticos rápidos; optimizada para SEO y accesibilidad

---

## Características

- **Astro** v7 configurado para contenido estático.
- **TailwindCSS** v4 para estilos rápidos.
- **TypeScript** v7 para usar con `tsconfig.json` optimizado.
- **Biome** v2 para lintear y formatear el código.

---

## Cómo usarlo

1. En GitHub, haz clic en **Use this template** y crea tu repositorio nuevo.
2. Clona tu repositorio:

```bash
  git clone https://github.com/tu-usuario/nombre-proyecto.git
  cd nombre-proyecto
```
3. Instala la dependencias

```bash
  pnpm install
```

4. Inicia el entorno de desarrollo

```bash
  pnpm run dev
```
5. Accede a http://localhost:4000 y listo

---

## Estructura del proyecto

```
astrokit/
  |-- .github/ <-- configuraciones de GitHub
    |-- workflows/ <-- acciones de GitHub
      |-- ci.yml <-- ci pipeline, modificar a la rama principal
  |-- public/ <--  archivos estáticos
  |-- src/ <-- código fuente
    |-- components/ <-- componentes reutilizables
    |-- layouts/ <-- plantillas de página
    |-- pages/ <-- páginas del sitio
    |-- styles/ <-- estilos globales
```

## Licencia

Este proyecto está bajo la [Licencia MIT](./LICENSE).

---

## Recursos

- [Guía de Astro](https://docs.astro.build)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Biome Docs](https://biomejs.dev/guides/getting-started/)
