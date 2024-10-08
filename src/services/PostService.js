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

  static getPost(postId) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${PostService.baseURL()}/${postId}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving post!");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getPostWithFilters(filters) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PostService.baseURL()}/filters`,
        filters,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getPostByCompanion(companionId) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PostService.baseURL()}/ofcompanion`,
        { companionId: companionId },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static uploadImages(files) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PostService.baseURL()}/image`,
        files,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static reloadOnEdit(postId) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${PostService.baseURL()}/edit/${postId}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updatePost(post) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${PostService.baseURL()}/${post._id}`,
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
}
