import { describe, it, expect } from 'vitest';
import { ProductMapper } from './ProductMapper';
import type { ProductDTO } from '../Dtos/ProductDTO';

describe('ProductMapper', () => {

    // TEST 1: El Camino Feliz (Datos perfectos)
    it('debe mapear correctamente un ProductDTO válido a una entidad Product', () => {
        // Arrange: Preparamos un DTO perfecto tal como lo enviaría una API ideal
        const rawDto: ProductDTO = {
            id: 1,
            title: 'Camiseta de Algodón',
            slug: 'camiseta-de-algodon',
            price: 25.99,
            description: 'Una camiseta muy cómoda para el verano.',
            category: {
                id: 10,
                name: 'Ropa',
                image: 'https://ejemplo.com/ropa.jpg',
                slug: 'ropa'
            },
            images: [
                'https://ejemplo.com/img1.jpg',
                'http://ejemplo.com/img2.jpg'
            ]
        };

        // Act: Ejecutamos el mapeador
        const result = await ProductMapper.toDomain(rawDto); // Nota: si tu método no es async, quita el 'await'. Tu código es estático y síncrono, así que lo usaremos sin await.

        const resultSync = ProductMapper.toDomain(rawDto);

        // Assert: Verificamos que las propiedades básicas se pasaron correctamente
        expect(resultSync.id).toBe(rawDto.id);
        expect(resultSync.title).toBe(rawDto.title);
        expect(resultSync.slug).toBe(rawDto.slug);
        expect(resultSync.price).toBe(rawDto.price);
        expect(resultSync.description).toBe(rawDto.description);

        // Verificamos que la categoría se mapeó correctamente
        expect(resultSync.category.id).toBe(rawDto.category.id);
        expect(resultSync.category.name).toBe(rawDto.category.name);

        // Verificamos que las imágenes pasaron intactas porque todas son válidas
        expect(resultSync.images.length).toBe(2);
        expect(resultSync.images).toEqual(rawDto.images);
    });

    // TEST 2: La regla de negocio de limpieza de imágenes (MUY IMPORTANTE)
    it('debe limpiar las imágenes corruptas, vacías o que no sean HTTP/HTTPS', () => {
        // Arrange: Preparamos un DTO con "basura" en el array de imágenes
        const dirtyDto: ProductDTO = {
            id: 2,
            title: 'Zapatillas',
            slug: 'zapatillas',
            price: 50,
            description: 'Zapatillas deportivas',
            category: {
                id: 20,
                name: 'Calzado',
                image: 'https://ejemplo.com/calzado.jpg',
                slug: 'calzado'
            },
            // Simulamos lo que a veces hacen las APIs mal diseñadas
            images: [
                'https://ejemplo.com/valida1.jpg', // Válida
                '',                                // Cadena vacía (falla por img && ...)
                'http://ejemplo.com/valida2.jpg',  // Válida
                'ftp://ejemplo.com/invalida.jpg',  // Falla (no empieza con http)
                'esto-no-es-una-url',              // Falla (no empieza con http)
                null as unknown as string          // Simulamos un null que se coló en el JSON
            ]
        };

        // Act
        const result = ProductMapper.toDomain(dirtyDto);

        // Assert: Solo deberían sobrevivir las 2 imágenes válidas
        expect(result.images.length).toBe(2);
        expect(result.images).toEqual([
            'https://ejemplo.com/valida1.jpg',
            'http://ejemplo.com/valida2.jpg'
        ]);
    });
});