import {Validators, FormBuilder, FormGroup, FormArray, FormControl} from "@angular/forms";
import {Component, OnChanges, Input, SimpleChanges} from "@angular/core";
import {states, heroes, Address, Hero} from "./data-model"
import {Observable} from "rxjs";

@Component(
  {
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html'
  }
)
export class HeroDetailComponent4 implements OnChanges {

  heroForm: FormGroup;
  states = states;
  m: Observable<string> = Observable.from(this.states);
  @Input() hero: Hero;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(){
    this.logNameChange();

    this.m.subscribe(s => console.log(s));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.heroForm.reset();
    console.log(this.hero);
    this.heroForm.patchValue({
      name: this.hero.name + "#",
      //secretLairs: this.setAddresses(this.hero.addresses)
    });
    this.setAddresses(this.hero.addresses);
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    console.log(addressFGs);
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);

  }

  removeLair(i : number){
    this.secretLairs.removeAt(i);
    console.log(i);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  };

  logNameChange() {
    let nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(value => console.log(value));
  }


  addLair(){
    (<FormArray> this.heroForm.get('secretLairs')).push(this.fb.group(new Address()));
    this.states.push('CANADA');
    console.log(this.states);
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  onSubmit() {
    this.hero = this.prepareSaveHero();
    console.log(this.hero);
    //this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    this.ngOnChanges(undefined);
    this.heroForm.reset();
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      // addresses: formModel.secretLairs // <-- bad!
      addresses: secretLairsDeepCopy
    };
    return saveHero;
  }
}
