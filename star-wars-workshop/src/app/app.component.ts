import { Component, inject, OnInit } from '@angular/core';

import { CharacterDTO } from './character.dto';
import { StarWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StarWarsService],
})
export class AppComponent implements OnInit {
  characters: CharacterDTO[] | undefined;
  selectedCharacter: CharacterDTO | undefined;

  femaleCount: number = 0;
  maleCount: number = 0;
  robotCount: number = 0;

  starWarsService = inject(StarWarsService);

  ngOnInit(): void {
    this.loadRandomCharacters();
  }

  loadRandomCharacters(): void {
    this.starWarsService.getRandomCharacters().subscribe({
      next: (data: CharacterDTO[]) => {
        this.characters = data;
        this.femaleCount = data.filter(
          (character) => character.gender === 'female'
        ).length;
        this.maleCount = data.filter(
          (character) => character.gender === 'male'
        ).length;
        this.robotCount = data.filter(
          (character) => character.gender === 'n/a'
        ).length;
      },
    });
  }

  selectCharacter(character: CharacterDTO): void {
    this.selectedCharacter = character;
  }
}
