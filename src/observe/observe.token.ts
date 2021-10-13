import { InjectionToken } from '@angular/core';
import { ObserveEffectInterface } from './observe.interface';

export const OBSERVE_EFFECT : InjectionToken<ObserveEffectInterface> = new InjectionToken<ObserveEffectInterface>('NGX_CRUD__OBSERVE_EFFECT');
