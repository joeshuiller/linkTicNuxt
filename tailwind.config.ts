import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                // Creamos un color "brand" (marca) personalizado. 
                // Es un azul índigo vibrante, muy usado en e-commerce modernos.
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6', // Color principal
                    600: '#2563eb', // Hover
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554',
                },
            },
            fontFamily: {
                // Si luego instalas una fuente de Google Fonts (ej. Inter o Poppins), la declaras aquí
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
            }
        }
    }
}