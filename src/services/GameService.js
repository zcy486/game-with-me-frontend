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

    static getIdByName(gameName) {
        return new Promise( async (resolve, reject) => {
            HttpService.post(
                `${this.baseURL()}/getByName`,
                {gameName: gameName},
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