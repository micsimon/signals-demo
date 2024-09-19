import {WritableSignal} from '@angular/core';

export interface ArrayResponse<T> {
  count: number;
  results: T[];
}

export interface Film {
  title: string;
  url: string;
  rating?: WritableSignal<number | undefined>;
}

export interface Rating {
  [key: string]: number
}
