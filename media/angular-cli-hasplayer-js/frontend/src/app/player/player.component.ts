import {Component, OnInit, ViewChild} from '@angular/core';

// --TODO fix import
// import { MediaPlayer } from 'hasplayer.js';
declare const MediaPlayer: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @ViewChild('videoPlayer') myVideo: any;

  // --TODO fix type
  mediaPlayer: any;

  // --TODO test with HLS
  // stream = {
  //   url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  //   protocol: 'HLS'
  // };

  stream = {
    url: 'http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest'
  };

  ngOnInit() {

    this.mediaPlayer = new MediaPlayer();

    console.log(' Init! ');

    this.mediaPlayer.init(this.myVideo.nativeElement);
    this.mediaPlayer.load(this.stream);

  }

}
