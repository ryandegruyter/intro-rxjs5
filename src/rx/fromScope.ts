import IScope = angular.IScope;
import {Observable, Observer} from "rxjs/Rx";
export const fromScope$ = (property: string, $scope: IScope): Observable<any> => {
    return Observable.create((observer: Observer<any>) => {
        $scope.$on("destroy", () => {
            observer.complete();
        });
        return $scope.$watch(property, (newValue: any, oldValue: any) => {
            observer.next(newValue);
        });
    });
};
