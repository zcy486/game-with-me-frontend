import PostService from "../../services/PostService";

export function createPost(post) {
    function onSuccess() {
        return { type: "CREATEPOST_SUCCESS" };
    }
    function onFailure(error) {
        console.log("create post failure", error);
    }

    return async (dispatch) => {
      try {
          await PostService.createPost(post);
          dispatch(onSuccess());
      } catch (e) {
          onFailure(e);
      }
    };
}

export function getPost(postId) {
    function onSuccess(post) {
        return { type: "GETPOST_SUCCESS", post: post};
    }
    function onFailure(error) {
        console.log("get post failure", error);
    }

    return async (dispatch) => {
        try {
            let fullPost = await PostService.getPost(postId);
            dispatch(onSuccess(fullPost));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function getPostsByGame(gameId) {
    function onSuccess(response) {
        return { type: "GETPOSTSBYGAME_SUCCESS", response: response};
    }
    function onFailure(error) {
        console.log("get posts by game failure", error);
    }
    return async (dispatch) => {
        try {
            let response = await PostService.getPostByGame(gameId);
            dispatch(onSuccess(response));
        } catch (e) {
            onFailure(e);
        }
    }

}