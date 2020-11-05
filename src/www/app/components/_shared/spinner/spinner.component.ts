// ---------------- libraries ---------------
import { Component } from '@angular/core';
import $ from 'jquery';
// ---------------- libraries ---------------


@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor() {
    
  }

  startLoading(text: string): void {

    text = (text == undefined ? '' : text);

    $('body > .spinner-overlay .progress-active').hide();
    $('body > .spinner-overlay .spinner').show();
    $('body .spinner-container').removeClass('progress-container');

    $('body > .spinner-overlay').addClass('active');
    $('body > .contents').addClass('overlay');

    $('body .spinner-container > .spinner-progress').css('width', '0');
    $('body .spinner-container > .spinner-text').html(text);

  }

  startProgress(progress: number, text: string): void {

    $('body > .spinner-overlay .progress-active').show();
    $('body > .spinner-overlay .spinner').hide();
    $('body .spinner-container').addClass('progress-container');

    $('body > .spinner-overlay').addClass('active');
    $('body > .contents').addClass('overlay');

    if (progress != undefined) {
      $('body .spinner-container > .spinner-progress').css('width', progress + '%');
    }

    if (text != undefined) {
      $('body .spinner-container > .spinner-text').html(text);
    }

  }

  resetProgress(): void {

    this.startProgress(0, '');

  }

  stopLoading(): void {

    $('body > .spinner-overlay').removeClass('active');
    $('body > .contents').removeClass('overlay');

    $('body .spinner-container > .spinner-text').html('');

  }

}