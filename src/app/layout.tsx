import { App } from "antd";
import AntdProvider from "@/lib/AntdProvider";
import Template from "@/components/Template";
import '../global.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="color-scheme" content="#ec6725" />
        <title>Neo Estech</title>
      </head>
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
