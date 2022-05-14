import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info"] });

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = async (context) => {
  const { pid } = context.query;
  if (pid.length <= 20 && pid.length >= 3) {
    const link = await prisma.urls.findUnique({
      where: {
        name: pid,
      },
    });
    if (!link)
      return {
        notFound: true,
      };
    return {
      redirect: {
        permanent: false,
        destination: link.url,
      },
    };
  }
  return {
    notFound: true,
  };
};

export default function To() {
  return <></>;
}
