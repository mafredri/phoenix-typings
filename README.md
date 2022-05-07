# Typed Phoenix Typings

[`phoenix-typings`](https://github.com/mafredri/phoenix-typings) is the type definition for [Phoenix](https://github.com/kasper/phoenix).

## Installing

```
# Inside project
yarn add 'github:mafredri/phoenix-typings#main'
```

## Using

Once `phoenix-typings` has been installed they are ready to be used with a correctly configured `tsconfig.json`. Care should be taken not to enable the TypeScript DOM library.

Here's a simple example `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node",
    "baseUrl": "src",
    "outDir": "out",
    "target": "ES2021",
    "strict": true,
    "types": ["phoenix"],
    "typeRoots": ["node_modules/@types"],
    "lib": ["ES2021"]
  },
  "exclude": [
    "node_modules"
  ]
}
```

**NOTE:** Phoenix does not support CommonJS type of `require`. In order to use `require` or ES2015 style `import`, webpack is highly recommended. For an example on how to set up webpack, see [mafredri/phoenix-config](https://github.com/mafredri/phoenix-config) with it's [`webpack.common.js`](https://github.com/mafredri/phoenix-config/blob/a4e36c1bdc2fa6c9e3f12e26e2f88073780ba8ec/webpack.common.js), [`webpack.prod.js`])(https://github.com/mafredri/phoenix-config/blob/a4e36c1bdc2fa6c9e3f12e26e2f88073780ba8ec/webpack.prod.js) and [`tsconfig.json`](https://github.com/mafredri/phoenix-config/blob/a4e36c1bdc2fa6c9e3f12e26e2f88073780ba8ec/tsconfig.json). Requires `webpack` and `ts-loader`.
