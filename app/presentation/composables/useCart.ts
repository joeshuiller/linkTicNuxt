import { computed } from 'vue';
import { useState } from '#imports';
import type { Product } from '../../core/entities/Product';

// Definimos cómo se ve un elemento dentro del carrito
export interface CartItem {
    product: Product;
    quantity: number;
}

export const useCart = () => {
    // useState asegura que el carrito sea global en toda la app
    const cartItems = useState<CartItem[]>('cart_items', () => []);

    // 1. Agregar al carrito
    const addToCart = (product: Product, quantity: number = 1) => {
        const existingItem = cartItems.value.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity; // Si ya existe, sumamos la cantidad
        } else {
            cartItems.value.push({ product, quantity }); // Si es nuevo, lo agregamos
        }

        // Opcional: Mostrar notificación
        const toast = useToast();
        if (toast) {
            toast.add({
                title: 'Agregado al carrito',
                description: `${product.title} se ha añadido correctamente.`,
                color: 'success' // Opcional: le da un toque verde de éxito
            });
        }
    };

    // 2. Eliminar del carrito
    const removeFromCart = (productId: number) => {
        cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
    };

    // 3. Actualizar cantidad (botones + / -)
    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return; // Evitamos cantidades cero o negativas
        const item = cartItems.value.find(i => i.product.id === productId);
        if (item) item.quantity = newQuantity;
    };

    // 4. Totales Calculados (Computed properties)
    const cartTotalItems = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

    const cartTotalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    });

    const clearCart = () => {
        cartItems.value = [];
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotalItems,
        cartTotalPrice,
        clearCart
    };
};