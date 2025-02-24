import { EmployeeResponseDTO } from "@/app/types/EmployeeResponseDTO";
import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import EmployeeDeleteModal from "./EmployeeDeleteModal";

interface EmployeeTableProps {
  employees: EmployeeResponseDTO[];
  departments: { [key: string]: string };
  userRole: { [key: string]: string };
  onDeleteSuccess: () => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  departments,
  onDeleteSuccess,
}) => {
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeResponseDTO | null>(null);

  return (
    <>
      <table className="table w-full max-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left font-semibold">Nome</th>
            <th className="py-3 px-4 text-left font-semibold">CPF</th>
            <th className="py-3 px-4 text-left font-semibold">Telefone</th>
            <th className="py-3 px-4 text-left font-semibold">Email</th>
            <th className="py-3 px-4 text-left font-semibold">Departamento</th>
            <th className="py-3 px-4 text-left font-semibold">Status</th>
            <th className="py-3 px-4 text-left font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="py-3 px-4">{employee.name}</td>
              <td className="py-3 px-4">{employee.cpf}</td>
              <td className="py-3 px-4">{employee.phone}</td>
              <td className="py-3 px-4">{employee.email}</td>
              <td className="py-3 px-4">{departments[employee.department]}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    employee.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.isActive ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td className="flex gap-2">
                <button className="btn btn-ghost btn-sm">
                  <Pencil size={18} className="text-success" />
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <Trash size={18} className="text-error" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEmployee && (
        <EmployeeDeleteModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onSuccess={() => {
            setSelectedEmployee(null);
            onDeleteSuccess();
          }}
        />
      )}
    </>
  );
};

export default EmployeeTable;
