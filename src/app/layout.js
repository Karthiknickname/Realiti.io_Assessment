import "./globals.css";

export const metadata = {
  title: "Realiti.io | Task Management",
  description: "Task Management Assessment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}