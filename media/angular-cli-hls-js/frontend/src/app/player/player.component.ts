import { Component, OnInit, ViewChild } from '@angular/core';

import * as Hls from 'hls.js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  // enabled CORS sources
  // videoSource = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
  videoSource = 'http://localhost:8000/stream/TIAr0000000196Al0000000001So0000006243/TIAr0000000196Al0000000001So0000006243.m3u8';

  @ViewChild('videoPlayer') myVideo: HTMLVideoElement;

  player: Hls;

  ngOnInit() {
    this.player = new Hls();

    console.log(' Init! ');

    if (Hls.isSupported()) {
      // used only with MES Extensions
      this.player.attachMedia(this.myVideo[ 'nativeElement' ]);
      this.player.loadSource( this.videoSource );
    }

  }

  public toggleVideo(event: any) {

    console.log(' ready? ' + this.player.media.readyState);
    console.log(' hit! ' + this.player.media.duration);

  }


}
