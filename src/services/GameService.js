import HttpService from "./HttpService";

export default class GameService {
    static baseURL() {
        return "http://localhost:4000/game";
    }

    static readGames() {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                this.baseURL(),
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
}