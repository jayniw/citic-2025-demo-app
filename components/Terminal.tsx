import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TerminalEntry {
  timestamp: string;
  email: string;
}

interface TerminalProps {
  entries: TerminalEntry[];
}

export function Terminal({ entries }: TerminalProps) {
  return (
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
          {entries.length === 0 ? (
            <div className="text-gray-500">
              $ waiting for input...
              <span className="animate-pulse">_</span>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => (
                <div key={`${entry.timestamp}-${index}`} className="space-y-1">
                  <div className="text-blue-400">
                    [{entry.timestamp}] $ form-submit
                  </div>
                  <div className="text-green-400 pl-4">
                    → Email: {entry.email}
                  </div>
                  <div className="text-yellow-400 pl-4">
                    ✓ Data processed successfully
                  </div>
                  {index < entries.length - 1 && (
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
  );
}
