import HttpService from "./HttpService";

export default class OrderService {
    static baseURL() {
        return "http://localhost:4000/order";
    }

    static createOrder(price, gamerId, postId, companionId
        ) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${OrderService.baseURL()}`,
                {
                    orderPrice: price,
                    gamerId: gamerId,
                    postId: postId,
                    companionId: companionId,
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


    static getOrders() {
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

    static getOrder(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${OrderService.baseURL()}/${id}`,
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

    static updateStatus(id,status) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${OrderService.baseURL()}/${id}`,
                {
                    orderStatus: status,
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

    static deleteOrder(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${OrderService.baseURL()}/${id}`,
                function (data) {
                   resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    //get orders for companion with this id
    static getCompanionOrders(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${OrderService.baseURL()}/companion/${id}`,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }


}