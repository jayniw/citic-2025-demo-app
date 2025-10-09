"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TerminalEntry {
  timestamp: string;
  email: string;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const newEntry: TerminalEntry = {
        timestamp: new Date().toLocaleTimeString(),
        email: email.trim(),
      };
      setTerminalEntries((prev) => [...prev, newEntry]);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Demo de Formulario
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Charla CITIC - SIB 2025
          </p>
        </div>

        {/* Formulario */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Ingresa tu Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" variant="cyan" className="w-full">
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Terminal Component */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              Terminal - Datos Enviados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
              {terminalEntries.length === 0 ? (
                <div className="text-gray-500">
                  $ waiting for input...
                  <span className="animate-pulse">_</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {terminalEntries.map((entry, index) => (
                    <div
                      key={`${entry.timestamp}-${index}`}
                      className="space-y-1"
                    >
                      <div className="text-blue-400">
                        [{entry.timestamp}] $ form-submit
                      </div>
                      <div className="text-green-400 pl-4">
                        → Email: {entry.email}
                      </div>
                      <div className="text-yellow-400 pl-4">
                        ✓ Data processed successfully
                      </div>
                      {index < terminalEntries.length - 1 && (
                        <div className="border-t border-gray-700 my-2"></div>
                      )}
                    </div>
                  ))}
                  <div className="text-gray-500 mt-2">
                    $ <span className="animate-pulse">_</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
