import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  path: any;
  pathLength: any;
  constructor() {
    window.addEventListener('DOMContentLoaded', () => {
      console.log(document.querySelector('.line'));
      this.path = document.querySelector('path');
      this.pathLength = this.path?.getTotalLength();
      this.path.style.strokeDasharray = this.pathLength + ' ' + this.pathLength;

      this.path.style.strokeDashoffset = this.pathLength;
    });

    window.addEventListener('scroll', () => {
      let scrollPercentage =
        document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight);

      let drowLength = this.pathLength * scrollPercentage;

      this.path.style.strokeDashoffset = this.pathLength - drowLength;
    });
  }

  ngOnInit(): void {
    'nothing';
  }
}
