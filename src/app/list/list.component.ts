import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbMenuBag, NbMenuService } from '@nebular/theme';
import { Mock } from '../models/mock.model';
import { MockService } from '../services/mock.service';

@Component({
  selector: 'mock-buddy-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  mocks!: Array<Mock>;
  contextMenuItems = [{ title: 'Export'},
  { title: 'Delete'},];
  @Output() mockDetailsEvent = new EventEmitter<Mock>();

  constructor(private mockService: MockService, private nbMenuService: NbMenuService) { }

  ngOnInit(): void {
    this.mocks = this.mockService.getMocks();
    this.nbMenuService.onItemClick()
      .subscribe(
        (menuBag:NbMenuBag) => {
          switch(menuBag.item.title) {
            case 'Export': {
              this.exportMock(menuBag.tag);
              break;
            }
            case 'Delete': {
              this.deleteMock(menuBag.tag);
              break;
            }
            default:
          }
          
        }
      );
  }
  exportMock(name: string) {
    console.log(name);
  }
  deleteMock(name: string) {
    for(let i=0; i<this.mocks.length; i++){
      if(this.mocks[i].name==name){
        this.mocks.splice(i,1);
        return;
      }
    }
  }

}
