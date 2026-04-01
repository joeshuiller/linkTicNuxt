import type { IProductRepository } from '../interfaces/IProductRepository';
import type { Product } from '../entities/Product';

export class GetProductsUseCase {
    // Inyección de dependencias a través del constructor
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(): Promise<Product[]> {
        // Aquí podrías agregar lógica extra de negocio si fuera necesario
        return await this.productRepository.getAll();
    }
}