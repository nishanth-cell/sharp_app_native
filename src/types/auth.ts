export type UserRole =
  | "super_admin"
  | "admin"
  | "ob"
  | "mentor"
  | "trainer"
  | "student"
  | "member"
  | "institution";

export type User = {
  id: string;
  name: string;
  username: string;
  role: UserRole;

  college_id: number | null;
  org: string | null;
  batch: string | null;

  mobile: string | null;
  email: string | null;

  status: "Active" | "Suspended" | "Invited";

  must_change_password: boolean;

  initials: string;
  color: string;

  last_login: string | null;
  created_at: string;
};

export type LoginResponse = {
  ok: boolean;
  token: string;
  user: User;
};


