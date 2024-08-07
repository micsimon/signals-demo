import { forkJoin, map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CharacterDTO } from './character.dto';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) {}

  getRandomCharacters(count: number = 3): Observable<CharacterDTO[]> {
    const requests: Observable<CharacterDTO>[] = [];
    for (let i = 0; i < count; i++) {
      const randomId = Math.floor(Math.random() * 83) + 1; // There are 83 characters in the API
      requests.push(this.http.get<CharacterDTO>(`${this.apiUrl}${randomId}/`));
    }

    return forkJoin(requests).pipe(
      map((characters) =>
        characters.map((character) => {
          const id = parseInt(character.url.split('/').reverse()[1]);
          return {
            ...character,
            id,
            image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
          };
        })
      )
    );
  }
}
