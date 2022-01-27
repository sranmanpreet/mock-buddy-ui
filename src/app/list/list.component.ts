import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NbDialogService, NbMenuBag, NbMenuService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mock } from '../models/mock.model';
import { MockService } from '../services/mock.service';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'mock-buddy-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  mocks!: Array<Mock>;
  contextMenuItems = [{ title: 'Export' },
  { title: 'Delete' },];
  @Output() mockDetailsEvent = new EventEmitter<Mock>();
  selectedIndex?: number = 0;
  unsubscribeAll$: Subject<void>;

  constructor(private mockService: MockService, private nbMenuService: NbMenuService, private dialogService: NbDialogService) {
    this.unsubscribeAll$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.mocks = this.mockService.getMocks();
    this.nbMenuService.onItemClick()
      .subscribe(
        (menuBag: NbMenuBag) => {
          switch (menuBag.item.title) {
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

  onAdd() {
    this.mockDetailsEvent.emit();
  }

  onSelect(mock: Mock, index: number) {
    this.selectedIndex = index;
    this.mockDetailsEvent.emit(mock);
  }

  exportMock(name: string) {
    console.log(name);
  }

  deleteMock(name: string) {
    for (let i = 0; i < this.mocks.length; i++) {
      if (this.mocks[i].name == name) {
        console.log("hellow");
        this.dialogService.open(AlertModalComponent, {
          context: {
            title: 'Delete?',
            description: "Are you sure you want to delete " + name + " ?",
          }, dialogClass: 'modal-medium',
        }).onClose.pipe(takeUntil(this.unsubscribeAll$))
          .subscribe(
            (response: Boolean) => {
              if (response) {
                this.mocks.splice(i, 1);
                this.mocks.length ? (this.mocks[i] ? this.mockDetailsEvent.emit(this.mocks[i]) : this.mockDetailsEvent.emit(this.mocks[i - 1])) : this.mockDetailsEvent.emit();
              }
            });
        return;
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

}
