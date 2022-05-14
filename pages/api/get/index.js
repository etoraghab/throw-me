import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query", "info"] });
import rateLimit from "../../../utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {
  try {
    await limiter.check(res, 60, "CACHE_TOKEN"); // 10 requests per minute
    if (req.method !== "POST") {
      res.status(400).send({ message: "Only POST requests allowed" });
      return;
    } else {
      async function main() {
        if (req.body.name.length <= 20 && req.body.name.length >= 3) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json(
            await prisma.urls.findUnique({
              where: {
                name: req.body.name,
              },
            })
          );
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(400).send({ message: "failed" });
        }
      }

      main()
        .catch((e) => {
          throw e;
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    }
  } catch {
    res.status(429).json({ message: "Rate limit exceeded" });
  }
}
