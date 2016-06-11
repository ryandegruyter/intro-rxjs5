import IComponentOptions = angular.IComponentOptions;
import {fromScope$} from "../rx/fromScope";
import IScope = angular.IScope;
import {fromEvent} from "rxjs/observable/fromEvent";
import {interval} from "rxjs/observable/interval";
import {DEBUG_STREAM} from "../rx/util";
import {fromPromise} from "rxjs/observable/fromPromise";
import IHttpService = angular.IHttpService;
import {Endpoints} from "../restapi/endpoints";
import IPromise = angular.IPromise;
export class MyAutoComplete implements IComponentOptions {
    static SELECTOR: string = "myAutocomplete";

    template: string =
        `
            <input ng-model="$ctrl.myInput" />
            <ul>
                <li ng-repeat="user in $ctrl.users">{{user.name}}</li>
            </ul>
        `;
    controller: string|Function|string|Function[] = MyAutoCompleteController;
}
export class MyAutoCompleteController {

    static $inject = ['$scope', '$http'];

    users: any[] = [];

    constructor(private $scope: IScope, private $http: IHttpService) {
    }

    $onInit(): void {
        fromScope$('$ctrl.myInput', this.$scope)
        /* filter out undefined or no text */
            .do(()=> {
                this.users = [];
            })
            .filter(x => x !== undefined)
            /* only check when user has stopped pressing after 100 ms
             * normally you would use a shorten timespan to keep it snappy */
            .debounceTime(1000)
            /*dont make a request if the text remains the same */
            .distinctUntilChanged()
            .filter(x => x !== "")
            .flatMap((qry: string)=>fromPromise(<Promise<any>>this.$http.get(Endpoints.searchUsers(qry))))
            .map((response: any)=>response.data)
            .do(this.showResults)
            .subscribe();
    }

    private showResults = (usrs: any[]): void => {
        this.users = usrs;
    }

}