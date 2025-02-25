"use client";

import Sidebar from "../components/sidebar/page";
import { getEmployees } from "@/service/employeeService";
import { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import { EmployeeResponseDTO } from "../types/EmployeeResponseDTO";
import ToastNotification from "../components/toast-notification/page";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchAllEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Erro ao buscar colaboradores: " + err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const departments = {
    ACCOUNTING: "Departamento de Contabilidade",
    COMMERCIAL: "Departamento Comercial",
    FINANCIAL: "Departamento Financeiro",
    LEGAL: "Departamento Jurídico",
    TECHNOLOGY: "Departamento de Tecnologia",
  };

  const userRole = {
    ADMIN: "Administrador",
    MANAGER: "Gerente",
    REGULAR: "Colaborador",
  };

  if (loading) {
    return <div className="text-center mt-8">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  const safeEmployees = employees || [];

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleDeleteSuccess = () => {
    fetchAllEmployees();
    showToast("Colaborador excluído com sucesso!");
  };

  const handleEditSuccess = () => {
    fetchAllEmployees();
    showToast("Colaborador atualizado com sucesso!");
  };

  const handleCreateSuccess = () => {
    fetchAllEmployees();
    showToast("Colaborador criado com sucesso!");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        {toastMessage && (
          <ToastNotification
            message={toastMessage}
            onClose={() => setToastMessage("")}
          />
        )}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-8">Lista de Colaboradores</h1>
          <button
            className="btn btn-success"
            onClick={() => setModalOpen(true)}
          >
            Novo Colaborador
          </button>
        </div>

        {/* Modal de novo colaborador */}
        {modalOpen && (
          <dialog open className="modal">
            <EmployeeForm
              onClose={() => setModalOpen(false)}
              onSuccess={handleCreateSuccess}
            />
          </dialog>
        )}

        <div className="overflow-x-auto w-full">
          <EmployeeTable
            employees={safeEmployees}
            departments={departments}
            userRole={userRole}
            onDeleteSuccess={handleDeleteSuccess}
            onEditSuccess={handleEditSuccess}
          />
        </div>
      </div>
    </div>
  );
}
