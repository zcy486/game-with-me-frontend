export default class HttpService {
  static extractUser(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let userJson = JSON.parse(window.atob(base64));
    return {
      user: {
        _id: userJson._id,
        username: userJson.username,
        age: userJson.age,
        gender: userJson.gender,
        isPremium: userJson.isPremium,
        balance: userJson.balance,
        avatarUrl: userJson.avatarUrl,
      },
    };
  }

  static async get(url, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "GET",
        headers: header,
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/login";
      } else {
        resp = await resp.json();
      }
      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async put(url, data, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    header.append("Content-Type", "application/json");

    try {
      let resp = await fetch(url, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/login";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async post(url, data, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    let body = {};
    if (data instanceof FormData) {
      body = data;
    } else {
      body = JSON.stringify(data);
      header.append("Content-Type", "application/json");
    }
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: body,
      });

      if (this.checkIfUnauthorized(resp)) {
        onError(resp.error);
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async remove(url, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "DELETE",
        headers: header,
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/login";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }

        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  //TODO
  static checkIfUnauthorized(res) {
    return res.status === 401;
  }
}
