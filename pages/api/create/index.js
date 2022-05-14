import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
const prisma = new PrismaClient({ log: ['info'] });
import rateLimit from '../../../utils/rate-limit';
import { encode } from "url-encode-decode"
import fetch, { BodyMixin } from 'node-fetch';
import requestIp from 'request-ip'

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export default async function handler(req, res) {

  const bannedIp = await prisma.banned.findUnique({
    where: {
      id: requestIp.getClientIp(req)
    }
  })

  if (bannedIp == null) {
    try {
      console.log(requestIp.getClientIp(req))
      await limiter.check(res, 2, 'CACHE_TOKEN');

      if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' });
        return;
      } else {
        async function main() {
          const { name, url } = req.body;
          const key = process.env.ENV_KEY;

          await fetch("https://ipqualityscore.com/api/json/url/" + key + "/" + encode(url)).then(async (src) => {
            let maindata;
            await src.json().then((data) => {
              maindata = data
            })
            if (!(maindata.risk_score >= 60)) {
              // Id "url" is not correct, return and respond with failed
              if (!url || url.trim() === '') {
                return res
                  .status(400)
                  .send({ message: 'failed', reason: 'parameters' });
              }
              // If "name" isn't in body, generate a new one
              if (!name) {
                const randomName = nanoid(4);
                await prisma.urls.create({
                  data: {
                    url,
                    ip: requestIp.getClientIp(req),
                    name: randomName,
                  },
                });
                /*await prisma.urls.create({
                  data: {
                    url,
                    ip: requestIp.getClientIp(req),
                    name: randomName,
                  },
                });*/

                return res.status(200).send({ message: 'success', name: randomName });
              }
              // Check "name"'s characters and create with a custom name
              if (name.length <= 20 && name.length >= 3) {
                try {
                  await prisma.urls.create({
                    data: {
                      url,
                      ip: requestIp.getClientIp(req),
                      name: name,
                    },
                  });

                  res.setHeader('Content-Type', 'application/json');
                  res.status(200).send({ message: 'success', name });
                } catch (e) {
                  if (e.code == 'P2002') {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(400).send({
                      message: 'The Name Already Exists! Choose A Better Name!',
                    });
                  } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(400).send({ message: e.code });
                  }
                }
              } else {
                const bannedIp = await prisma.banned.findUnique({
                  where: {
                    id: pid
                  }
                })

                if (bannedIp == null) {
                  await prisma.banned.create({
                    data: {
                      id: pid,
                      ip: pid
                    },
                  });
                }

                res.setHeader('Content-Type', 'application/json');
                res.status(400).send({ message: 'failed', reason: 'parameters' });
              }
            } else {

              res.setHeader('Content-Type', 'application/json');
              res.status(400).send({ message: 'phishing site!', reason: 'phish' });
            }
          })
        }

        main()
          .catch(e => {
            throw e;
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
      }
    } catch {
      res.status(429).json({ message: 'you can shorten only once a minute' });
    }
  } else {
    res.status(200).json({ message: 'banned from service.' });
  }
}
