import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-a1',
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.css']
})
export class A1Component implements OnInit {
  videoSource = '';
  socket: any;
  counter: any;
  reproducir: boolean = false;

  ngOnInit(): void {
    // Reemplaza 'http://localhost:3000' con la URL de tu servidor Node.js
    this.socket = io.connect('http://localhost:3000');
    this.setupSocket();
  }

  setupSocket() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
    });

    this.socket.on('counter', (counter: number) => {
      console.log('Recibido contador del servidor:', counter);
      // Actualiza la propiedad counter con el valor recibido
      this.counter = counter;
    });

    this.socket.on('reproduirVideo', (reproduir: boolean)=>{
      this.reproducir=reproduir
    })

    this.socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  }

  playVideo(videoSource: string) {
    // Emite 'sendPIN' al servidor
    this.socket.emit('sendPIN');
    this.videoSource = videoSource
  }

  onClickButton() {
    // Lógica para enviar un evento al servidor cuando se hace clic en el botón
    // Puedes quitar esto si no necesitas enviar 'sendPIN' desde aquí
    this.socket.emit('sendPIN');
  }
}
