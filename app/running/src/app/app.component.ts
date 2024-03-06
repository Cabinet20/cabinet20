import {Component, effect, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RunningStore} from "@cabinet20/shared/data-access";
import {combineLatest, skip} from "rxjs";

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
    }, {allowSignalWrites: true});
    combineLatest([
      this.form.controls['distanceMeasure'].valueChanges,
      this.form.controls['distance'].valueChanges])
      .pipe(skip(1))
      .subscribe(() => this.store.updateDistance(
        this.form.controls['distance'].value!,
        this.form.controls['distanceMeasure'].value as 'km' | 'miles'));
    combineLatest([
      this.form.controls['speed'].valueChanges,
      this.form.controls['speedMeasure'].valueChanges])
      .pipe(skip(1))
      .subscribe(() => this.store.updateSpeed(
        this.form.controls['speed'].value!,
        this.form.controls['speedMeasure'].value as 'kph' | 'mph'));
  }
}
