const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {

    devServer: {
        devServer: {
            allowedHosts: 'all',
        },
        proxy: {
            'api': {
                target: 'https://clinics-7.onrender.com',
                changeOrigin: true,
                secure: false
            }
        }
    }
}
