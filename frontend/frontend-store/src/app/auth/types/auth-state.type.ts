import { BaseState } from "types/base-state.type";

export interface AuthState extends BaseState {
  access_token: string ;
  refresh_token: string ;
  isAuthenticated: boolean ;
}
