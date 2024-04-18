import { defineConfig } from 'vite'
import {viteSingleFile} from "vite-plugin-singlefile";

export default defineConfig({
    plugins: [viteSingleFile()],
    build:{
        minify:true,
        outDir: 'dist'
    },
    server:{
        watch:{
            usePolling: true,
        }
    }
})
