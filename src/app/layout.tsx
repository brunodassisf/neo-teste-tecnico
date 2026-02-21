import AntdProvider from "@/lib/AntdProvider";
import Template from "@/components/Template";
import '../global.css'
import { App } from "antd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AntdProvider>
          <App>
            <Template>
              {children}
            </Template>
          </App>
        </AntdProvider>
      </body>
    </html>
  );
}
