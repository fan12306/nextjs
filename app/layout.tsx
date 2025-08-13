import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { CopilotKit } from '@copilotkit/react-core';
import { ThemeProvider } from "@/app/components/theme-provider"
import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import GlobalCheckActions from '@/app/components/global-check-actions';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={`${inter.className} antialiased`}>
        <CopilotKit publicApiKey="ck_pub_6161d52a08314f0b4ac7335d98c82cd5">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {/* 使用全局支票动作组件 */}
            <GlobalCheckActions />
            {children}
          </ThemeProvider>
        </CopilotKit>
      </body>
    </html>
  );
}
