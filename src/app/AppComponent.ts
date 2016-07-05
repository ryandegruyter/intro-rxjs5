import IComponentOptions = angular.IComponentOptions;
import './app-component.scss';

export class AppComponent implements IComponentOptions {
    static NAME:string = "app";

    templateUrl: string = "app/AppComponent.html";
}
