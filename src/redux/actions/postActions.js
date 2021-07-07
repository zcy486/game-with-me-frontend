import PostService from "../../services/PostService";

export function createPost(post, files) {
    function onSuccess() {
        return { type: "CREATEPOST_SUCCESS"};
    }
    function onFailure(error) {
        console.log("create post failure", error);
        return { type: "CREATEPOST_FAILURE", error: error};
    }

    return async (dispatch) => {
        try {
            let po = post;
            if (files) {
                let res = await PostService.uploadImages(files);
                po.screenshots = res.screenshots;
            }
            await PostService.createPost(po);
            dispatch(onSuccess());
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function getPost(postId) {
    function onSuccess(post) {
        return { type: "GETPOST_SUCCESS", post: post };
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

export function getPostsWithFilters(filters) {
    function onSuccess(response) {
        return { type: "GETPOSTSWITHFILTERS_SUCCESS", response: response };
    }
    function onFailure(error) {
        console.log("get posts with filters failure", error);
    }
    return async (dispatch) => {
        try {
            let response = await PostService.getPostWithFilters(filters);
            dispatch(onSuccess(response));
        } catch (e) {
            onFailure(e);
        }
    }

}

export function getPostsByCompanion(companionId) {
    function onSuccess(response) {
        return { type: "COMPANIONPOST", companion: response };
    }
    function onFailure(error) {
        console.log("get posts by companion failure", error);
    }
    return async (dispatch) => {
        try {
            let response = await PostService.getPostByCompanion(companionId);
            dispatch(onSuccess(response));
        } catch (e) {
            onFailure(e);
        }
    }
}
