import HttpService from "./HttpService";

export default class UserService {
    static baseURL() {
        return "http://localhost:4000/user";
    }

    static register(username, password) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/register`,
                {
                    username: username,
                    password: password
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static login(username, password) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/login`,
                {
                    username: username,
                    password: password,
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static updateProfile(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${UserService.baseURL()}/${user._id}`,
                user,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getCompanionProfile(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL()}/companion/${userId}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }


    static uploadImage(user, file) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/image/${user._id}`,
                file,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }


    static logout() {
        window.localStorage.removeItem("jwtToken");
    }
}