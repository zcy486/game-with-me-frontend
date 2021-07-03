import OrderService from "../../services/ReviewService";


export function getReviews() {
    // when the backend call was successfull and the Orders are retrieved
    // in the dispatcher the Orders will be added to the global state
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
            // ask for the Orders in the backend
            let reviews = await ReviewService.getReviews();
            // call onSuccess in context of redux
            dispatch(onSuccess(reviews));
        } catch (e) {
            onFailure(e);
        }
    };
}


//
export function createReview(star, label, text)
    {
    function onSuccess() {
        return { type: "CREATEREVIEW_SUCCESS" };
    }
    function onFailure(error) {
        console.log("CREATEREVIEW_FAILURE", error);
    }

    return async (dispatch) => {
        try {
            let review = await ReviewService.createReview(star, label, text);
            dispatch(onSuccess(reviews));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function updateReview(status) {
    function onSuccess(review) {
        return { type: "UPDATESTATUS_SUCCESS", review: review };
    }

    function onFailure(error) {
        console.log("update status failure", error);
    }

    return async (dispatch) => {
        try {
            let review = await ReviewService.updateReview(status);
            dispatch(onSuccess(review));
        } catch (e) {
            onFailure(e);
        }
    };
}

//get review by review Id
export const getReview = (id) => {
    function onSuccess(review) {
        return { type: "GETREVIEW__SUCCESS", review: review };
    }
    function onFailure(error) {
        console.log("GETREVIEW__FAILURE", error);
    }

    return async (dispatch, getState) => {
        try {
            let review = await ReviewService.getReview(id);
            dispatch(onSuccess(review));
        } catch (e) {
            onFailure(e);
        }
    };
};

//get review by companion Id
export const getReviewByUserId = (userId) => {
    function onSuccess(review) {
        return { type: "GETREVIEW_BY_COMPANION_SUCCESS", reviewlist: review };
    }
    function onFailure(error) {
        console.log("GETREVIEW_BY_COMPANION_FAILURE", error);
    }
    
    return async (dispatch, getState) => {
        try {
            let review = await ReviewService.getReviewByUserId(userId);
            dispatch(onSuccess(review));
        } catch (e) {
            onFailure(e);
        }
    };
};


export function deleteReview(id) {
    function onSuccess(reviews) {
        return { type: "DELETEORDER_SUCCESS", reviews: reviews };
    }
    function onFailure(error) {
        console.log("delete order failure", error);
    }
    return async (dispatch) => {
        try {
            await OrderService.deleteOrder(id);
            let reviews = await ReviewService.getReviews();
            dispatch(onSuccess(reviews));
        } catch (e) {
            onFailure(e);
        }
    };
}
