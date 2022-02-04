// import "dotenv/config";
import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";

function check(name: string) {}

export default withAuth(
  config({
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    },
    images: {
      upload: "local",
      local: {
        storagePath: "public/images",
        baseUrl: "/images",
      },
    },
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    session,
    lists,
  })
);
