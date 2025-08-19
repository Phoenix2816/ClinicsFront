const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {

    devServer: {
        proxy: {
            'api': {
                target: 'https://clinics-7.onrender.com',
                changeOrigin: true,
                secure: false
            }
        }
    }
}
