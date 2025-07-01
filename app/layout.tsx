import '@/lib/global.css'
import { zcoolXiaoWei } from '@/lib/font/fonts';
import Provider from "./Provider";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Connect-Wallet",
  description:
    "基于nextjs、wagmi、shadcn ui的前端项目，用于展示和使用钱包连接相关的功能。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={`${zcoolXiaoWei.className} flex flex-col min-h-screen relative text-textColor`}>
        <div
          className="absolute h-screen w-screen z-[-1] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:25px_25px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        />
        <Provider>
          <div className={"fixed top-6 right-6"}>
            <Link className={"w-full"} href={"https://github.com/YangChenGuang-9/Connect-Wallet"} target={"_blank"}>
              <Button
                variant={"expandIcon"}
                className="h-fit rounded-full bg-secondary font-semibold text-foreground hover:bg-secondary/70"
              >
                Github
                <ArrowRight className={"size-4 ml-1"}/>
              </Button>
            </Link>
          </div>
          {children}
          <div className={"fixed flex items-center bottom-6 left-1/2 -translate-x-1/2"}>
            <p className={"text-secondary-foreground font-thin w-20"}>Crafted by&nbsp;</p>
            <Link href={"https://github.com/YangChenGuang-9"} target={"_blank"}>
              <span className={"font-bold hover:underline hover:cursor-pointer"}>YangChenGuange</span>
            </Link>
          </div>
        </Provider>
      </body>
      </html>
  );
}
