"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-center text-sm text-gray-500">
          © {currentYear} Все права защищены
        </p>
      </div>
    </footer>
  );
}