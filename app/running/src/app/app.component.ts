import {Component, effect, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RunningStore} from "@cabinet20/shared/data-access";
import {skip} from "rxjs";

@Component({
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  selector: 'run-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'running';
  fb = inject(FormBuilder);
  store = inject(RunningStore);

  state = this.store.model;
  distance = this.store.distance;
  
  form = this.fb.group({
    distance: [10, Validators.required],
    distanceMeasure: ['km'],
    timeHours: [0],
    timeMinutes: [0],
    timeSeconds: [0],
    paceMinutes: [0],
    paceSeconds: [0],
    paceDistanceMeasure: ['km'],
    speed: [0],
    speedMeasure: ['mph']
  });

  constructor() {
    effect(() => {
      this.form.setValue(this.state());
    }, { allowSignalWrites: true});
    this.form.controls['distanceMeasure'].valueChanges.pipe(skip(1)).subscribe(x => {
      this.store.updateDistance(this.form.controls['distance'].value!, x as 'km' | 'miles')
    });
    this.form.controls['distance'].valueChanges.pipe(skip(1)).subscribe(x => {
      this.store.updateDistance(x!, this.form.controls['distanceMeasure'].value as 'km' | 'miles')
    });
  }
}
