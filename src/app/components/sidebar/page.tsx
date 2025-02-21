// src/components/Sidebar.tsx
"use client";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

// Marque como Client Component

export default function Sidebar() {
  return (
    <div className="flex">
      {/* Menu lateral */}
      <div className="w-64 min-h-screen bg-success p-4 rounded-md text-base-100">
        <h1 className="text-3xl font-semibold p-4 text-center">ASSEMDF</h1>
        <ul className="menu pl-0 pb-8">
          {/* Itens do menu */}
          <li>
            <Link href="/employee">
              <BriefcaseBusiness />
              Colaboradores
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
