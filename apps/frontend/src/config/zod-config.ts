import { z } from 'zod';

z.config({
  customError: (iss) => {
    if (iss.code == "invalid_type" && iss.input === undefined)
      return "Campo obbligatorio";
    
    if (iss.code === "too_small" && iss.origin === "string") {
      if (iss.minimum === 1) return "Campo obbligatorio";
      else return `Minimo ${iss.minimum} caratteri`;
    }
    if (iss.code === "too_big" && iss.origin === "string")
      return `Massimo ${iss.maximum} caratteri`;
    
    if (iss.code === "invalid_format" && iss.format === "email")
      return "Indirizzo email non valido";
  },
});