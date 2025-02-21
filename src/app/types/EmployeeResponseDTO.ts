export interface EmployeeResponseDTO {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  department: string;
  userRole: string;
  isActive: boolean;
  admission: string;
  departure?: string | null;
}
