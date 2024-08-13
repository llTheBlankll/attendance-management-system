import {inject, Injectable} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  breadcrumbs: MenuItem[] = [];

  constructor() {
  }

  addBreadcrumb(label: string, url: string = '', icon: string = '') {
    this.breadcrumbs.push({label: label, url: url, icon: icon});
  }

  clearBreadcrumbs() {
    this.breadcrumbs = [];
  }

  updateBreadcrumbs(newBreadcrumbs: MenuItem[]) {
    this.breadcrumbs = newBreadcrumbs;
  }
}
