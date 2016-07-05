export class Endpoints {
    static USERS: string = "http://localhost:3030/users";
    static GITHUBUSERS: string = 'https://api.github.com/search/users';
    static searchUsers = (query: string): string => {
        //return Endpoints.USERS + `?q=${query}`;
        return Endpoints.GITHUBUSERS + `?q=${query}`;
    }
}
