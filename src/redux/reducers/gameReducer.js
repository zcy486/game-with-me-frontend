export default function games(state = {}, action) {
  switch (action.type) {
    case "GETGAMES_SUCCESS":
      return { games: action.games };
    case "GETIDBYNAME_SUCCESS":
      return { gameId: action.gameId };
    default:
      return state;
  }
}
