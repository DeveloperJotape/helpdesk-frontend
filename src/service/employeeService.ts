import { EmployeeCreateDTO } from "@/app/types/EmployeeCreateDTO";
import { EmployeeResponseDTO } from "@/app/types/EmployeeResponseDTO";
import api from "@/config/axios";

export const getEmployees = async (): Promise<EmployeeResponseDTO[]> => {
  const response = await api.get<EmployeeResponseDTO[]>("/employees");
  return response.data;
};

export const createEmployee = async (
  employee: EmployeeCreateDTO
): Promise<EmployeeResponseDTO> => {
  const response = await api.post<EmployeeResponseDTO>("/employees", employee);
  return response.data;
};
