"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Regex para validación de email
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

interface EmailValidation {
  isValid: boolean;
  errorMessage: string | null;
}

export function EmailForm({ onSubmit }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const validateEmail = (emailValue: string): EmailValidation => {
    const trimmedEmail = emailValue.trim();

    if (!trimmedEmail) {
      return { isValid: false, errorMessage: null }; // No mostrar error si está vacío
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return { isValid: false, errorMessage: "Ingresa un email válido" };
    }

    return { isValid: true, errorMessage: null };
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!hasInteracted && newEmail.length > 0) {
      setHasInteracted(true);
    }

    if (hasInteracted) {
      const validation = validateEmail(newEmail);
      setEmailError(validation.errorMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEmail(email);

    if (!validation.isValid) {
      setHasInteracted(true);
      setEmailError(validation.errorMessage);
      return;
    }

    // Email válido - proceder con envío
    onSubmit(email.trim());
    setEmail("");
    setEmailError(null);
    setHasInteracted(false);
  };

  // Verificar si el email actual es válido
  const currentValidation = validateEmail(email);
  const isEmailValid = currentValidation.isValid;

  return (
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
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={handleEmailChange}
              className={cn(
                "w-full",
                emailError && hasInteracted
                  ? "border-red-500 ring-red-500"
                  : "",
              )}
              aria-invalid={emailError && hasInteracted ? "true" : "false"}
              aria-describedby={
                emailError && hasInteracted ? "email-error" : undefined
              }
            />
            {emailError && hasInteracted && (
              <p
                id="email-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {emailError}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="cyan"
            className="w-full"
            disabled={!isEmailValid || !email.trim()}
          >
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
