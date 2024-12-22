export class SortRequest {
  sortBy: string = 'id';
  sortDirection: 'Ascending' | 'Descending' = 'Ascending';

  constructor(sortBy?: string, sortDirection?: 'Ascending' | 'Descending') {
    this.sortBy = sortBy || 'id';
    this.sortDirection = sortDirection || 'Ascending';
  }
}
