const path = require('path')

module.exports = {
    webpack: function (config, env) {
        if (!config.watchOptions) {
            config.watchOptions = {};
        }
        if (!config.watchOptions.ignored) {
            config.watchOptions.ignored = [];
        }
        config.watchOptions.poll = 1000
        config.watchOptions.ignored.push(path.resolve(__dirname, 'dist'))
        config.watchOptions.ignored.push(path.resolve(__dirname, 'node_modules'))
        config.watchOptions.ignored.push(path.resolve(__dirname, 'public', 'api.php'))


        if (!config.resolve) {
            config.resolve = {}
        }

        if (!config.resolve.fallback) {
            config.resolve.fallback = {}
        }
        config.resolve.fallback = Object.assign({}, config.resolve.fallback, {
            fs: false,
            path: false,
            crypto: false,
            perf_hooks: false
        })
        return config;
    }
}