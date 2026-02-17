import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbService } from '../../db-service';
import { CommonModule } from '@angular/common';
type WasteCategory = 'foodwaste' | 'mixed' | 'organic';


@Component({
  selector: 'app-wcdetails',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './wcdetails.html',
  styleUrl: './wcdetails.scss',
})
export class Wcdetails {
  /* COLLECTOR LIST (used in HTML) */
  public collectors: any[] = [];

  /* CATEGORY TOTALS (used in stats cards) */
  public categoryTotal: Record<WasteCategory, number> = {
    foodwaste: 0,
    mixed: 0,
    organic: 0
  };
  filterform!: FormGroup;
  savestatus=false;
  /* DATE FILTER */
  public selectedDate = new Date().toISOString().split('T')[0];

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.viewdata();
    this.filterform = this.fb.group({
      filterdate: ['',[Validators.required]]
    })
  }

  /* FETCH + PROCESS DATA */
  viewdata(): void {

    this.db.wcdd({ date: this.selectedDate }).then((res: any) => {

      /* RESET */
      this.collectors = [];
      this.categoryTotal = { foodwaste: 0, mixed: 0, organic: 0 };

      /* CATEGORY TOTALS */
      if (res.categories && Array.isArray(res.categories)) {
        res.categories.forEach((c: any) => {
          const key = c.wcategory.toLowerCase() as WasteCategory;

          if (this.categoryTotal[key] !== undefined) {
            this.categoryTotal[key] = Number(c.total);
          }
        });
      }

      /* COLLECTORS */
      if (res.collectors && Array.isArray(res.collectors)) {
        res.collectors.forEach((c: any) => {
          this.collectors.push({
            wastecollector_id: c.wastecollector_id,
            collectorname: c.collectorname,
            locationname: c.locationname,
            districtname: c.districtname,
            collecteddate: this.selectedDate,
            total: Number(c.total),
            categories: c.categories
              ? c.categories.split(',').map((x: string) => ({
                type: x.toLowerCase()
              }))
              : []
          });
        });
      }

      this.cdr.detectChanges();
    });
  }
  applyfilter() {
    if (!this.filterform.valid) {
      this.savestatus = true;
      return;
    }
    this.db.wcdd({ date: this.filterform.value.filterdate }).then((res: any) => {
      this.selectedDate = this.filterform.value.filterdate;
      /* RESET */
      this.collectors = [];
      this.categoryTotal = { foodwaste: 0, mixed: 0, organic: 0 };

      /* CATEGORY TOTALS */
      if (res.categories && Array.isArray(res.categories)) {
        res.categories.forEach((c: any) => {
          const key = c.wcategory.toLowerCase() as WasteCategory;
          console.log(key)
          if (this.categoryTotal[key] !== undefined) {
            this.categoryTotal[key] = Number(c.total);
            console.log(this.categoryTotal)
          }
        });
      }

      /* COLLECTORS */
      if (res.collectors && Array.isArray(res.collectors)) {
        res.collectors.forEach((c: any) => {
          this.collectors.push({
            wastecollector_id: c.wastecollector_id,
            collectorname: c.collectorname,
            locationname: c.locationname,
            districtname: c.districtname,
            collecteddate: this.selectedDate,
            total: Number(c.total),
            categories: c.categories
              ? c.categories.split(',').map((x: string) => ({
                type: x.toLowerCase()
              }))
              : []
          });
          console.log(this.collectors)
        });
      }
      this.cdr.detectChanges();
    });
  }
}
