import 'dotenv/config'
import path from "node:path";
import { defineConfig, env } from "prisma/config";

type Env = {
  DATABASE_URL: string
}

const schemaPath = path.join("prisma", "schema.prisma");
console.log(`The path is ${schemaPath}`);

export default defineConfig({
  engine: "classic",
  datasource: {
      url: env<Env>('DATABASE_URL'),
  },
  schema: schemaPath,
});