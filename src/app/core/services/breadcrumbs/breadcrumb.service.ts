import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: MenuItem[] = [];

  constructor() {}

  addBreadcrumb(label: string, url: string = '', icon: string = '') {
    this.breadcrumbs.push({ label: label, url: url, icon: icon });
  }

  clearBreadcrumbs() {
    this.breadcrumbs = [];
  }

  updateBreadcrumbs(newBreadcrumbs: MenuItem[]) {
    this.breadcrumbs = newBreadcrumbs;
  }
}
