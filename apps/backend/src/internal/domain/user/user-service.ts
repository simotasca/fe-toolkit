import { mapUserRowToPublicUser } from "@/internal/domain/user/user-mapper.js";
import { PublicUser } from "@/internal/domain/user/user.js";
import { Service } from "@/internal/persistence/pg.js";

export async function userExistsByEmail(db: Service, email: string) {
  const result = await db.query(
    "select exists (select 1 from auth.user where email = $1) as exists",
    [email]
  );
  return result.rows[0]?.exists;
}

export async function userExistsByUsername(db: Service, username: string) {
  const result = await db.query(
    "select exists (select 1 from auth.user where username = $1) as exists",
    [username]
  );
  return result.rows[0]?.exists;
}

export async function userCreate(db: Service, email: string, passwordHash: string, username: string, isAdmin=false): Promise<PublicUser> {
  const result = await db.query(
    `insert into auth.user (email, password, username, role)
    values ($1, $2, $3, $4)
    returning *`,
    [email, passwordHash, username, isAdmin ? "admin" : "user"]
  );

  const row = result.rows[0];

  if (!row) {
    throw new Error("Failed to create user");
  }

  return mapUserRowToPublicUser(row);
}

export async function userFindByEmail(db: Service, email: string): Promise<PublicUser | null> {
  const result = await db.query(
    "select * from auth.user where email = $1",
    [email]
  );

  const row = result.rows[0];

  if (!row) return null;

  return mapUserRowToPublicUser(row);
}

export async function userList(db: Service): Promise<PublicUser[]> {
  const result = await db.query("select * from auth.user order by email asc");
  return result.rows.map(mapUserRowToPublicUser);
}