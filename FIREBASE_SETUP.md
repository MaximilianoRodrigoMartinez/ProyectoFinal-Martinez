# 🔥 Configuración de Firebase

## Pasos para configurar Firebase en tu proyecto:

### 1. Crear proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database

### 2. Obtener configuración
1. En la configuración del proyecto, ve a "Configuración del proyecto"
2. En la pestaña "General", busca "Tu app"
3. Haz clic en el ícono de web (</>)
4. Registra tu app y copia la configuración

### 3. Actualizar configuración
Reemplaza la configuración en `src/firebase/config.js` con tus credenciales reales:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

### 4. Crear colecciones en Firestore
Crea las siguientes colecciones en Firestore:

#### Colección: `products`
Documentos con estructura:
```json
{
  "title": "Nombre del producto",
  "price": 99.99,
  "description": "Descripción del producto",
  "category": "categoria-slug",
  "brand": "Marca",
  "rating": 4.5,
  "stock": 10,
  "thumbnail": "URL-de-la-imagen"
}
```

#### Colección: `categories`
Documentos con estructura:
```json
{
  "name": "Nombre de la categoría",
  "slug": "categoria-slug"
}
```

### 5. Reglas de Firestore
Configura las reglas de Firestore para permitir lectura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
    }
  }
}
```

## ✅ Verificación
Una vez configurado, tu aplicación debería:
- Cargar productos desde Firestore
- Filtrar por categorías
- Mostrar detalles de productos
- Funcionar el carrito completo 