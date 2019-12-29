# Encoding 

## :one: Install

:pushpin: Install [`MP4Box`](https://formulae.brew.sh/formula/gpac)

:bulb: Test if installed

```
% brew info gpac | grep nstalled 
Not installed
```

```
% brew install gpac
```

:pushpin: Install [`ffmpeg`](https://formulae.brew.sh/formula/ffmpeg)

```
% brew install ffmpeg
```



# :two: Roll

* go to `scripts` folder and generate the streaming files that will be located under `stream` folder

```
$ cd scripts; sh encode-all.sh
```


* Run the python server

```
$ python PythonServer.py
```


* Test using the below URL where IP is your host i.e. `localhost` or `192.168.1.100`

```
http://<IP>:8000
```

*  select any of these html files

|:hash:| Platform        | [Raw Dash](scripts/raw-dash.html) | [Raw Hls](scripts/raw-hls.html) | [MES Dash](scripts/mes-dash.html)| [MES Hls](scripts/mes-hls.html) |
|------|-----------------|-----------------------------------|---------------------------------|----------------------------------------|---------------------------------|
| 01   | Desktop/Chrome  | :x:                               | :x:                             | :heavy_check_mark: | :heavy_check_mark:  :movie_camera: |
| 02   | Desktop/Safari  | :x:                               | :heavy_check_mark: :sound:        | :heavy_check_mark: :sound: | :x: |
| 03   | iOS/Safari      | :x:                               | :heavy_check_mark: :movie_camera: | :x: | :heavy_check_mark:  :movie_camera: |
| 04   | Android/Chrome  | :x:                               | :x: | :heavy_check_mark: :sound: | :x:   |

# References:

MES: Media Source Extension

### :sound: <sup>audio only</sup>
### :movie_camera: <sup>audio/video</sup> 

https://caniuse.com/#feat=mediasource
