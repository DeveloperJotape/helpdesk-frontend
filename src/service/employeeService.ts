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

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

export const updateEmployee = async (
  id: string,
  employee: EmployeeCreateDTO
): Promise<EmployeeResponseDTO> => {
  const response = await api.put<EmployeeResponseDTO>(
    `/employees/${id}`,
    employee
  );
  return response.data;
};
