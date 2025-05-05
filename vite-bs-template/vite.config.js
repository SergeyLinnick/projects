const path = require('path')

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: './dist'
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: 4000,
    hot: true
  },
  css: {
    preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
            'legacy-js-api',
          ],
        },
    },
  },
}

