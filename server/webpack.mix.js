const path = require('path')
const mix = require('laravel-mix')
const { VueLoaderPlugin } = require('vue-loader')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

// setting the public directory to public (this is where the mix-manifest.json gets created)
mix
  .setPublicPath('public')
  // transpiling, babelling, minifying and creating the public/js/main.js out of our assets
  .js('resources/js/shop.js', 'public/js')
  .js('resources/js/admin.js', 'public/js')
  .extract(['vue', 'vue-router', 'axios'])
  .sass('resources/scss/shop.scss', 'public/css')
  .sass('resources/scss/admin.scss', 'public/css')
  .sourceMaps()

mix.webpackConfig({
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
      '@scss': path.resolve(__dirname, 'resources/scss')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        exclude: /(node_modules)/,
        loader: 'vue-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-modules-commonjs',
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-syntax-jsx',
            'babel-plugin-transform-vue-jsx',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // plugins: ['@babel/transform-runtime']
            plugins: [
              '@babel/plugin-transform-modules-commonjs',
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }
    ]
  }
})

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
