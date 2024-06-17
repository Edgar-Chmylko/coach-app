export interface Coach {
  id: number;
  fullName: string;
  email: string;
  managerId: number | null;
}

export interface CoachFrom {
  fullName: string;
  email: string;
  managerId: number | null;
}
