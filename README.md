# 🛒 Tienda Online 

Este proyecto fue realizado como parte del curso de React de la Carrera Fullstack. Consiste en una tienda online que implementa navegación entre distintas vistas utilizando **React Router DOM** y utiliza **Firebase/Firestore** como base de datos.

## 🎯 Objetivo

Implementar un sistema de rutas para navegar entre:

- Catálogo principal de productos
- Productos filtrados por categoría
- Vista en detalle de un producto
- Carrito de compras con funcionalidad completa
- Formulario de checkout con validaciones

## 🚀 Funcionalidades

✅ Navegación con enlaces usando `<Link>` de React Router  
✅ Uso de rutas dinámicas con `useParams()`  
✅ Listado de productos con `map()` y `key`  
✅ Filtro de productos por categoría  
✅ Detalle individual de productos con su propio ID  
✅ Uso de `useEffect()` para reaccionar a cambios de URL  
✅ **Firebase/Firestore** con `getDoc`, `getDocs` y `query`  
✅ Ruta 404 para manejar errores de navegación  
✅ **CartContext** con funcionalidad completa de carrito  
✅ **CartWidget** con indicador de cantidad  
✅ **Checkout** con validación de formulario  
✅ Ocultar contador después de agregar al carrito  
✅ **SweetAlert2** para mejor UX en confirmaciones  

## 🧩 Componentes principales

### 🔹 Contenedores (manejan estado y efectos)

- **ItemListContainer**: obtiene productos o productos por categoría desde Firestore
- **ItemDetailContainer**: obtiene un producto por ID desde Firestore

### 🔹 Presentacionales

- **ItemList**: muestra una lista de productos
- **Item**: vista individual de cada producto
- **ItemDetail**: vista detallada de un producto
- **ItemCount**: permite seleccionar unidades (se oculta después de agregar)
- **Cart**: gestión completa del carrito
- **CartWidget**: widget del carrito con contador
- **Checkout**: formulario de compra con validaciones

### 🔹 Context

- **CartContext**: maneja el estado global del carrito

## 🧭 Rutas implementadas

- `/` → Catálogo principal
- `/category/:categoryId` → Productos filtrados por categoría
- `/item/:itemId` → Detalle de producto
- `/cart` → Carrito de compras
- `/checkout` → Formulario de compra
- `*` → Página 404

## 🗂️ Estructura del proyecto

src/
├── components/
│ ├── NavBar/
│ ├── ItemListContainer/
│ ├── ItemDetailContainer/
│ ├── ItemList/
│ ├── Item/
│ ├── ItemDetail/
│ ├── ItemCount/
│ ├── Cart/
│ ├── CartWidget/
│ ├── Checkout/
│ └── NotFound/
├── context/
│ └── CartContext.jsx
├── data/
│ └── products.js (Firebase/Firestore)
├── firebase/
│ └── config.js
├── App.jsx
└── main.jsx

## 🛠️ Tecnologías usadas

- React
- React Router DOM
- Firebase/Firestore
- SweetAlert2
- JavaScript
- HTML/CSS

## 🔥 Firebase/Firestore

El proyecto utiliza Firebase/Firestore para:

- **getDocs**: Obtener colecciones de productos y categorías
- **getDoc**: Obtener documentos específicos por ID
- **query**: Filtrar productos por categoría
- **where**: Consultas condicionales

## 🛒 Funcionalidades del Carrito

- Agregar productos con cantidad
- Remover productos individuales
- Limpiar carrito completo
- Calcular totales
- Verificar productos en carrito
- Ocultar contador después de agregar

## ✅ Validaciones del Checkout

- Nombre: mínimo 5 caracteres
- Email: formato válido
- Teléfono: mínimo 10 dígitos
- Dirección: mínimo 10 caracteres
- Feedback visual de errores
- Estado de carga durante el proceso

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de instalación
```bash
# Clonar el repositorio
git clone [URL-del-repositorio]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Configuración de Firebase
1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar Firestore Database
3. Actualizar las credenciales en `src/firebase/config.js`
4. Crear la colección `productos` en Firestore

## 📱 Características de la UI/UX

- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Navegación fluida**: Sin recargas de página (SPA)
- **Feedback visual**: Estados de carga, errores y confirmaciones
- **Dropdown del carrito**: Vista previa con hover
- **Número de orden copiable**: Click para copiar al portapapeles
- **Validaciones en tiempo real**: Feedback inmediato en el formulario
- **SweetAlert2**: Alertas modernas para confirmaciones y errores

## 🔧 Scripts disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la build
npm run lint         # Ejecutar ESLint
```

## 📊 Estructura de datos

### Productos (colección `productos`)
```json
{
  "name": "Nombre del producto",
  "description": "Descripción detallada",
  "price": 35000,
  "image": "URL-de-la-imagen",
  "category": "Categoría"
}
```

**Nota:** Las categorías se generan automáticamente a partir del campo `category` de los productos.




## 📝 Notas del desarrollador

Este proyecto demuestra el dominio completo de:
- **React Hooks** (useState, useEffect, useContext)
- **React Router** para navegación SPA
- **Firebase/Firestore** para backend
- **Context API** para estado global
- **Componentes funcionales** y patrones modernos
- **Validaciones de formularios**
- **Manejo de errores** y estados de carga

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras.

## 📄 Licencia

Este proyecto fue desarrollado como parte del curso de React de la Carrera Fullstack.

