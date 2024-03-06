import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";

type RunningStore = {
  distance: number;
  distanceMeasure: 'km' | 'miles';
  timeHours: number,
  timeMinutes: number,
  timeSeconds: number,
  paceMinutes: number,
  paceSeconds: number,
  paceDistanceMeasure: 'km' | 'miles',
  speed: number,
  speedMeasure: 'kph' | 'mph'
}

const initialState: RunningStore = {
  distance: 10,
  distanceMeasure: 'km',
  timeHours: 0,
  timeMinutes: 49,
  timeSeconds: 46,
  paceMinutes: 4,
  paceSeconds: 58,
  paceDistanceMeasure: 'km',
  speed: 7.5,
  speedMeasure: 'mph'
}

export const RunningStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(store => ({
    model: computed(() => ({
      distance: store.distance(),
      distanceMeasure: store.distanceMeasure(),
      timeHours: store.timeHours(),
      timeMinutes: store.timeMinutes(),
      timeSeconds: store.timeSeconds(),
      paceMinutes: store.paceMinutes(),
      paceSeconds: store.paceSeconds(),
      paceDistanceMeasure: store.paceDistanceMeasure(),
      speed: store.speed(),
      speedMeasure: store.speedMeasure()
    }))
  })),
  withMethods((store) => ({
    updateDistance(distance: number, distanceMeasure: 'km' | 'miles') {
      patchState(store, () => ({
        distance, distanceMeasure, ...calcTime(store.speed(), store.speedMeasure(), distance, distanceMeasure)
      }))
    },
    updateTime(timeHours: number, timeMinutes: number, timeSeconds: number) {
      const updatedDistance = 0;
      patchState(store, () => ({
        timeHours, timeMinutes, timeSeconds
      }))
    },
    updateSpeed(speed: number, speedMeasure: 'kph' | 'mph') {
      const updatedDistance = 0;
      patchState(store, () => ({
        speed, speedMeasure, ...calcTime(speed, speedMeasure, store.distance(), store.distanceMeasure())
      }))
    },

  })),
);

const calcTime = (speed: number, speedMeasure: 'kph' | 'mph', distance: number, distanceMeasure: 'km' | 'miles') => {
  const distanceNormalised = distance * (distanceMeasure === 'miles' ? 1.609 : 1);
  const speedNormalised = speed * (speedMeasure === 'mph' ? 1.609 : 1);
  const time = distanceNormalised / speedNormalised;
  const hours = Math.floor(time - (time % 1));
  const minutes = Math.floor((time % 1) * 60);
  const seconds = Math.floor((((time % 1) * 60) % 1) * 60);
  return {
    timeHours: hours,
    timeMinutes: minutes,
    timeSeconds: seconds
  }
}