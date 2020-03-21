import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import Hls from 'hls.js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  // enabled CORS sources
  videoSource = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  // videoSource = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'; // NO CORS
  // videoSource = 'http://localhost:8000/stream/TIAr0000000196Al0000000001So0000006243/TIAr0000000196Al0000000001So0000006243.m3u8';

  @ViewChild('videoPlayer', {static: false}) myVideo: HTMLMediaElement;

  player: Hls;

  ngOnInit() {
    this.player = new Hls();

    console.log(' Init! ');

    if (Hls.isSupported()) {
      // used only with MES Extensions
      this.player.attachMedia(this.myVideo);
      this.player.loadSource( this.videoSource );
    }

  }

  public toggleVideo(event: any) {


    console.log(' ready? ' + this.player.levels.keys());
    // console.log(' hit! ' + this.player.media.duration);

  }


}
