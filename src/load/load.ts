import * as dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { Matches } from "./matches";
import { Match } from "./match";
import { getMatchDetails, getMatchHistory } from "./urls";

const prisma = new PrismaClient();

const toJson = (response: Response) => response.json();

function getTeams(match: Match) {
    const teamRadient: number[] = [];
    const teamDire: number[] = [];

    match.result.picks_bans.forEach(({ hero_id, team }) => {
        if (team === 0) {
            teamRadient.push(hero_id);
        } else {
            teamDire.push(hero_id);
        }
    });

    return {
        teamRadient: Buffer.from(teamRadient),
        teamDire: Buffer.from(teamDire),
    };
}

async function main() {
    ``;
    const matches: Matches = await fetch(getMatchHistory()).then(toJson);

    const actions = matches.result.matches.map(async ({ match_id }) => {
        const id = match_id.toString();
        const existedMatch = await prisma.match.findFirst({
            where: {
                id,
            },
        });

        if (existedMatch) {
            console.log(`db: match existed, ${id}`);
            return;
        }

        const match: Match = await fetch(getMatchDetails(id)).then(toJson);

        const teams = getTeams(match);

        console.log(`db: create match, ${id}`);

        await prisma.match.create({
            data: {
                id,
                teamDire: teams.teamDire,
                teamRadient: teams.teamRadient,
                duration: match.result.duration,
                radiantWin: match.result.radiant_win,
                startTime: new Date(match.result.start_time),
            },
        });
    });

    await Promise.all(actions);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
