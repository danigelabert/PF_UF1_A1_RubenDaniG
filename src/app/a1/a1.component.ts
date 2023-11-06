import { Component } from '@angular/core';

@Component({
  selector: 'app-a1',
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.css']
})
export class A1Component {
  videoContainerVisible = false;
  videoSource = '';

  playVideo(videoSource: string) {
    this.videoSource = videoSource;
    this.videoContainerVisible = true;
  }
}


