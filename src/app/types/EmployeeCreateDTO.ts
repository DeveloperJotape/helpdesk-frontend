export interface EmployeeCreateDTO {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  department: string;
  userRole: string;
  isActive: boolean;
  admissionDate: string;
  departureDate?: string | null;
}
