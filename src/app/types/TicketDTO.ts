import { EmployeeResponseDTO } from "./EmployeeResponseDTO";

export interface TicketDTO {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  requester: EmployeeResponseDTO;
  requested: EmployeeResponseDTO;
  priority: string;
  status: string;
}
