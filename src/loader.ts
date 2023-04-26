import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const a = 255;

    const b = Buffer.from([a]);

    await prisma.match.create({
        data: {
            teamDire: b,
            duration: 0,
            id: "0",
            radiantWin: true,
            startTime: new Date(),
            teamRadient: b,
        },
    });
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
