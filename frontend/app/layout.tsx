import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Recipes World",
  description: "Кухни и рецепты мира",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}