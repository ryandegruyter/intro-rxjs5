import 'angular';
import 'angular-messages';
import 'angular-material';
require('angular-material/angular-material.css');
import {AppComponent} from "./AppComponent";
import {MyAutoComplete} from "../autocomplete/MyAutoComplete";
import {UserService} from '../service/UserService';

export const APP_MODULE_NAME = "Hello world";

const APP_MODULE_DEPENDENCIES:Array<string> = [
    'ngMaterial',
    'ngMessages'
];

angular
    .module(
        APP_MODULE_NAME,
        APP_MODULE_DEPENDENCIES
    )
    .component(AppComponent.NAME, new AppComponent())
    .component(MyAutoComplete.SELECTOR, new MyAutoComplete())
    .service(UserService.NAME, UserService);
