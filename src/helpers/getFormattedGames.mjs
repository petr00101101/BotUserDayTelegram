export function getFormattedGames(games) {
  const formattedGames = games.map((game) => {
    const { date, winner } = game;
    return `${date} : ${winner}`;
  });
  return formattedGames;
}
