export type JwtUser = {
  sub: string;
  username: string;
  roles: string[];
  exp: number;
};
