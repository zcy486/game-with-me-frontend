import HttpService from "./HttpService";

export default class SearchService {
    static baseURL() {
        return "http://localhost:4000/search";
    }

    static search(userInput) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                SearchService.baseURL(),
                {userInput: userInput},
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