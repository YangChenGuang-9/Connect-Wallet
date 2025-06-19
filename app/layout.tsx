import '@/lib/global.css'
import { zcoolXiaoWei } from '@/lib/font/fonts';
import Provider from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
          <body className={`${zcoolXiaoWei.className} flex flex-col min-h-screen relative text-textColor`}>
            <Provider>
              {children}
            </Provider>
          </body>
      </html>
  );
}
