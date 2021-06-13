import GameService from "../../services/GameService";

export function getGames() {
    function onSuccess(games) {
        return { type: "GETGAMES_SUCCESS", games: games};
    }

    function onFailure(error) {
        console.log("failed to get games:", error);
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

export function getIdByName(gameName) {
    function onSuccess(gameId) {
        return { type: "GETIDBYNAME_SUCCESS", gameId: gameId};
    }
    function onFailure(error) {
        console.log("failed to get game Id by name:", error);
    }
    return async (dispatch) => {
        try {
            console.log(gameName);
            let resp = await GameService.getIdByName(gameName);
            dispatch(onSuccess(resp.gameId));
        } catch (e) {
            onFailure(e)
        }
    }
}