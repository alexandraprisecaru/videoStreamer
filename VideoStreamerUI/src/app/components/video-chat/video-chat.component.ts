import { Component, OnInit, ViewChild } from '@angular/core';

declare var SimplePeer: any;

@Component({
  selector: 'video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
  myVideo: HTMLVideoElement;
  @ViewChild('myvideo') set matVideo(matVideo: HTMLVideoElement) {
    if (matVideo) { // initially setter gets called with undefined
      this.myVideo = matVideo;
    }
  }

  targetpeer: any;
  peer: any;
  n = <any>navigator;

  ngOnInit() {
    let video = this.myVideo;
    let peerx: any;
    this.n.getUserMedia = (this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.msGetUserMedia);
    this.n.getUserMedia({ video: true, audio: true }, function (stream) {
      peerx = new SimplePeer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
      })

      peerx.on('signal', (data) => {
        console.log(JSON.stringify(data));

        this.targetpeer = data;
      })

      peerx.on('data', (data) => {
        console.log('Recieved message:' + data);
      })

      peerx.on('stream', (stream) => {
        // video.src = URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
      })

    }, (err) => {
      console.log('Failed to get stream', err);
    });

    setTimeout(() => {
      this.peer = peerx;
      console.log(this.peer);
    }, 5000);


    // // cope with browser differences
    // let audioContext;
    // if (typeof AudioContext === 'function') {
    //   audioContext = new AudioContext();
    // } else if (typeof webkitAudioContext === 'function') {
    //   audioContext = new webkitAudioContext(); // eslint-disable-line new-cap
    // } else {
    //   console.log('Sorry! Web Audio not supported.');
    // }

    // // create a filter node
    // var filterNode = audioContext.createBiquadFilter();
    // // see https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#BiquadFilterNode-section
    // filterNode.type = 'highpass';
    // // cutoff frequency: for highpass, audio is attenuated below this frequency
    // filterNode.frequency.value = 10000;

    // // create a gain node (to change audio volume)
    // var gainNode = audioContext.createGain();
    // // default is 1 (no change); less than 1 means audio is attenuated
    // // and vice versa
    // gainNode.gain.value = 0.5;

    // navigator.mediaDevices.getUserMedia({ audio: true }, (stream) => {
    //   // Create an AudioNode from the stream
    //   const mediaStreamSource =
    //     audioContext.createMediaStreamSource(stream);
    //   mediaStreamSource.connect(filterNode);
    //   filterNode.connect(gainNode);
    //   // connect the gain node to the destination (i.e. play the sound)
    //   gainNode.connect(audioContext.destination);
    // });



  }

  connect() {
    this.peer.signal(JSON.parse(this.targetpeer));
  }

  message() {
    this.peer.send('Hello world');
  }
}
