import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  linePath: any;
  linePathLength: any;
  mazePath: any;
  mazePathLength: any;

  constructor(@Inject(DOCUMENT) public document: Document) {
    window.addEventListener('DOMContentLoaded', () => {
      this.linePath = this.document.querySelector('.line');
      this.mazePath = this.document.querySelector('.maze');
      this.queryDocument(this.linePath, this.mazePath);
    });
    window.addEventListener('scroll', () => {
      this.configureScrollEffect();
    });
  }

  queryDocument(
    linePath: any,

    mazePath: any
  ) {
    this.linePathLength = linePath?.getTotalLength();
    linePath.style.strokeDasharray =
      this.linePathLength + ' ' + this.linePathLength;
    linePath.style.strokeDashoffset = this.linePathLength;

    this.mazePathLength = mazePath?.getTotalLength();
    mazePath.style.strokeDasharray =
      this.mazePathLength + ' ' + this.mazePathLength;
    mazePath.style.strokeDashoffset = this.mazePathLength;
  }

  configureScrollEffect() {
    let scrollPercentage =
      this.document.documentElement.scrollTop /
      (this.document.documentElement.scrollHeight -
        this.document.documentElement.clientHeight);

    let drowLength = this.linePathLength * scrollPercentage;

    this.linePath.style.strokeDashoffset = this.linePathLength - drowLength;

    let mazeDrowLength = this.mazePathLength * (scrollPercentage * 1.7);

    this.mazePath.style.strokeDashoffset = this.mazePathLength - mazeDrowLength;
  }
}
