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
          console.log(post);
          await PostService.createPost(post);
          dispatch(onSuccess());
      } catch (e) {
          onFailure(e);
      }
    };
}