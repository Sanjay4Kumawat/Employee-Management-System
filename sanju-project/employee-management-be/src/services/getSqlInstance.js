import { neon } from "@neondatabase/serverless";

export const sql = neon(
  "postgresql://neondb_owner:lbc3QDMH7zgG@ep-little-feather-a1yegn0h.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
);
