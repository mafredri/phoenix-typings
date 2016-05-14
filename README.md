# Typed Phoenix Typings

[`phoenix-typings`](https://github.com/mafredri/phoenix-typings) is the type definition for [Phoenix](https://github.com/kasper/phoenix).

## Installing

```
npm install -g typescript typings tslint

# Inside project
npm install --save typescript typings tslint
typings init
typings install github:mafredri/phoenix-typings --ambient --save
```

## Using

Typings for the DOM conflict with these typings, this means you will want to ignore `lib.dom.d.ts` (`lib.d.ts` includes `lib.dom.d.ts` which makes it unsuitable as well).

Do this by using the `compilerOptions/noLib` property and explicitly specifying which `files` to include in your `tsconfig.json`.

Here's a simple example `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "out",
    "noLib": true,
    "target": "es5"
  },
  "files": [
    "node_modules/typescript/lib/lib.core.es7.d.ts",
    "typings/main.d.ts",
    "phoenix.ts"
  ]
}
```

**NOTE:** Using imports will *require* (pun intended) some workarounds, see [loader.js](https://github.com/mafredri/phoenix-config/blob/fd1e123787e334301a9279f6484b8d144882f2a1/src/js/loader.js) and [tsconfig.js](https://github.com/mafredri/phoenix-config/blob/fd1e123787e334301a9279f6484b8d144882f2a1/tsconfig.json) for an example of using AMD-style modules.

## License

The MIT License.
