import IComponentOptions = angular.IComponentOptions;
import {Observable, Observer} from "rxjs/Rx";
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

    private users: User[] = [];
    private searchInProgress: boolean;
    private errorMessage: string = '';

    static $inject = ['$scope', 'UserService'];
    constructor(private $scope: IScope, private UserService: UserService) {

    }

    $onInit(): void {
        this.initObservable();
    }

    initObservable(): void {
        const myInputObservable = fromScope$('$ctrl.myInput', this.$scope)
            .do(()=> {
                this.users = [];
            })
            /* filter out undefined or no text */
            .filter((query: string) => query !== undefined)
            /* only check when user has stopped pressing after 100 ms
             * normally you would use a shorten timespan to keep it snappy */
            .debounceTime(500)
            /*dont make a request if the text remains the same */
            .distinctUntilChanged()
            .filter((query: string) => query !== '')
            .map((query: string) => query.toLowerCase())
            .do(() => {
                this.searchInProgress = true;
                this.errorMessage = '';
            })
            .flatMap((query: string) =>
                fromPromise(this.UserService.queryUsers(query))
                //try 3 times
                .retry(3)
                //Catch AJAX errors and handle them
                .catch((error: any) => {
                    this.handleError(error);
                    return Observable.empty();
                }))
            .map((response: any)=>response.data.items)
            .do(() => this.searchInProgress = false);

        const observer: Observer<any> = {
            next: (users: User[]) => this.showResults(users),
            error: err => this.handleError(err),
            complete: () => console.log('Completed')
        }

        myInputObservable.subscribe(observer);
    }

    showResults(users: User[]): void {
        this.users = users;
    }

    handleError(error: any): void {
        this.searchInProgress = false;
        this.errorMessage = error.data.message;
    }

}
