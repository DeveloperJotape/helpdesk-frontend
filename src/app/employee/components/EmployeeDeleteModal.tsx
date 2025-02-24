import { EmployeeResponseDTO } from "@/app/types/EmployeeResponseDTO";
import { deleteEmployee } from "@/service/employeeService";
import { useState } from "react";

interface EmployeeDeleteModalProps {
  employee: EmployeeResponseDTO;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EmployeeDeleteModal({
  employee,
  onClose,
  onSuccess,
}: EmployeeDeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteEmployee(employee.id);

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 0);
    } catch (error) {
      console.error("Erro ao deletar colaborador:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-3xl mb-2">Deletar Colaborador</h3>
        <p className="mb-8 mt-8">
          Você tem certeza que quer deletar o colaborador {employee?.name}?
        </p>
        {/* Botões */}
        <div className="modal-action mt-4 flex justify-end gap-2">
          <button
            className="btn btn-error"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deletando..." : "Deletar"}
          </button>
          <button className="btn btn-success" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  );
}
