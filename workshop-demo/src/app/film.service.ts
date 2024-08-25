import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ArrayResponse, Film} from './models';

@Injectable({
              providedIn: 'root'
            })
export class FilmService {
  private _httpClient: HttpClient = inject(HttpClient);

  public getFilms(): Observable<Film[]> {
    return this._httpClient.get<ArrayResponse<Film>>('http://swapi.dev/api/films').pipe(
      map((response: ArrayResponse<Film>) => {
        return response.results;
      }));
  }
}
