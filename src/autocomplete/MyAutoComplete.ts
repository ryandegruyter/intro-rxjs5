import IComponentOptions = angular.IComponentOptions;
import {fromScope$} from "../rx/fromScope";
import IScope = angular.IScope;
import {fromEvent} from "rxjs/observable/fromEvent";
import {interval} from "rxjs/observable/interval";
import {DEBUG_STREAM} from "../rx/util";
import {fromPromise} from "rxjs/observable/fromPromise";
import {UserService} from '../service/UserService';
import {User} from '../model/user';

export class MyAutoComplete implements IComponentOptions {
    static SELECTOR: string = "myAutocomplete";

    templateUrl = 'autocomplete/MyAutoComplete.html';
    controller: string|Function|string|Function[] = MyAutoCompleteController;
}

export class MyAutoCompleteController {

    users: User[] = [];

    static $inject = ['$scope', 'UserService'];
    constructor(private $scope: IScope, private UserService: UserService) {

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
            .flatMap((qry: string)=>fromPromise(this.UserService.queryUsers(qry)))
            .map((response: any)=>response.data.items)
            .do(this.showResults)
            .subscribe();
    }

    private showResults = (users: User[]): void => {
        this.users = users;
    }

}
