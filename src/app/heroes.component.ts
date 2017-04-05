import {Component} from "@angular/core";
import {heroes, Hero} from "./data-model"

@Component(
  {
    selector: 'heroes',
    template: `
      <nav>
        <a *ngFor="let hero of heroes" (click)="select(hero)">{{hero.name}}</a>
      </nav>

      <div *ngIf="selectedHero">
        <hero-detail [hero]="selectedHero"></hero-detail>
      </div>
  `
  }
)
export class HeroesComponent{

  heroes = heroes;
  selectedHero;

  select(hero: Hero){
    this.selectedHero = hero;
  }

}
