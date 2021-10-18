import { InjectionToken } from '@angular/core';
import { ObserveAfterEffect, ObserveBeforeEffect } from './observe.interface';

export const OBSERVE_EFFECT : InjectionToken<ObserveBeforeEffect & ObserveAfterEffect> = new InjectionToken<ObserveBeforeEffect & ObserveAfterEffect>('NGX_CRUD__OBSERVE_EFFECT');
