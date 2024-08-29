import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {FilmCardComponent} from '../film-card/film-card.component';
import {LogService} from '../log.service';
import {ArrayResponse, Film, Rating} from '../models';
import {RatingService} from '../rating.service';
import {WorkshopDemoComponent} from './workshop-demo.component';
import SpyObj = jasmine.SpyObj;

describe('WorkshopDemoComponent', () => {
  let fixture: ComponentFixture<WorkshopDemoComponent>;
  let httpMock: HttpTestingController;
  let mockFilms: ArrayResponse<Film>;
  let mockRatings: Rating;
  let spyLogService: SpyObj<LogService>;
  let spyRatingService: SpyObj<RatingService>;
  let ratingsSubject: Subject<Rating>

  beforeEach(async () => {
    ratingsSubject = new Subject<Rating>();
    spyLogService = jasmine.createSpyObj('LogService', ['log']);
    spyRatingService = jasmine.createSpyObj('RatingService', ['updateRating'], {'ratings$': ratingsSubject.asObservable()});

    await TestBed.configureTestingModule({
                                           imports: [HttpClientTestingModule],
                                           providers: [
                                             {provide: LogService, useValue: spyLogService},
                                             {provide: RatingService, useValue: spyRatingService}
                                           ]
                                         }).compileComponents();

    fixture = TestBed.createComponent(WorkshopDemoComponent);
    httpMock = TestBed.inject(HttpTestingController);

    mockFilms = {
      count: 2,
      results: [
        createFilm(1, 'A New Hope', 'https://swapi.dev/api/films/1/'),
        createFilm(2, 'The Empire Strikes Back', 'https://swapi.dev/api/films/2/')
      ]
    };

    mockRatings = {
      'https://swapi.dev/api/films/1/': 5,
      'https://swapi.dev/api/films/2/': 4,
    };
  });

  afterEach(() => {
    httpMock.verify(); // Überprüfe, dass keine unvollendeten HTTP-Anfragen vorhanden sind
  });

  describe('Film/Rating-Übersicht', () => {

    // integrativer Test

    it('soll initial keine Kacheln darstellen', () => {
      const actual: HTMLDivElement[] = getFilmCards();

      expect(actual).toHaveSize(0);
    });

    it('soll nach einem Klick und der entsprechenden Response die Kacheln darstellen', () => {
      clickLoadFilmButton();
      defineFilmResponse();

      const actual: HTMLDivElement[] = getFilmCards();

      expect(actual).toHaveSize(mockFilms.results.length);
    });

    it('soll den FilmCardComponents die entsprechenden Filme übergeben', () => {
      clickLoadFilmButton();
      defineFilmResponse();

      const actual: DebugElement[] = fixture.debugElement.queryAll(By.directive(FilmCardComponent));

      mockFilms.results.forEach((film, index) => {
        const filmCardComponent: FilmCardComponent = actual[index].componentInstance as FilmCardComponent;
        expect(filmCardComponent.film).toEqual(film);
      });
    });

    it('soll nach einem Klick auf loadRatings die Ratings laden und diese mit den Filmen mergen', () => {
      clickLoadFilmButton()
      defineFilmResponse();

      ratingsSubject.next(mockRatings);
      fixture.detectChanges();

      const filmCardDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(FilmCardComponent));

      mockFilms.results.forEach((film, index) => {
        // Anpassung an Erwartung
        film.rating = mockRatings[film.url];

        const filmCardComponent: FilmCardComponent = filmCardDebugElements[index].componentInstance as FilmCardComponent;
        expect(filmCardComponent.film).toEqual(film);
      });
    });
  });

  describe('Film-Details', () => {

    // integrativer Test

    it('soll initial keine Film-Details anzeigen', () => {
      clickLoadFilmButton()
      defineFilmResponse();

      const actual: HTMLElement[] = getFilmDetails();

      expect(actual).toHaveSize(0);
    });

    it('soll nach einem Klick auf den Select-Button die jeweiligen Details anzeigen', () => {
      clickLoadFilmButton()
      defineFilmResponse();

      clickFirstSelectButton();

      const actual: HTMLElement[] = getFilmDetails();

      expect(actual).toHaveSize(1);
      expect(actual[0].textContent).toContain('A New Hope');
    });

  });

  describe('Log-Details', () => {

    // Test auf Basis eines Services-Spys

    it('soll keinen Service-Call durchführen', () => {
      clickLoadFilmButton()
      defineFilmResponse();

      expect(spyLogService.log).toHaveBeenCalledTimes(0);
    });

    it('soll nach einem Klick auf den Select-Button den Service-Call durchführen', () => {
      clickLoadFilmButton()
      defineFilmResponse();

      clickFirstSelectButton();

      expect(spyLogService.log).toHaveBeenCalledOnceWith('View Details for A New Hope');
    });
  });

  function getLoadFilmsButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('#load-films-btn');
  }

  function getLoadRatingsButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('#load-ratings-btn');
  }

  function getSelectButtons(): HTMLButtonElement[] {
    return fixture.nativeElement.querySelectorAll('.select-btn');
  }

  function getFilmDetails(): HTMLElement[] {
    return fixture.nativeElement.querySelectorAll('app-film-details');
  }

  function clickLoadFilmButton(): void {
    getLoadFilmsButton().click();
    fixture.detectChanges();
  }

  function clickFirstSelectButton(): void {
    getSelectButtons()[0].click();
    fixture.detectChanges();
  }

  function getFilmCards(): HTMLDivElement[] {
    return fixture.nativeElement.querySelectorAll('app-film-card');
  }

  function createFilm(id: number, title: string, url: string, rating?: number): Film {
    return {
      id: id,
      title: title,
      url: url,
      rating: rating
    } as Film
  }

  function defineFilmResponse() {
    const req = httpMock.expectOne('http://swapi.dev/api/films');
    expect(req.request.method).toBe('GET');
    req.flush(mockFilms);
    fixture.detectChanges();
  }

})
