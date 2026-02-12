export enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface User {
  email: string;
  name: string;
}

interface LoginAction {
  type: AuthActionTypes.LOGIN;
  payload: User;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;

export const login = (email: string): LoginAction => ({
  type: AuthActionTypes.LOGIN,
  payload: {
    email,
    name: "John Doe",
  },
});

export const logout = (): LogoutAction => ({
  type: AuthActionTypes.LOGOUT,
});
