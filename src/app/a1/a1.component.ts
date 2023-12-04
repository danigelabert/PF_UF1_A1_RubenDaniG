import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-a1',
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.css']
})
export class A1Component implements OnInit {
  videoSource: SafeUrl = '';
  socket: any;
  counter: any;
  reproduciendo: boolean = false;
  idButton: string = ''
  demanarCodi: boolean = false

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.socket = io.connect('http://localhost:3000');
    this.setupSocket();
  }

  setupSocket() {
    this.socket.on('connect', () => {
      console.log('Conectant al servidor');
    });

    this.socket.on('counter', (counter: number) => {
      console.log('Recibido contador del servidor:', counter);
      this.counter = counter;
    });

    this.socket.on('reproduirVideo', (reproduir: boolean) => {
      this.reproduciendo = reproduir;
      if (this.reproduciendo) {
        console.log('Iniciar reproducción del video');
        this.demanarCodi = false

        if (this.idButton=="ibaiButton")
        this.videoSource = this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/videos/ibai');
        if (this.idButton=="illoJuanButton")
          this.videoSource = this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/videos/illo');
        if (this.idButton=="auronButton")
          this.videoSource = this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/videos/auron');
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  }

  playVideo(id: String) {
    this.socket.emit('sendPIN');
    // @ts-ignore
    this.idButton = id
    this.reproduciendo=false
    this.demanarCodi = true
    if (id == "ibai"){
      this.videoSource = this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/videos/ibai');
    } else if(id=="auron"){
      this.videoSource = this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/videos/auron');
    }else if(id=="illoJuan"){
      this.videoSource = this.sanitizer.bypassSecurityTrustUrl('http://localhost:3000/videos/illoJuan');
    }
  }
}
