import IScope = angular.IScope;
import {Observable, Observer} from "rxjs/Rx";
export abstract class Observable {
    static fromScope = (property: string, $scope: IScope) => {
        Observable.create((observer: Observer) => {
            // $scope.$watch returns a deregistration function for registered listener.
            return $scope.$watch(property, (oldValue: any, newValue: any) => {
                observer.next(newValue);
            });
            $scope.$on("destroy", () => {
                observer.complete();
            });
        });
    }
}
