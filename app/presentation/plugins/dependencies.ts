import { ApiProductRepository } from '../../infrastructure/repositories/ApiProductRepository';
import { GetProductsUseCase } from '../../core/use-cases/GetProductsUseCase';
import { ApiUserRepository } from '../../infrastructure/repositories/ApiUserRepository';
import { CreateUserUseCase } from '../../core/use-cases/CreateUserUseCase';
import { ApiAuthRepository } from '../../infrastructure/repositories/ApiAuthRepository';
import { LoginUseCase } from '../../core/use-cases/LoginUseCase';
import { GetProfileUseCase } from '../../core/use-cases/GetProfileUseCase';

export default defineNuxtPlugin(() => {
    // 1. Instanciamos el Repositorio de la API
    const productRepository = new ApiProductRepository();
    const userRepository = new ApiUserRepository();
    const authRepository = new ApiAuthRepository();
    // 2. Le inyectamos el repositorio al Caso de Uso
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const loginUseCase = new LoginUseCase(authRepository);
    const getProfileUseCase = new GetProfileUseCase(authRepository);
    return {
        provide: {
            // Ahora $getProductsUseCase está disponible en toda la app de Nuxt
            getProductsUseCase,
            createUserUseCase,
            loginUseCase,
            getProfileUseCase
        }
    };
});