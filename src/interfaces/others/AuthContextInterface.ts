import { UserInterface } from '@/interfaces/others/UserInterface';

export interface AuthContextInterface {
  isAuthenticated?: boolean,
  isLoading?: boolean,
  login?: (user:UserInterface) => void,
  register?: (user:UserInterface) => void,
  logout?: () => void,
}
