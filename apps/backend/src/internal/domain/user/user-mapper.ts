import { PublicUser, publicUserSchema } from "@/internal/domain/user/user.js";

export function mapUserRowToPublicUser(row: any): PublicUser {
  return publicUserSchema.parse({
    id: row.id,
    email: row.email,
    username: row.username,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}