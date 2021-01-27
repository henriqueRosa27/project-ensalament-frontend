/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { NavigationTypes } from './types';

export const toogleDrawer = () => action(NavigationTypes.TOOGLE_DRAWER);

export const closeDrawer = () => action(NavigationTypes.CLOSE_DRAWER);

export const openDrawer = () => action(NavigationTypes.OPEN_DRAWER);

export const toogleBackdrop = () => action(NavigationTypes.TOOGLE_BACKDROP);

export const closeBackdrop = () => action(NavigationTypes.CLOSE_BACKDROP);

export const openBackdrop = () => action(NavigationTypes.OPEN_BACKDROP);
