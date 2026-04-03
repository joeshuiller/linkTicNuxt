import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import { useCart } from '../../../../../app/presentation/composables/useCart'; // Ajusta la ruta si es necesario
import type { Product } from '../../../../../app/core/entities/Product';

// 1. MOCK DE NUXT: Simulamos useState usando un ref nativo de Vue
vi.mock('#imports', () => ({
    useState: (key: string, init: () => any) => {
        return ref(init());
    }
}));

// 2. MOCK DE NUXT UI: Simulamos useToast globalmente
const mockAddToast = vi.fn();
vi.stubGlobal('useToast', () => ({
    add: mockAddToast
}));

describe('useCart Composable', () => {
    let cart: ReturnType<typeof useCart>;

    // Datos falsos (Mocks) para usar en los tests
    const productA = { id: 1, title: 'Laptop', price: 1000 } as Product;
    const productB = { id: 2, title: 'Mouse', price: 50 } as Product;

    // beforeEach se ejecuta ANTES de cada test para darnos un entorno limpio
    beforeEach(() => {
        vi.clearAllMocks(); // Limpiamos el historial del toast
        cart = useCart();
        cart.clearCart();   // Vaciamos el carrito
    });

    test('debe inicializar el carrito vacío', () => {
        expect(cart.cartItems.value.length).toBe(0);
        expect(cart.cartTotalItems.value).toBe(0);
        expect(cart.cartTotalPrice.value).toBe(0);
    });

    test('debe agregar un producto nuevo al carrito y llamar al toast', () => {
        cart.addToCart(productA, 1);

        expect(cart.cartItems.value.length).toBe(1);
        expect(cart.cartItems.value[0].product.id).toBe(productA.id);
        expect(cart.cartItems.value[0].quantity).toBe(1);

        // Verificamos que la notificación se haya disparado
        expect(mockAddToast).toHaveBeenCalledOnce();
        expect(mockAddToast).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Agregado al carrito'
        }));
    });

    test('debe sumar la cantidad si el producto ya existe en el carrito', () => {
        cart.addToCart(productA, 1);
        cart.addToCart(productA, 2); // Agregamos el mismo producto de nuevo

        expect(cart.cartItems.value.length).toBe(1); // Sigue siendo 1 item
        expect(cart.cartItems.value[0].quantity).toBe(3); // 1 + 2 = 3
    });

    test('debe eliminar un producto específico del carrito', () => {
        cart.addToCart(productA, 1);
        cart.addToCart(productB, 1);

        cart.removeFromCart(productA.id);

        expect(cart.cartItems.value.length).toBe(1);
        expect(cart.cartItems.value[0].product.id).toBe(productB.id); // Solo quedó el Mouse
    });

    test('debe actualizar la cantidad correctamente', () => {
        cart.addToCart(productA, 1);

        cart.updateQuantity(productA.id, 5);

        expect(cart.cartItems.value[0].quantity).toBe(5);
    });

    test('NO debe permitir actualizar a una cantidad menor a 1', () => {
        cart.addToCart(productA, 2);

        cart.updateQuantity(productA.id, 0); // Intento inválido
        cart.updateQuantity(productA.id, -5); // Intento inválido

        // La cantidad se debe mantener en 2
        expect(cart.cartItems.value[0].quantity).toBe(2);
    });

    test('debe calcular correctamente los totales (items y precio)', () => {
        cart.addToCart(productA, 2); // 2 * 1000 = 2000
        cart.addToCart(productB, 3); // 3 * 50 = 150

        expect(cart.cartTotalItems.value).toBe(5); // 2 + 3
        expect(cart.cartTotalPrice.value).toBe(2150); // 2000 + 150
    });
});