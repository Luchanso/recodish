import * as dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { Matches } from "./matches";
import { Match } from "./match";
import { getMatchDetails, getMatchHistory } from "./urls";
import debug from "debug";
import { getTeams } from "./getTeams";
import { promiseChain } from "./promiseChain";

const prisma = new PrismaClient();

const fetchDebug = debug("app:fetch");
const appDebug = debug("app");

const toJson = (response: Response) => response.json().catch(fetchDebug);

async function main() {
    const matches: Matches = await fetch(getMatchHistory()).then(toJson);

    fetchDebug("getMatchHistory", matches);

    const actions = matches.result.matches.map(({ match_id }) => async () => {
        const id = match_id.toString();
        const existedMatch = await prisma.match.findFirst({
            where: {
                id,
            },
        });

        if (existedMatch) {
            appDebug("match existed", id);
            return;
        }

        const match: Match = await fetch(getMatchDetails(id)).then(toJson);
        fetchDebug("getMatchDetails", { id, match });

        const teamsHeroes = getTeams(match);

        await prisma.match.create({
            data: {
                id,
                duration: match.result.duration,
                startTime: new Date(match.result.start_time),
                teams: {
                    create: [
                        {
                            ...teamsHeroes.radient,
                            side: "Radient",
                            win: match.result.radiant_win,
                        },
                        {
                            ...teamsHeroes.dire,
                            side: "Dire",
                            win: !match.result.radiant_win,
                        },
                    ],
                },
            },
        });
    });

    await promiseChain(actions);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.trace(e);
        await prisma.$disconnect();
        process.exit(1);
    });
