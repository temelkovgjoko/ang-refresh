import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: '/persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy {
  personList: string[];
  isFetching = true;
  private personListSubs: Subscription;
  constructor(private personService: PersonsService) {
  }
  ngOnInit() {
    this.personListSubs = this.personService.personsChanged.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    })
    this.isFetching = true;
    this.personService.fetchPersons()
  }

  onRemovePerson(personName: string) {
    this.personService.removePerson(personName)
  }

  ngOnDestroy() {
    this.personListSubs.unsubscribe()
  }
}
