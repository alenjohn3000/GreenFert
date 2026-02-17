import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-reportsales',
  imports: [RouterModule, CommonModule,RouterModule],
  templateUrl: './reportsales.html',
  styleUrl: './reportsales.scss',
})
export class Reportsales {
  orders: any[] = [];
  totalOrders = 0;
  totalRevenue = 0;
  sentCount = 0;
  paidCount = 0;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.db.orderview().then((data: any) => {
      this.orders = Array.isArray(data) ? data : [];
      this.totalOrders = this.orders.length;
      this.totalRevenue = this.orders.reduce((sum, o) => sum + Number(o.totalamount || 0), 0);
      this.sentCount = this.orders.filter(o => o.status === 'sent').length;
      this.paidCount = this.orders.filter(o => o.status === 'paid').length;
      this.cdr.detectChanges();
    });
  }
}
