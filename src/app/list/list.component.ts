import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Output() getMock = new EventEmitter<Mock>();
  @Output() deleteMock = new EventEmitter<Mock>();
  @Input() mocks!: Array<Mock>;
  @Input() mockForm!: FormGroup;
  contextMenuItems = [{ title: 'Export' },
  { title: 'Delete' }];
  @Input() selectedMock!: Mock;
  searchText: string = '';
  
  unsubscribeAll$: Subject<void>;

  constructor(private mockService: MockService, private nbMenuService: NbMenuService, private dialogService: NbDialogService) {
    this.unsubscribeAll$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .subscribe(
        (menuBag: NbMenuBag) => {
          switch (menuBag.item.title) {
            case 'Export': {
              this.exportMock(menuBag.tag);
              break;
            }
            case 'Delete': {
              this.onDeleteMock(menuBag.tag);
              break;
            }
            default:
          }

        }
      );
  }

  onAdd() {
    this.getMock.emit();
  }

  onSelect(mock: Mock) {
    if(this.mockForm.dirty && this.selectedMock.name != mock.name) {
      this.dialogService.open(AlertModalComponent, {
        context: {
          title: 'Are you sure?',
          description: "Are you sure you want to navigate to " + mock.name + "  and discard unsaved changes?",
        }, dialogClass: 'modal-medium',
      }).onClose.pipe(takeUntil(this.unsubscribeAll$))
        .subscribe(
          (response: Boolean) => {
            if (response) {
              this.selectedMock = mock;
              this.getMock.emit(mock);
            }
          });
    } else {
      this.selectedMock = mock;
      this.getMock.emit(mock);
    }
  }

  exportMock(name: string) {
    console.log(name);
  }

  onDeleteMock(name: string) {
    for (let i = 0; i < this.mocks.length; i++) {
      if (this.mocks[i].name == name) {
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
                this.mocks.length ? (this.mocks[i] ? this.deleteMock.emit(this.mocks[i]) : this.deleteMock.emit(this.mocks[i - 1])) : this.deleteMock.emit();
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
