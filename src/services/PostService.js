import HttpService from "./HttpService";

export default class PostService {
    static baseURL() {
        return "http://localhost:4000/post";
    }

    static createPost(post) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                 PostService.baseURL(),
                 post,
                function (data) {
                     resolve(data);
                },
                function (textStatus) {
                     reject(textStatus);
                }
            );
        });
    }

    static getPostByGame(gameId) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${PostService.baseURL()}/ofgame`,
                {gameId: gameId},
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        })
    }


}