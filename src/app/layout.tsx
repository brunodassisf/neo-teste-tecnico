import AntdProvider from "@/lib/AntdProvider";
import Template from "@/modules/Template";
import '../global.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AntdProvider>
          <Template>
            {children}
          </Template>
        </AntdProvider>
      </body>
    </html>
  );
}
