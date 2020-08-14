import { action } from 'typesafe-actions';
import { NavigationTypes } from './types';

export const toogleDrawer = () => action(NavigationTypes.TOOGLE_DRAWER);

export const closeDrawer = () => action(NavigationTypes.CLOSE_DRAWER);

export const openDrawer = () => action(NavigationTypes.OPEN_DRAWER);
