const BASE_PATH = "https://api.steampowered.com/IDOTA2Match_570";
const MATCHES_REQUESTED = 2;

/**
 * Return match list URL
 * @docs https://wiki.teamfortress.com/wiki/WebAPI/GetMatchHistory
 * @returns URL string
 */
export const getMatchHistory = () =>
    `${BASE_PATH}/GetMatchHistory/v1?key=${process.env.STEAM_API_KEY}&matches_requested=${MATCHES_REQUESTED}&min_players=10&tournament_games_only=1`;

/**
 * Return match details URL
 * @docs https://wiki.teamfortress.com/wiki/WebAPI/GetMatchDetails
 * @param id match id
 * @returns URL string
 */
export const getMatchDetails = (id: string) =>
    `${BASE_PATH}/GetMatchDetails/v1?key=${process.env.STEAM_API_KEY}&match_id=${id}`;
