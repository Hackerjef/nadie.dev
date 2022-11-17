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
        return config;
    }
}