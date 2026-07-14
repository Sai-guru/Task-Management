import { pool } from "../config/db.js";
import type { AuthUser, GoogleTokenInfo, User } from "../models/userModel.js";

export const upsertGoogleUser = async (
  profile: GoogleTokenInfo,
): Promise<AuthUser> => {
  if (!profile.sub || !profile.email || !profile.name) {
    throw new Error("Google profile is missing required fields");
  }

  const { rows } = await pool.query<User>(
    `
      INSERT INTO users (google_id, email, name, picture)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (google_id)
      DO UPDATE SET
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        picture = EXCLUDED.picture,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `,
    [profile.sub, profile.email, profile.name, profile.picture ?? null],
  );

  const user = rows[0];

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    googleId: user.google_id,
  };
};

export const findUserById = async (id: number): Promise<AuthUser | null> => {
  const { rows } = await pool.query<User>("SELECT * FROM users WHERE id = $1", [
    id,
  ]);
  const user = rows[0];

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    googleId: user.google_id,
  };
};
