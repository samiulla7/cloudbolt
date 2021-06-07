import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatIconRegistry,
  MatDialogModule,
  MatSidenavModule,
  MatCardModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatRadioModule,
  MatListModule,
  MatCheckboxModule,
  MatTableModule,
  MatSelectModule,
  MatSliderModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatChipsModule,
  MatPaginatorModule,
  MatSortModule
} from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatRadioModule,
    MatListModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [],
  providers: [MatIconRegistry],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatRadioModule,
    MatListModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MaterialThemeModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias("fontawesome", "fa");
  }
}
