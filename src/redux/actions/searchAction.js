import SearchService from "../../services/SearchService";

export function search(userInput) {
      function onSuccess(options) {
            return { type: "SEARCH_SUCCESS", options: options };
      }
      function onFailure(error) {
            return { type: "SEARCH_FAILURE", error: error };
      }

      return async (dispatch) => {
            try {
                let options = await SearchService.search(userInput);
                dispatch(onSuccess(options));
            } catch (e) {
                dispatch(onFailure(e));
            }
      };
}
