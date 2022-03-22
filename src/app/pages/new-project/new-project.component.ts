import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-project',
  template: `
    <p>
      new-project works!
    </p>
  `,
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
