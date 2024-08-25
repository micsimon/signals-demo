export interface ArrayResponse<T> {
  count: number;
  results: T[];
}

export interface Film {
  title: string;
  url: string;
  rating?: number;
}

