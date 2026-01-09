import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";

import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const basePlugins: PluginOption[] = [
    react(),
    tailwindcss(),
    // DO NOT REMOVE
    createIconImportProxy() as PluginOption,
  ]
  
  // Don't include spark plugin in test mode
  const plugins = mode === 'test' 
    ? basePlugins 
    : [...basePlugins, sparkPlugin() as PluginOption]

  return {
    base: '/zava-smart-sportswear/',
    plugins,
    resolve: {
      alias: {
        '@': resolve(projectRoot, 'src')
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  }
});
