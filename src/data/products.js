import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';


export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return products;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
};


export const getProductsByCategory = async (categorySlug) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    const products = [];
    
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productCategorySlug = product.category?.toLowerCase().replace(/\s+/g, '-');
      
      if (productCategorySlug === categorySlug) {
        products.push({
          id: doc.id,
          ...product
        });
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error obteniendo productos por categoría:', error);
    return [];
  }
};


export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'productos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log('No se encontró el producto');
      return null;
    }
  } catch (error) {
    console.error('Error obteniendo producto por ID:', error);
    return null;
  }
};


export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    const categories = new Set();
    
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      if (product.category) {
        categories.add(product.category);
      }
    });
    
    return Array.from(categories).map(category => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return [];
  }
};


export const searchProducts = async (query) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      if (product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())) {
        products.push({
          id: doc.id,
          ...product
        });
      }
    });
    return products;
  } catch (error) {
    console.error('Error buscando productos:', error);
    return [];
  }
}; 