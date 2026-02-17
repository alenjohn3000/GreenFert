import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbService } from '../../db-service';

@Component({
  selector: 'app-sorders',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sorders.html',
  styleUrl: './sorders.scss',
})
export class Sorders {
  orders: any[] = [];
  orderDetails: Record<number, any[]> = {};
  expanded: Record<number, boolean> = {};
  loading: boolean = true;

  totalOrders = 0;
  totalSpent = 0;
  sentCount = 0;
  paidCount = 0;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.db.customerorderview({ loginid: localStorage.getItem('login_id') }).then((data: any) => {
      this.orders = Array.isArray(data) ? data : [];
      this.totalOrders = this.orders.length;
      this.totalSpent = this.orders.reduce((sum: number, o: any) => sum + Number(o.totalamount || 0), 0);
      this.sentCount = this.orders.filter((o: any) => o.status === 'sent').length;
      this.paidCount = this.orders.filter((o: any) => o.status === 'paid').length;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  async toggleDetails(orderId: number) {
    this.expanded[orderId] = !this.expanded[orderId];

    if (this.expanded[orderId] && !this.orderDetails[orderId]) {
      const data: any = await this.db.ordermview({ orderid: orderId });
      this.orderDetails[orderId] = Array.isArray(data) ? data : [];
      this.cdr.detectChanges();
    }
  }

  getStatusLabel(status: string): string {
    if (status === 'sent') return 'Out for Delivery';
    if (status === 'paid') return 'Order Confirmed';
    return status || 'Unknown';
  }
}
