"use client";

import { useState } from "react";
import { EmailForm } from "@/components/EmailForm";
import { Header } from "@/components/Header";
import { Terminal, type TerminalEntry } from "@/components/Terminal";

export default function Home() {
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);

  const handleEmailSubmit = (email: string) => {
    const newEntry: TerminalEntry = {
      timestamp: new Date().toLocaleTimeString(),
      email: email,
    };
    setTerminalEntries((prev) => [...prev, newEntry]);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header title="Demo de Formulario" subtitle="Charla CITIC - SIB 2025" />

        <EmailForm onSubmit={handleEmailSubmit} />

        <Terminal entries={terminalEntries} />
      </div>
    </div>
  );
}
