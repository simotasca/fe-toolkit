import { Button, Text, Title } from "@pkg/ui";
import { Link } from "react-router";

export function NotFoundCard() {
  return (
    <div className="vbox gap-y-2 border-l-2 py-1 px-10">
      <Title className="gap-x-2">
        <span>404</span>
        <span className="opacity-30">|</span>
        <span>Pagina non trovata</span>
      </Title>
      <Text>
        Il contenuto che stai cercando potrebbe essere stato spostato oppure
        rimosso.
      </Text>
      <Link to="/" className="mt-5">
        <Button color="sky">TORNA ALLA HOME</Button>
      </Link>
    </div>
  );
}
