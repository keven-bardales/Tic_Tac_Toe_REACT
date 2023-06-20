import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://keven-bardales.github.io/Tic_Tac_Toe_REACT',
});
