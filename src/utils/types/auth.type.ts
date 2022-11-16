export type AuthUser = {
  email: string | null;
  photoURL: string | null;
};

export type AuthState = {
  authUser: AuthUser | null;
};
