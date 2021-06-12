import GameService from "../../services/GameService";

export function getGames() {
    function onSuccess(games) {
        return { type: "GETGAMES_SUCCESS", games: games};
    }

    function onFailure(error) {
        console.log("failed to get games".error);
    }

    return async (dispatch) => {
        try {
            let games = await GameService.readGames();
            dispatch(onSuccess(games));
        } catch (e) {
            onFailure(e)
        }
    };
}