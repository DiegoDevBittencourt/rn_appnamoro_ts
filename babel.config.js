module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: 'src',
          },
          {
            rootPathPrefix: '@assets/',
            rootPathSuffix: 'src/assets',
          },
          {
            rootPathPrefix: '@components/',
            rootPathSuffix: 'src/components',
          },
          {
            rootPathPrefix: '@config/',
            rootPathSuffix: 'src/config',
          },
          {
            rootPathPrefix: '@constants/',
            rootPathSuffix: 'src/constants',
          },
          {
            rootPathPrefix: '@database/',
            rootPathSuffix: 'src/database',
          },
          {
            rootPathPrefix: '@helpers/',
            rootPathSuffix: 'src/helpers',
          },
          {
            rootPathPrefix: '@modals/',
            rootPathSuffix: 'src/modals',
          },
          {
            rootPathPrefix: '@routes/',
            rootPathSuffix: 'src/routes',
          },
          {
            rootPathPrefix: '@sanitizer/',
            rootPathSuffix: 'src/sanitizer',
          },
          {
            rootPathPrefix: '@screens/',
            rootPathSuffix: 'src/screens',
          },
          {
            rootPathPrefix: '@services/',
            rootPathSuffix: 'src/services',
          },
          {
            rootPathPrefix: '@store/',
            rootPathSuffix: 'src/store',
          },
          {
            rootPathPrefix: '@utils/',
            rootPathSuffix: 'src/utils',
          },
        ],
      },
    ],
  ],
};
