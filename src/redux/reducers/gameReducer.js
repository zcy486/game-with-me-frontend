
export default function games(state = {}, action) {
    switch (action.type) {
        case "GETGAMES_SUCCESS":
            return { games: action.games };
        default:
            return state;
    }
}