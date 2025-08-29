const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
<<<<<<< HEAD
    transpileDependencies: true
})

// vue.config.js
module.exports = {
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
=======
  transpileDependencies: true,
  devServer: {
>>>>>>> d8bc5ef (Initial commit)
    allowedHosts: 'all',
    proxy: {
      '/api': {
        target: 'https://clinics-7.onrender.com',
        changeOrigin: true,
        secure: false,
<<<<<<< HEAD
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
}

=======
      }
    }
  }
})
>>>>>>> d8bc5ef (Initial commit)
