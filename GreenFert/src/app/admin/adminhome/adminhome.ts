import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { DbService } from '../../db-service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-adminhome',
  imports: [RouterModule,CommonModule],
  templateUrl: './adminhome.html',
  styleUrl: './adminhome.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Adminhome implements AfterViewInit {

  stats: any = {};
  recentOrders: any[] = [];
  recentWaste: any[] = [];
  topProducts: any[] = [];
  lowStock: any[] = [];
  topCollectors: any[] = [];
  chartOrders: any[] = [];
  chartWaste: any[] = [];
  searchTerm = '';
  filterMode: 'month' | 'year' | 'range' | 'all' = 'month';
  filterFrom = '';
  filterTo = '';
  filterMonth: string = '';
  filterYear: string = '';
  years: number[] = [];
  showFilter = false;
  @ViewChild('filterBox') filterBox?: ElementRef;
  private barChart?: Chart;
  private donutChart?: Chart;

  quickActions = [
    { title: 'Add District', route: '/adminmaster/district' },
    { title: 'Add Location', route: '/adminmaster/location' },
    { title: 'Add Category', route: '/adminmaster/pcategory' },
    { title: 'Register Collector', route: '/adminmaster/wcregister' },
    { title: 'Add Product', route: '/adminmaster/product' },
    { title: 'Assign Collector', route: '/adminmaster/wcassign' }
  ];

  constructor(
    private db: DbService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const now = new Date();
    const currentYear = now.getFullYear();
    this.years = Array.from({ length: 6 }, (_, i) => currentYear - i);
    this.filterMonth = String(now.getMonth() + 1);
    this.filterYear = String(currentYear);
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  loadDashboard() {
    this.db.admindashboard({
      range: this.filterMode,
      from: this.filterFrom,
      to: this.filterTo,
      month: this.filterMonth,
      year: this.filterYear
    }).then((data: any) => {
      this.stats = data.stats;
      this.recentOrders = data.recentOrders;
      this.recentWaste = data.recentWaste;
      this.topProducts = data.topProducts || [];
      this.lowStock = data.lowStock || [];
      this.topCollectors = data.topCollectors || [];
      this.chartOrders = data.chartOrders || [];
      this.chartWaste = data.chartWaste || [];

      this.cdr.detectChanges();

      // ensure charts render after data binding
      this.initCharts();
    });
  }

  refresh() {
    this.loadDashboard();
  }

  viewAll(route: string) {
    if (!route) return;
    this.router.navigate([route]);
  }

  onSearch(evt: any) {
    const val = (evt?.target?.value || '').toString().trim().toLowerCase();
    this.searchTerm = val;
  }

  setFilterMode(mode: 'month' | 'year' | 'range' | 'all') {
    this.filterMode = mode;
    if (mode === 'all') {
      this.filterFrom = '';
      this.filterTo = '';
      this.filterMonth = '';
      this.filterYear = '';
    }
    this.loadDashboard();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    if (!this.showFilter) return;
    const target = event.target as Node;
    const box = this.filterBox?.nativeElement as HTMLElement | undefined;
    if (box && !box.contains(target)) {
      this.showFilter = false;
    }
  }

  onDateChange(which: 'from' | 'to', evt: any) {
    const val = (evt?.target?.value || '').toString();
    if (which === 'from') this.filterFrom = val;
    if (which === 'to') this.filterTo = val;
    this.filterMode = (this.filterFrom && this.filterTo) ? 'range' : this.filterMode;
    this.loadDashboard();
  }

  onMonthYearChange(which: 'month' | 'year', evt: any) {
    const val = (evt?.target?.value || '').toString();
    if (which === 'month') this.filterMonth = val;
    if (which === 'year') this.filterYear = val;
    if (this.filterMonth && this.filterYear) this.filterMode = 'month';
    if (!this.filterMonth && this.filterYear) this.filterMode = 'year';
    this.loadDashboard();
  }

  setAllTime() {
    this.filterMode = 'all';
    this.filterFrom = '';
    this.filterTo = '';
    this.filterMonth = '';
    this.filterYear = '';
    this.loadDashboard();
  }

  get filteredOrders() {
    if (!this.searchTerm) return this.recentOrders;
    return this.recentOrders.filter(o =>
      String(o.order_id || '').toLowerCase().includes(this.searchTerm) ||
      String(o.customername || '').toLowerCase().includes(this.searchTerm) ||
      String(o.status || '').toLowerCase().includes(this.searchTerm)
    );
  }

  get filteredWaste() {
    if (!this.searchTerm) return this.recentWaste;
    return this.recentWaste.filter(w =>
      String(w.shopname || '').toLowerCase().includes(this.searchTerm) ||
      String(w.collectorname || '').toLowerCase().includes(this.searchTerm)
    );
  }

  formatNumber(v: any) {
    if (v == null || v === '') return '-';
    return new Intl.NumberFormat('en-IN').format(v);
  }

  exportOrdersCSV() {
    if (!this.recentOrders || !this.recentOrders.length) return alert('No orders to export');
    const rows = [Object.keys(this.recentOrders[0])].concat(this.recentOrders.map((r:any)=>Object.values(r)));
    const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recent-orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportWasteCSV() {
    if (!this.recentWaste || !this.recentWaste.length) return alert('No waste records to export');
    const rows = [Object.keys(this.recentWaste[0])].concat(this.recentWaste.map((r:any)=>Object.values(r)));
    const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waste-collection.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  initCharts() {

    const barCanvas = document.getElementById('ordersWasteChart') as HTMLCanvasElement;
    const pieCanvas = document.getElementById('revenueChart') as HTMLCanvasElement;

    if (!barCanvas || !pieCanvas) return;

    const customerCount = this.stats?.customers || 0;
    const shopownerCount = this.stats?.shopowners || 0;
    const collectorCount = this.stats?.collectors || 0;

    const orderLabels = (this.chartOrders || []).map((x: any) => x.label).reverse();
    const wasteLabels = (this.chartWaste || []).map((x: any) => x.label).reverse();
    const labels = orderLabels.length ? orderLabels : wasteLabels;
    const orderData = (this.chartOrders || []).map((x: any) => Number(x.orders || 0)).reverse();
    const wasteData = (this.chartWaste || []).map((x: any) => Number(x.waste || 0)).reverse();

    if (this.barChart) this.barChart.destroy();
    if (this.donutChart) this.donutChart.destroy();

    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['No Data'],
        datasets: [
          {
            label: 'Orders',
            data: orderData.length > 0 ? orderData : [0],
            backgroundColor: '#2fbf71',
            borderRadius: 8,
            borderSkipped: false
          },
          {
            label: 'Waste (kg)',
            data: wasteData.length > 0 ? wasteData : [0],
            backgroundColor: '#f4a259',
            borderRadius: 8,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 14, font: { size: 12, weight: 'bold' }, color: '#0f2a1f', padding: 14 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#5f6b63', font: { size: 11 } },
            grid: { color: 'rgba(0,0,0,0.03)' }
          },
          x: {
            ticks: { color: '#5f6b63', font: { size: 11 } },
            grid: { display: false }
          }
        }
      }
    });

    this.donutChart = new Chart(pieCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Customers', 'Shop Owners', 'Collectors'],
        datasets: [{
          data: [customerCount, shopownerCount, collectorCount],
          backgroundColor: ['#2fbf71', '#f4a259', '#0ea5a0'],
          borderColor: '#ffffff',
          borderWidth: 4,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 14, font: { size: 12, weight: 'bold' }, color: '#0f2a1f', padding: 14 }
          }
        }
      }
    });
  }
}
