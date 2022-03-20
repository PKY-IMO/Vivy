const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs'
    // '@storybook/preset-scss'
  ],
  // webpackFinal: async (config, { configType }) => {
  //   // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  //   // You can change the configuration based on that.
  //   // 'PRODUCTION' is used when building the static version of storybook.

  //   config.module.rules.map((rule) => {
  //     if (rule.oneOf) {
  //       rule.oneOf = rule.oneOf.slice().map((subRule) => {
  //         if (subRule.test instanceof RegExp && subRule.test.test('.scss')) {
  //           return {
  //             ...subRule,
  //             use: [
  //               ...subRule.use,
  //               {
  //                 loader: require.resolve('sass-resources-loader'),
  //                 options: {
  //                   resources: [
  //                     path.resolve(__dirname, '../src/styles/index.scss')
  //                   ]
  //                 }
  //               }
  //             ],
  //           }
  //         }
  //         return subRule;
  //       });
  //     }
  //     return rule;
  //   });

  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ['style-loader', 'css-loader', 'sass-loader'],
  //     include: path.resolve(__dirname, '../'),
  //   });
  //   return config;
  // },
  // typescript: {
  //   check: false,
  //   checkOptions: {},
  //   reactDocgen: 'react-docgen-typescript',
  //   reactDocgenTypescriptOptions: {
  //     shouldExtractLiteralValuesFromEnum: true,
  //     propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
  //   },
  // },
  core: {
    builder: 'webpack5',
  },
}