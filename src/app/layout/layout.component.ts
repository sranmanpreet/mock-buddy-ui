import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Mock } from '../models/mock.model';

@Component({
  selector: 'mock-buddy-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mockDetailsSubject: Subject<Mock> = new Subject<Mock>();

  constructor() { }

  ngOnInit(): void {
  }

  setMockDetails(mock: Mock) {
    this.mockDetailsSubject.next(mock);
  }

}
