import type { Product } from "../../core/entities/Product";
import type { ProductDTO } from "../Dtos/ProductDTO";

export class ProductMapper {
    static toDomain(raw: ProductDTO): Product {
        return {
            id: raw.id,
            title: raw.title,
            slug: raw.slug,
            price: raw.price,
            description: raw.description,
            category: {
                id: raw.category.id,
                name: raw.category.name,
                image: raw.category.image,
                slug: raw.category.slug
            },
            // Limpiamos las imágenes por si la API manda URLs corruptas o vacías
            images: raw.images.filter(img => img && img.startsWith('http'))
        };
    }
}