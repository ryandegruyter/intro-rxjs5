export class Endpoints {
    static USERS: string = "http://localhost:3030/users";
    static searchUsers = (query: string): string => {
        return Endpoints.USERS + `?q=${query}`;
    }
}
