const sass = require("rollup-plugin-sass");
module.exports = {
    rollup(config, options) {
        config.plugins.push(
            sass({
                input: "index.js",
                output: {
                    file: "bundle.js",
                    format: "esm"
                },
                plugins: [sass()]
            })
        );
        return config;
    }
};
