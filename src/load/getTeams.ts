import * as debug from "debug";
import { Match } from "./match";

const getTeamsDebug = debug("app:getTeams");

const ASC = (a: number, b: number) => {
    return a - b;
};

export function getTeams(match: Match) {
    getTeamsDebug("match.result.picks_bans", match.result.picks_bans);

    const teamRadient: number[] = [];
    const teamDire: number[] = [];

    match.result.players.forEach(({ hero_id, team_number }) => {
        if (team_number === 0) {
            teamRadient.push(hero_id);
        } else {
            teamDire.push(hero_id);
        }
    });

    teamRadient.sort(ASC);
    teamDire.sort(ASC);

    const mapArrayToHeroes = (arr: number[]) => ({
        hero1: arr[0],
        hero2: arr[1],
        hero3: arr[2],
        hero4: arr[3],
        hero5: arr[4],
    });

    const result = {
        radient: mapArrayToHeroes(teamRadient),
        dire: mapArrayToHeroes(teamDire),
    };

    getTeamsDebug("result", result);

    return result;
}
