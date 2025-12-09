import { users, tasks} from 'prisma/generated/prisma/client'
export type TaskWithOwner = tasks & {
  owner?: users | null;
  column?: { id: number; name: string } | null;
  executors?: users[] | null;
}
