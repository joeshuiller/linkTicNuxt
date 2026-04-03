import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { useProducts } from '../../../../../app/presentation/composables/useProducts';
import type { Product } from '../../../../../app/core/entities/Product';

// 1. Mock de la reactividad de Vue
vi.stubGlobal('ref', ref);

// 2. Mock del UseCase y del hook auto-importado useNuxtApp
const mockExecute = vi.fn();
const mockUseNuxtApp = vi.fn(() => ({
    $getProductsUseCase: {
        execute: mockExecute
    }
}));
vi.stubGlobal('useNuxtApp', mockUseNuxtApp);

describe('useProducts Composable', () => {
    // Datos simulados de productos
    const mockProductList: Product[] = [
        {
            id: 1,
            title: 'Zapatillas Running',
            slug: 'zapatillas-running',
            price: 120,
            description: 'Zapatillas super ligeras',
            category: {
                id: 2,
                name: 'Deportes',
                image: 'https://ejemplo.com/deportes.jpg',
                slug: 'deportes'
            },
            images: ['https://ejemplo.com/zapato.jpg']
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: Estado Inicial
    it('debe inicializar con los estados por defecto (vacío y sin carga/error)', () => {
        const { products, isLoading, error } = useProducts();

        expect(products.value).toEqual([]);
        expect(isLoading.value).toBe(false);
        expect(error.value).toBeNull();
    });

    // TEST 2: El Camino Feliz (Fetch exitoso)
    it('debe llamar al caso de uso, guardar los productos y quitar el estado de carga', async () => {
        // Arrange: Simulamos que el Caso de Uso devuelve nuestros productos
        mockExecute.mockResolvedValue(mockProductList);

        const { products, isLoading, error, fetchProducts } = useProducts();

        // Act: Ejecutamos la función de fetch
        await fetchProducts();

        // Assert: Verificamos que se llamó al Caso de Uso
        expect(mockExecute).toHaveBeenCalledTimes(1);

        // Assert: Verificamos que los estados reactivos se actualizaron
        expect(products.value).toEqual(mockProductList); // La data se guardó
        expect(isLoading.value).toBe(false); // Terminó de cargar
        expect(error.value).toBeNull(); // No hubo errores
    });

    // TEST 3: El Camino Triste (Falla la carga)
    it('debe manejar el error, guardar el mensaje y quitar el estado de carga', async () => {
        // Arrange: Simulamos que la API o el Caso de Uso fallan
        const errorMessage = 'Error al conectar con el servidor';
        mockExecute.mockRejectedValue(new Error(errorMessage));

        const { products, isLoading, error, fetchProducts } = useProducts();

        // Act
        await fetchProducts();

        // Assert
        expect(mockExecute).toHaveBeenCalledTimes(1);

        // Assert: Verificamos los estados tras el fallo
        expect(products.value).toEqual([]); // Los productos siguen vacíos
        expect(error.value).toBe(errorMessage); // El mensaje de error está listo para la UI
        expect(isLoading.value).toBe(false); // Terminó de cargar (el bloque finally funcionó)
    });
});