import {Endpoints} from '../restapi/endpoints';

export class UserService {

    static NAME: string = 'UserService';

    static $inject = ['$http'];
    constructor(private $http: ng.IHttpService) {

    }

    queryUsers(query: string): Promise<any> {
        return this.$http.get(Endpoints.searchUsers(query));
    }

}
