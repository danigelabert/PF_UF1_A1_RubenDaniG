import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import { AuthServiceService } from "../auth-service.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private sanitizer: DomSanitizer, public userService: AuthServiceService, private http: HttpClient) {}

  ngOnInit(): void {
    this.socket = io.connect('http://localhost:3000');
    this.setupSocket();
    this.getUserLogged();
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

        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', token || '');

        let videoUrl: string;

        switch (this.idButton) {
          case 'ibaiButton':
            videoUrl = 'http://localhost:3000/videos/ibai';
            break;
          case 'illoJuanButton':
            videoUrl = 'http://localhost:3000/videos/illo';
            break;
          case 'auronButton':
            videoUrl = 'http://localhost:3000/videos/auron';
            break;
          default:
            console.error('ID de botón no reconocido');
            return;
        }

        this.http.get(videoUrl, { headers, responseType: 'blob' }).subscribe(
          response => {
            const videoBlob = new Blob([response], { type: 'video/mp4' });
            this.videoSource = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(videoBlob));
          },
          error => {
            console.error('Error al obtener el video:', error);
            // Manejar errores al obtener el video
          }
        );
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  }

  playVideo(id: string) {
    this.socket.emit('sendPIN');
    this.idButton = id;
    this.reproduciendo = false;
    this.demanarCodi = true;
  }

  getUserLogged() {
    this.userService.getUser().subscribe((user) => {
      console.log(user);
    });
  }
}
