# angular-cli-hls-js

> The goal of this project is to create a simple Angular7 Player using hls-js library

## Frontend using @angular-cli

* Create the frontend project

```
$ ng new frontend --style=scss && cd $_
```

* Add hls.js libraries to the npm project

```
$ npm install --save hls.js
$ npm install --save-dev @types/hls.js
```

* Add hls.js library to @angular-cli config file
```
      "scripts": [
        "node_modules/hls.js/dist/hls.min.js"
      ],
```

* Add a player component
```
$ ng generate component Player
```


## Documentation

* EME (Encrypted Media Extensions)

https://www.w3.org/TR/encrypted-media/

* MES (Media Source Extensions)

https://www.w3.org/TR/media-source/


https://stackoverflow.com/questions/30912542/mp4-to-hls-using-ffmpeg

```
$ ffmpeg  -i output/TIAr0000000196Al0000000001So0000006243.mp4 \
          -c:v h264 -flags +cgop -g 30 -hls_time 10 -hls_list_size 0 -f hls \ 
          hls/TIAr0000000196Al0000000001So0000006243/TIAr0000000196Al0000000001So0000006243.m3u8
```

https://github.com/video-dev/hls.js/issues/1254#issuecomment-322358053


```html
<html>
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<!-- Or if you want a more recent canary version -->
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script> -->
<body>
<video id="video" controls></video>
<script>
  var source = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
  var video = document.getElementById('video');
  if(Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource( source );
    hls.attachMedia(video);
 }
 // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
 // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
 // This is using the built-in support of the plain video element, without using hls.js.
 // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
 // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = source;
  }
</script>
</body>
</html>
```
