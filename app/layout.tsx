import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Games – Virtual Launch Pro',
  description: 'Engage your clients with interactive tax education games. Powered by Virtual Launch Pro.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
