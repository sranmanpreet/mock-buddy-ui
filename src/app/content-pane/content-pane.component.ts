import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mock } from '../models/mock.model';
import { MockService } from '../services/mock.service';
import { contentTypes } from '../shared/content-types';
import { methods } from '../shared/methods';

@Component({
  selector: 'mock-buddy-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss']
})
export class ContentPaneComponent implements OnInit, OnDestroy {
  @Input() mockDetailsSubscriber!:Subject<Mock>;
  mock!:Mock;
  methods = methods;
  contentTypes = contentTypes;

  unsubscribeAll$: Subject<void>;

  constructor(private mockService: MockService) { 
    this.unsubscribeAll$ = new Subject<void>();
  }
  
  ngOnInit(): void {
    const mocks = this.mockService.getMocks();
    this.mock = mocks[0];
    this.mockDetailsSubscriber.pipe(takeUntil(this.unsubscribeAll$)).subscribe(data=> this.mock = data);
    
  }
  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

}
