import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as shaka from 'shaka-player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  // enabled CORS sources
  videoSource = 'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd';
  // videoSource = 'http://localhost:8000/stream/TIAr0000000196Al0000000001So0000006243/TIAr0000000196Al0000000001So0000006243.m3u8';
  // videoSource = 'http://localhost:8000/stream/jazz.mpd';
  // videoSource = '/stream/jazz/.mpd';

  player: any;

  constructor() {}

  /**
   * https://shaka-player-demo.appspot.com/docs/api/tutorial-basic-usage.html
   */
  ngOnInit() {

    shaka.polyfill.installAll();

    // this.player.getDebug().setLogToBrowserConsole(true);
    console.log(' Init! ');

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!

      const video: HTMLElement  = document.getElementById('video');
      this.player = new shaka.Player(video);
      this.player.load(this.videoSource);

    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }

  }

  toggleVideo(event: any) {

    console.log(' ready? ' + this.player.isReady());
    console.log(' hit! ' + this.player.duration());

  }

}
