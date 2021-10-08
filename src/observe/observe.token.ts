import { InjectionToken } from '@angular/core';
import { EffectInterface } from './observe.interface';

export const EFFECT_SERVICE : InjectionToken<EffectInterface> = new InjectionToken<EffectInterface>('NGX_CRUD__OBSERVE__EFFECT_SERVICE');
