import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbInputModule, NbIconModule, NbContextMenuModule, NbMenuModule, NbCardModule, NbRadioModule, NbSelectModule, NbAccordionComponent, NbAccordionModule, NbButtonModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { ContentPaneComponent } from './content-pane/content-pane.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListComponent,
    ContentPaneComponent,
    HeaderComponent,
    FooterComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbEvaIconsModule,
    NbInputModule,
    NbIconModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    NbRadioModule,
    NbSelectModule,
    NbAccordionModule,
    NbButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
