import HttpService from "./HttpService";

export default class reviewService {
    static baseURL() {
        return "http://localhost:4000/review";
    }

    static createReview(star, label, text
        ) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${reviewService.baseURL()}`,
                {
                    star: star,
                    label: label,
                    reviewText: text,
                    companionId: companionId,
                    gamerId: gamerId
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


    static getReviews() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(),
                function (data) {
                    resolve(data);
                    console.log(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getReview(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${reviewService.baseURL()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving order");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
    //user id is about companion's Id
    static getReviewByUserId(userId) {       
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${reviewService.baseURL()}/gamerId/${userId}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving review by companion Id");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
    //userId is about companion
    static updateReview(review) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${reviewService.baseURL()}/${userId}`,
                review,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static deleteReview(id) {
        return new Promise((resolve, reject) => {
            HttpService.delete(
                `${reviewService.baseURL()}/${id}`,
                function (data) {
                    if (data.message !== undefined) {
                        resolve(data.message);
                    } else {
                        reject("Error while deleting");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }


   
}