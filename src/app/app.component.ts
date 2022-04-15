import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'canvas-scolling';

  @ViewChild('picture', {static: false}) picture: ElementRef;

  constructor() {
    this.yOffset = 10;
    this.sideLength = 80;
    this.totalSize = 100;
  }

  public context: CanvasRenderingContext2D;
  viewInitialized = false;
  zooming = true;
  yOffset: number;
  sideLength: number;
  totalSize;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.context = (this.picture.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();
  }

  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent) {
    if (this.zooming) {
      this.sideLength = this.sideLength - event.deltaY;
      this.draw();
    } else {
      this.yOffset = this.yOffset - event.deltaY;
      this.draw();
    }
  }

  private draw() {
    this.context.save();
    this.context.clearRect(0, 0, this.totalSize, this.totalSize);
    this.context.fillStyle = 'rgb(0,200,20)';
    this.context.fillRect(0, this.yOffset, this.sideLength, this.sideLength);
    this.context.restore();
  }
}
