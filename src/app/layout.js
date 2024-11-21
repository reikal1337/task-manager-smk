import "./globals.css";

export const metadata = {
  title: "TaskMate",
  description: "Better task managment for you!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
