import HttpService from "./HttpService";

export default class reviewService {
    static baseURL() {
        return "http://localhost:4000/review";
    }

    static createReview(star, label, reviewText, companionId, gamerId, orderId,
        ) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${reviewService.baseURL()}`,
                {
                    star,
                    label,
                    reviewText,
                    companionId,
                    gamerId,
                    orderId
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
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getReviewByOrderId(orderId) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${reviewService.baseURL()}/orderId/${orderId}`,
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
    static getReviewByCompanionId(userId) {       
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${reviewService.baseURL()}/companionId/${userId}`,
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

    static getReviewWithLabels(companionId) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${reviewService.baseURL()}/readWithLabels/${companionId}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            )
        })
    }
    //userId is about companion
    static updateReview(reviewId, updateObj) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${reviewService.baseURL()}/${reviewId}`,
                updateObj,
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