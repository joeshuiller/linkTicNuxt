import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProductsUseCase } from './GetProductsUseCase';
import type { IProductRepository } from '../interfaces/IProductRepository';
import type { Product } from '../entities/Product';

describe('GetProductsUseCase', () => {
    // Declaramos nuestras variables para usarlas en todos los tests
    let mockProductRepository: IProductRepository;
    let useCase: GetProductsUseCase;

    // Creamos datos falsos (Dummies) para simular lo que devolvería la base de datos o API
    const mockProducts: Product[] = [
        {
            id: 1,
            title: 'Camiseta de Algodón',
            price: 25,
            description: 'Una camiseta muy cómoda',
            category: 'Ropa',
            images: ['https://ejemplo.com/img1.jpg'],
            slug: 'camiseta-algodon',
            author: 'LinkTic'
        },
        {
            id: 2,
            title: 'Zapatillas Deportivas',
            price: 80,
            description: 'Ideales para correr',
            category: 'Calzado',
            images: ['https://ejemplo.com/img2.jpg'],
            slug: 'zapatillas-deportivas',
            author: 'LinkTic'
        }
    ];

    // beforeEach se ejecuta antes de CADA 'it', asegurando un estado limpio
    beforeEach(() => {
        // 1. Mockeamos el repositorio. Solo necesitamos el método getAll para este test.
        mockProductRepository = {
            getAll: vi.fn(),
        } as unknown as IProductRepository;

        // 2. Inyectamos el repositorio falso en nuestro Caso de Uso
        useCase = new GetProductsUseCase(mockProductRepository);
    });

    it('debe obtener y retornar la lista de productos exitosamente', async () => {
        // Arrange: Le decimos al mock que cuando llamen a getAll, devuelva nuestra lista mockProducts
        vi.mocked(mockProductRepository.getAll).mockResolvedValue(mockProducts);

        // Act: Ejecutamos el caso de uso
        const result = await useCase.execute();

        // Assert: Verificamos que se llamó al repositorio y que el resultado es el esperado
        expect(mockProductRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockProducts);
        expect(result.length).toBe(2);
        expect(result[0].title).toBe('Camiseta de Algodón');
    });

    it('debe lanzar un error si el repositorio falla al obtener los productos', async () => {
        // Arrange: Simulamos que la API o la Base de Datos se cayó
        const errorMessage = 'Error al conectar con la API de productos';
        vi.mocked(mockProductRepository.getAll).mockRejectedValue(new Error(errorMessage));

        // Act & Assert: Verificamos que el error sube correctamente hacia el componente
        await expect(useCase.execute()).rejects.toThrow(errorMessage);

        // Verificamos que sí intentó llamar al método
        expect(mockProductRepository.getAll).toHaveBeenCalledTimes(1);
    });
});