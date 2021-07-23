import ReviewService from "../../services/ReviewService";
import reviewService from "../../services/ReviewService";

//get reviews by companion id
export function getReviews() {

    function onSuccess(reviews) {
        return { type: "GETREVIEWS_SUCCESS", reviews: reviews };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("GETREIVEWS_FAILURE", error);
    }

    return async (dispatch) => {
        try {
            // ask for the Reviews in the backend
            let reviews = await ReviewService.getReviews();
            // call onSuccess in context of redux
            dispatch(onSuccess(reviews));
        } catch (e) {
            onFailure(e);
        }
    };
}



export function createReview(star, label, reviewText, companionId, gamerId, orderId)
    {
    function onSuccess() {
        return { type: "CREATEREVIEW_SUCCESS" };
    }
    function onFailure(error) {
        console.log("CREATEREVIEW_FAILURE", error);
    }

    return async (dispatch) => {
        try {
            let review = await ReviewService.createReview(star, label, reviewText, companionId, gamerId, orderId);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function updateReview(reviewId, updateObj) {
    function onSuccess(review) {
        return { type: "UPDATEREVIEW_SUCCESS", review: review };
    }

    function onFailure(error) {
        console.log("UPDATEREVIEW_FAILURE", error);
    }

    return async (dispatch) => {
        try {
            let review = await ReviewService.updateReview(reviewId, updateObj);
            dispatch(onSuccess(review));
        } catch (e) {
            onFailure(e);
        }
    };
}

//get review by order Id
export const getReviewByOrderId = (orderId) => {
    function onSuccess(review) {
        return { type: "GETREVIEW_BY_ORDERID__SUCCESS", review: review };
    }
    function onFailure(error) {
        console.log("GETREVIEW_BY_ORDERID__FAILURE", error);
    }

    return async (dispatch, getState) => {
        try {
            let review = await ReviewService.getReviewByOrderId(orderId);
            dispatch(onSuccess(review));
        } catch (e) {
            onFailure(e);
        }
    };
};

//get review by companion Id
export const getReviewByCompanionId = (userId) => {
    function onSuccess(review) {
        return { type: "GETREVIEW_BY_COMPANION_SUCCESS", reviewlist: review };
    }
    function onFailure(error) {
        console.log("GETREVIEW_BY_COMPANION_FAILURE", error);
    }
    
    return async (dispatch, getState) => {
        try {
            let review = await ReviewService.getReviewByCompanionId(userId);
            dispatch(onSuccess(review));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getReviewWithLabels = (companionId) => {
    function onSuccess(response) {
        return { type: "GETREVIEWWITHLABELS_SUCCESS", response: response };
    }
    function onFailure(error) {
        console.log("get post failure", error);
    }
    return async (dispatch) => {
        try {
            let response = await reviewService.getReviewWithLabels(companionId);
            dispatch(onSuccess(response));
        } catch (e) {
            onFailure(e);
        }
    }
}


export function deleteReview(id) {//by review id
    function onSuccess(reviews) {
        return { type: "DELETEORDER_SUCCESS", reviews: reviews };
    }
    function onFailure(error) {
        console.log("delete order failure", error);
    }
    return async (dispatch) => {
        try {
            await ReviewService.deleteOrder(id);
            let reviews = await ReviewService.getReviews();
            dispatch(onSuccess(reviews));
        } catch (e) {
            onFailure(e);
        }
    };
}
