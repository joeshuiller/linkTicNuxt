import type { IProductRepository } from '../../core/interfaces/IProductRepository';
import type { Product } from '../../core/entities/Product';
import { ProductMapper } from '../mappers/ProductMapper';
import type { ProductDTO } from '../Dtos/ProductDTO';
import { $fetch } from 'ofetch';
import { API_URLS } from '../../shared/urlList';

export class ApiProductRepository implements IProductRepository {
    async getAll(): Promise<Product[]> {
        try {
            const dtos = await $fetch<ProductDTO[]>(API_URLS.getProducts());
            return dtos.map(ProductMapper.toDomain);
        } catch (error) {
            console.error('Error fetching products from API:', error);
            throw new Error('No se pudieron cargar los productos en este momento.');
        }
    }
}