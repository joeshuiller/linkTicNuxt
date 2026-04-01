import type { Product } from "../../core/entities/Product";


export const useProducts = () => {
    const { $getProductsUseCase } = useNuxtApp();

    // Estados reactivos
    const products = ref<Product[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchProducts = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            products.value = await $getProductsUseCase.execute();
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        products,
        isLoading,
        error,
        fetchProducts
    };
};