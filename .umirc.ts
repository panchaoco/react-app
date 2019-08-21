import { IConfig } from 'umi-types';
const path = require('path');

// ref: https://umijs.org/config/
const config =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'my-test-app',
      dll: false,
      pwa: {
        manifestOptions: {
          // 默认值为 'src/manifest.json'
          srcPath: 'public/manifest.json'
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          importWorkboxFrom: 'local',
          // 默认值为 'src/service-worker.js'
          swSrc: 'public/service-worker.js'
        }
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],


}

export default config;
