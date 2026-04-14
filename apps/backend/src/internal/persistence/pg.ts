import { env } from '@/internal/env.js';
import { type ClientBase, Pool } from 'pg';

export const pool = new Pool({ connectionString: env.DB_CONN });

export type Service = { query: ClientBase["query"] };