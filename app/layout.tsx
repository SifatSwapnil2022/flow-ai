import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/context/query-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "FlowAI",
  description: "Next-gen AI workflow automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning is required when using next-themes 
       to prevent the error you saw earlier */
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}