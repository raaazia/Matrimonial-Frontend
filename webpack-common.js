const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        register: './src/register/index.js',
        profile: './src/profile/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/register.html',
            inject: true,
            chunks: ['register'],
            filename: 'register.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/profile.html',
            inject: true,
            chunks: ['profile'],
            filename: 'profile.html'
        }),
    ],
    
    
};