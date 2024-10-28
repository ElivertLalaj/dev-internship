import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppModule, AngularMaterialModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dev-intership';
  squareColor: string = 'lightblue';
  clickCount: number = 0;
  undocolor: string[] = [];
  redocolor: string[] = [];
  lastUndoColor: string | null = null;
  lastRedoColor: string | null = null;

  isOpenUndo = false;
  isOpenRedo = false;


  trackItem(index: number, item: string): string {
    return item;
  }
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateLargeBoxes();
  }

  ClickChangeColor(): void {
    this.clickCount++;
    const newColor = this.RandomColor();

    if (this.squareColor) {
      this.undocolor.unshift(this.squareColor);
      this.lastUndoColor = this.undocolor[0];
    }

    this.squareColor = newColor;
    this.redocolor = [];
    this.lastRedoColor = null;

    this.updateLargeBoxes();
  }

  RandomColor(): string {
    let color;
    let isInvalidColor;

    do {
      color = '#';
      const letters = '0123456789ABCDEF';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      const red = parseInt(color.slice(1, 3), 16);
      const green = parseInt(color.slice(3, 5), 16);
      const blue = parseInt(color.slice(5, 7), 16);

      const isGray = Math.abs(red - green) < 20 && Math.abs(green - blue) < 20;
      const isWhite = red > 240 && green > 240 && blue > 240;
      const isBlack = red < 15 && green < 15 && blue < 15;
      const brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
      const isDark = brightness < 0.3;

      isInvalidColor = isGray || isWhite || isBlack || isDark;
    } while (isInvalidColor);

    return color;
  }

  onUndoClick() {
    if (this.undocolor.length > 0) {
      const lastUndoColor = this.undocolor.shift() || 'lightblue';
      if (this.squareColor) {
        this.redocolor.unshift(this.squareColor);
        this.lastRedoColor = this.redocolor[0];
      }
      this.squareColor = lastUndoColor;
      this.lastUndoColor = this.undocolor[0] || null;
    }
    this.updateLargeBoxes();
  }

  onRedoClick() {
    if (this.redocolor.length > 0) {
      const lastRedoColor = this.redocolor.shift() || 'lightblue';
      if (this.squareColor) {
        this.undocolor.unshift(this.squareColor);
        this.lastUndoColor = this.undocolor[0];
      }
      this.squareColor = lastRedoColor;
      this.lastRedoColor = this.redocolor[0] || null;
    }
    this.updateLargeBoxes();
  }

  updateLargeBoxes() {
    this.lastUndoColor = this.undocolor.length > 0 ? this.undocolor[0] : null;

    this.lastRedoColor = this.redocolor.length > 0 ? this.redocolor[0] : null;
  }
}
