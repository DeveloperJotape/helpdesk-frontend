"use client";

import { EmployeeCreateDTO } from "@/app/types/EmployeeCreateDTO";
import { EmployeeResponseDTO } from "@/app/types/EmployeeResponseDTO";
import { createEmployee, updateEmployee } from "@/service/employeeService";
import { useEffect, useState } from "react";

interface EmployeeFormProps {
  employee?: EmployeeResponseDTO;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EmployeeForm({
  employee,
  onClose,
  onSuccess,
}: EmployeeFormProps) {
  const isEditMode = !!employee;

  const departments = {
    ACCOUNTING: "Contabilidade",
    COMMERCIAL: "Comercial",
    FINANCIAL: "Financeiro",
    LEGAL: "Jurídico",
    TECHNOLOGY: "Tecnologia",
  };

  {
    /*Key / Value */
  }
  const userRoles = {
    ADMIN: "Administrador",
    MANAGER: "Gerente",
    REGULAR: "Colaborador",
  };

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [admissionDate, setAdmissionDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setCpf(employee.cpf);
      setPhone(employee.phone);
      setEmail(employee.email);
      setDepartment(employee.department);
      setUserRole(employee.userRole);
      setIsActive(employee.isActive);
      setAdmissionDate(formatDateForInput(employee.admission));
      setDepartureDate(
        employee.departure ? formatDateForInput(employee.departure) : ""
      );
    }
  }, [employee]);

  function formatDateForInput(dateStr: string | null): string {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }

  const convertDateFormat = (dateStr: string): string => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSave = async () => {
    const formattedAdmission = convertDateFormat(admissionDate);
    const formattedDeparture = isActive
      ? null
      : convertDateFormat(departureDate);

    const employeeData: EmployeeCreateDTO = {
      name,
      cpf,
      phone,
      email,
      password: isEditMode ? "" : password,
      department, // Valor em inglês, ex.: "ACCOUNTING"
      userRole,
      isActive,
      admissionDate: formattedAdmission,
      departureDate: formattedDeparture,
    };

    try {
      if (isEditMode) {
        await updateEmployee(employee.id, employeeData);
      } else {
        await createEmployee(employeeData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao criar colaborador:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-3xl mb-2">
          {isEditMode ? "Editar Colaborador" : "Cadastro de Colaborador"}
        </h3>
        <p className="mb-8">
          {isEditMode
            ? "Atualize os dados do colaborador."
            : "Preencha o formulário para cadastrar um novo colaborador!"}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Nome"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="CPF"
            className="input input-bordered w-full"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            className="input input-bordered w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isEditMode && (
            <input
              type="password"
              placeholder="Senha"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </div>

        {/* SELECTS */}
        <div className="flex flex-col gap-1 w-full grid grid-cols-2 gap-4 mt-4">
          {/* Departamento */}
          <select
            className="select select-bordered w-full"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option disabled value="">
              Selecione um departamento
            </option>
            {Object.entries(departments).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {/* Nível */}
          <select
            className="select select-bordered w-full"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option disabled value="">
              Selecione o nível de acesso ao sistema
            </option>
            {Object.entries(userRoles).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* DATAS */}
        <div className="flex flex-col gap-1 w-full grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm">Data de Admissão</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm">Data de Demissão</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              disabled={isActive}
            />
            {/* Switch de Status (adicionar o activate e deativate ) */}
            <div className="items-center col-span-2 mt-3 mb-3">
              <label className="text-sm">Situação do Colaborador</label>
              <div className="flex gap-2 mt-3">
                <span className="text-sm">Inativo</span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <span className="text-sm">Ativo</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-action mt-4 flex justify-end gap-2">
          <button className="btn btn-success" onClick={handleSave}>
            {isEditMode ? "Salvar Alterações" : "Cadastrar"}
          </button>
          <button className="btn btn-error" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
