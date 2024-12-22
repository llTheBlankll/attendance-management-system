export class PageRequest {
  pageNumber: number = 0;
  pageSize: number = 10;

  constructor(pageNumber?: number, pageSize?: number) {
    this.pageNumber = pageNumber || 0;
    this.pageSize = pageSize || 10;
  }
}
