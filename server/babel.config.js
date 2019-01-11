module.exports = function(api) {
  api.cache(true)
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
          node: true
        }
      }
    ]
  ]
  const plugins = [
    // '@babel/plugin-transform-modules-commonjs',
    // '@babel/plugin-transform-async-to-generator',
    // '@babel/plugin-syntax-jsx',
    // 'babel-plugin-transform-vue-jsx',
    // '@babel/plugin-transform-runtime',
    //
    // 'syntax-class-properties',
    // 'transform-class-properties'
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-syntax-jsx',
    'babel-plugin-transform-vue-jsx',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties'
  ]
  
  return {
    presets,
    plugins
  }
}
