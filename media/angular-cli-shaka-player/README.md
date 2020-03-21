# angular-cli-shaka-player

> The goal of this project is to create a simple Angular2 Player using ShakaPlayer library

## Frontend using @angular-cli

* Create the frontend project
```
$ ng new frontend --style=scss
```

* Add Shaka Player library to the npm project
```
$ npm install shaka-player @angular-devkit/core@latest
```

* Add Shaka Player library to @angular-cli
```
      "scripts": [
        "../node_modules/shaka-player/dist/shaka-player.compiled.js"
      ],
```

* Create a Player component using angular-cli scaffold

```
$ ng generate component player
```

## Documentation

* EME (Encrypted Media Extensions)

https://www.w3.org/TR/encrypted-media/

* MES (Media Source Extensions)

https://www.w3.org/TR/media-source/
