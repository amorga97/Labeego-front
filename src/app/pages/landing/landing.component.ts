import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  linePath: any;
  linePathLength: any;
  mazePath: any;
  mazePathLength: any;

  constructor() {
    window.addEventListener('DOMContentLoaded', () => {
      this.linePath = document.querySelector('.line');
      this.linePathLength = this.linePath?.getTotalLength();
      this.linePath.style.strokeDasharray =
        this.linePathLength + ' ' + this.linePathLength;
      this.linePath.style.strokeDashoffset = this.linePathLength;

      this.mazePath = document.querySelector('.maze');
      this.mazePathLength = this.mazePath?.getTotalLength();
      this.mazePath.style.strokeDasharray =
        this.mazePathLength + ' ' + this.mazePathLength;
      this.mazePath.style.strokeDashoffset = this.mazePathLength;
    });

    window.addEventListener('scroll', () => {
      let scrollPercentage =
        document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);

      let drowLength = this.linePathLength * scrollPercentage;

      this.linePath.style.strokeDashoffset = this.linePathLength - drowLength;

      let mazeDrowLength = this.mazePathLength * (scrollPercentage * 1.7);

      this.mazePath.style.strokeDashoffset =
        this.mazePathLength - mazeDrowLength;
    });
  }

  ngOnInit(): void {
    'nothing';
  }
}
