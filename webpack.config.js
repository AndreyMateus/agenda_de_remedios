const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./js/main.js",
    },
    output: {
        path: path.resolve(__dirname, "dist",),
        filename: "[name].min.js"
    },
    mode: "production",

    plugins: [
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
            // OBJ do CSS.
            {
                test: /\.css$/,
                //! OBS: os LOADERS precisam estar NESSA ORDEM, primeiro o LOADER que irá manda ro código para um novo arquivo, e em segundo, o "loader" que irá identificar as PALAVRAS no CSS.
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            // OBJ do BABEL(JS).
            // https://www.npmjs.com/package/babel-loader
            //? OBS: na nova FORMA do BABEL, podemos passar as configurações do BABEL dentro da CHAVE "options" que fica dentro do "use", porém consulte a documentação, não estamos usando isso no momento.
            {
                test: /\.(?:js|mjs|cjs)$/,
                use: ['babel-loader']
            }]
    }
};