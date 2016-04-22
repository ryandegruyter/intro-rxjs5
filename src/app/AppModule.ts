import 'angular';
import 'angular-messages';
import 'angular-material';
require('angular-material/angular-material.css');
import {AppComponent} from "./AppComponent";
export const APP_MODULE_NAME = "walibifungames";

const APP_MODULE_DEPENDENCIES:Array<string> = [
    'ngMaterial',
    'ngMessages'
];

angular
    .module(
        APP_MODULE_NAME,
        APP_MODULE_DEPENDENCIES
    )
    .component(AppComponent.NAME, new AppComponent());