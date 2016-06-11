import IComponentOptions = angular.IComponentOptions;
import './app-component.scss';

export class AppComponent implements IComponentOptions {
    static NAME:string = "app";

    template:string = `
        <h1>Hello world</h1>
        <my-autocomplete></my-autocomplete>
        `;
}