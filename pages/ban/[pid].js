import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query", "info"] });

export const getServerSideProps = async (context) => {
  const { pid, pass } = context.query;

  if (pass == process.env.PASS_BAN) {
    try {
      const bannedIp = await prisma.banned.findUnique({
        where: {
          id: pid,
        },
      });

      if (bannedIp == null) {
        await prisma.banned.create({
          data: {
            id: pid,
            ip: pid,
          },
        });
      } else {
        return {
          props: {
            pid: "already banned",
          },
        };
      }
    } finally {
      prisma.$disconnect();
    }
  } else {
    return {
      props: {
        pid: "unauthorised",
      },
    };
  }
  return {
    props: {
      pid: "banned " + pid,
    },
  };
};

export default function To(props) {
  return (
    <>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        {props.pid}
      </h2>
    </>
  );
}
