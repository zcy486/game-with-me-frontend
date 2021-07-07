export default function reviews(state = {}, action) {
    switch (action.type) {
        case "GETREVIEWS_SUCCESS":
            return {reviews: action.reviews};
        case "GETREIVEWS_FAILURE":
            return { error: action.error };

        case "UPDATEREVIEW_SUCCESS":
            return { review: action.review };
        case "UPDATEREVIEW_FAILURE":
            return { error: action.error };

        case "GETREVIEW_BY_ORDERID__SUCCESS":
            return { review: action.review };
        case "GETREVIEW_BY_ORDERID__FAILURE":
            return { error: action.error };

        case "GETREVIEW_BY_COMPANION_SUCCESS":
            return { reviewlist: action.reviewlist };
        case "GETREVIEW_BY_COMPANION_FAILURE":
            return { error: action.error };
           
        case "CREATEREVIEW_SUCCESS":
            return { ...state };

        case "GETREVIEWWITHLABELS_SUCCESS":
            return { response: action.response };
        default:
            return state;
    }

}

