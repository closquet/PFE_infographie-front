module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/settings.scss";`
            },
        }
    },
    devServer: {
        port: 80,
    },
}