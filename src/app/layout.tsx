import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu App",
  description: "Exemplo de layout raiz no Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
