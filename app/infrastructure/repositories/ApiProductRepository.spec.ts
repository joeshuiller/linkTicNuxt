import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiProductRepository } from './ApiProductRepository';
import { $fetch } from 'ofetch';
import { API_URLS } from '../../shared/urlList';
import type { ProductDTO } from '../Dtos/ProductDTO';

// 1. Mockeamos la librería 'ofetch' para interceptar $fetch
vi.mock('ofetch', () => ({
    $fetch: vi.fn(),
}));

// 2. Mockeamos la lista de URLs para no depender del archivo real
vi.mock('../../shared/urlList', () => ({
    API_URLS: {
        getProducts: vi.fn(() => 'https://api.fake.com/products'),
    }
}));

describe('ApiProductRepository', () => {
    let repository: ApiProductRepository;

    beforeEach(() => {
        vi.clearAllMocks();
        repository = new ApiProductRepository();

        // Silenciamos el console.error para tener una terminal limpia durante las pruebas
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // TEST 1: El Camino Feliz (La API responde correctamente)
    it('debe obtener los productos de la API y mapearlos a entidades de dominio', async () => {
        // Arrange: Preparamos un array simulado de DTOs (datos crudos)
        const mockDTOs: ProductDTO[] = [
            {
                id: 1,
                title: 'Gorra Vintage',
                slug: 'gorra-vintage',
                price: 15.99,
                description: 'Gorra de estilo retro',
                category: {
                    id: 5,
                    name: 'Accesorios',
                    image: 'https://ejemplo.com/accesorios.jpg',
                    slug: 'accesorios'
                },
                images: ['https://ejemplo.com/gorra.jpg']
            }
        ];

        // Le decimos a $fetch que responda con estos datos
        vi.mocked($fetch).mockResolvedValue(mockDTOs);

        // Act: Ejecutamos el método del repositorio
        const result = await repository.getAll();

        // Assert: Verificamos que se llamó a la URL correcta
        expect($fetch).toHaveBeenCalledTimes(1);
        expect($fetch).toHaveBeenCalledWith('https://api.fake.com/products');

        // Assert: Verificamos que los datos se devolvieron mapeados correctamente
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(mockDTOs[0].id);
        expect(result[0].title).toBe(mockDTOs[0].title);

        // Gracias al ProductMapper que probamos antes, sabemos que estas imágenes 
        // pasaron por el filtro de seguridad de URLs HTTP/HTTPS
        expect(result[0].images).toEqual(mockDTOs[0].images);
    });

    // TEST 2: El Camino Triste (La API falla)
    it('debe capturar errores de red y lanzar un mensaje amigable para el usuario', async () => {
        // Arrange: Simulamos que la API está caída (Ej: Error 500)
        const networkError = new Error('500 Internal Server Error');
        vi.mocked($fetch).mockRejectedValue(networkError);

        // Act & Assert: Verificamos que se lanza nuestro error personalizado, no el de la API
        await expect(repository.getAll()).rejects.toThrow('No se pudieron cargar los productos en este momento.');

        // Verificamos que el repositorio intentó hacer la petición
        expect($fetch).toHaveBeenCalledTimes(1);

        // Verificamos que el error original se imprimió en consola para los desarrolladores
        expect(console.error).toHaveBeenCalledWith('Error fetching products from API:', networkError);
    });
});