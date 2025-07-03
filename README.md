# Sofia - Plataforma de Gestión Médica

Sistema integral para la gestión médica y administrativa. Permite gestionar pacientes, citas, historiales y más.

## 🚀 Despliegue en GitHub Pages

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages cuando se hace push a la rama `main`.

### Configuración para GitHub Pages

- **Base Path**: `/colmedicos-ui`
- **Exportación estática**: Habilitada
- **Optimización de imágenes**: Deshabilitada para compatibilidad con sitios estáticos

### URL del sitio

https://diemedinam.github.io/colmedicos-ui/

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Exportar para GitHub Pages
npm run export
```

## 📁 Estructura del proyecto

- `app/` - Páginas y componentes de Next.js 13+
- `components/` - Componentes reutilizables
- `public/` - Archivos estáticos (imágenes, etc.)

## 🔧 Tecnologías

- Next.js 15.3.4
- React 19
- Tailwind CSS 4
- GitHub Pages
