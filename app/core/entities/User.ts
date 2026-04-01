export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string; // Platzi API suele devolver un 'customer' o 'admin'
}