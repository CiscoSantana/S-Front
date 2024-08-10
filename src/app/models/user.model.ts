export interface User {
    id: number;
    login: string;
    passwd: string | null;
    email: string;
    createAt: string;
    deletedAt: string | null;
    isEnabled: boolean;
  }
  