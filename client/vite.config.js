import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // Output directory for production files
        target: 'esnext', // Optimized for modern browsers
    },
});
