# angular-cli-dash-js

> The goal of this project is to create a simple Angular2 Player using hasplayer.js library

## Frontend using @angular-cli

* Create the frontend project
```
$ ng new frontend --style=scss
```

* Create the player component
```
$ cd frontend; ng generate component player
```

* Add dashjs library to the npm project
```
$ npm install --save hasplayer.js
```

* Add dashjs library to @angular-cli
```
      "scripts": [
        "../node_modules/hasplayer.js/dist/hasplayer.min.js"
      ],
```

## Documentation

* EME (Encrypted Media Extensions)

https://www.w3.org/TR/encrypted-media/

* MPEG-DASH sample streams and HLS test streams

https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/

* MP4Box -dash create HLS m3u8 for fragmented MP4

https://github.com/gpac/gpac/issues/772

https://github.com/gpac/gpac/pull/784


