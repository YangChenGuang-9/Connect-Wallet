"use client";
import { Button } from "@/components/ui/button";
import { Unplug } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useConnect, Connector, useAccount, useDisconnect } from "wagmi"
import Image from "next/image";
import Link from "next/link";
import { walletList } from "@/lib/constants";
import {useState} from "react";
import { useMounted } from "@/hooks/useMounted";
import AccountCard from "./_components/AccountCard"

const descList = [
  {
    icon: "https://mdn.alipayobjects.com/huamei_mutawc/afts/img/A*ApSUSaoUa_sAAAAAAAAAAAAADlrGAQ/original",
    title: "Manage your private key and assets",
    desc: "Manage your private key and the assets of the corresponding chain address",
  },
  {
    icon: "https://mdn.alipayobjects.com/huamei_mutawc/afts/img/A*3lD7QpnbCPcAAAAAAAAAAAAADlrGAQ/original",
    title: "Help you connect to DApp",
    desc: "Authorize DApp to get your address, similar to login",
  },
  {
    icon: "https://mdn.alipayobjects.com/huamei_mutawc/afts/img/A*gTROQqEY_TcAAAAAAAAAAAAADlrGAQ/original",
    title: "Call smart contract",
    desc: "Through authorization of private key signature, initiate interaction with smart contract on the chain",
  },
]

export default function Home() {
  let { connect, connectors } = useConnect({
    mutation: {
      onSuccess(data) {
        handleOpenChange(false)
      }
    }
  });
  const { isConnecting, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const mounted = useMounted();
  const [icon, setIcon] = useState("");
  const [open,setOpen] = useState(false);
  connectors = connectors.filter(i => i.name !== "Injected")
  const notInstalledWallets = walletList.filter((item) => {
    return !connectors.some(connector => connector.name === item.name);
  });

  const handleWalletConnect = (connector:Connector) => {
    connect({connector})
    setIcon(connector.icon!)
  }
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  if(!mounted) {
    return <></>
  }
  if(isConnected) {
    return (
      <div className={"flex-1 flex items-center justify-center"}>
        <AccountCard />
      </div>
    )
  }
  return (
    <div className={"flex-1 flex items-center justify-center"}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <form>
          <DialogTrigger asChild>
            <Button
              className={"rounded-full w-36 bg-sky-400 hover:bg-sky-500"}
              variant={"expandIcon"}
              onClick={() => handleOpenChange(true)}
              Icon={Unplug}
            >
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px] p-0">
            <div className={"min-h-[470px] w-full grid grid-cols-[45%_55%]"}>
              <div className={"border-r border-gray-200 p-4"}>
                <DialogTitle>Connect Wallet</DialogTitle>
                <DialogDescription className={"mt-2"}>
                  Select the wallet you are using.
                </DialogDescription>
                <div className={"grid gap-4 mt-4"}>
                  {/*installed*/}
                  {
                    connectors.length > 0 && (
                      <div className={"text-gray-600 text-sm"}>
                        <strong>Already installed:</strong>
                      </div>
                    )
                  }
                  {
                    connectors.length > 0 && connectors.map((connector) => (
                      <Button
                        key={connector.id}
                        onClick={() => handleWalletConnect(connector)}
                        className={"w-full py-6 flex justify-start items-center bg-transparent text-gray-800 hover:bg-gray-100 hover:text-gray-900"}
                      >
                        <Image src={connector.icon!} alt={"icon"} width={30} height={30} className={"mr-4"}/>
                        {connector.name}
                      </Button>
                    ))
                  }
                  {/*Not Installed*/}
                  {notInstalledWallets.length > 0 && (
                    <div className={"text-gray-600 text-sm"}>
                      <strong>Recommended installation:</strong>
                    </div>
                  )}
                  {
                    notInstalledWallets.length > 0 && notInstalledWallets.map((connector, index) => (
                      <Button
                        key={index}
                        onClick={() => window.open(connector.url, "_blank")}
                        className={"w-full py-6 flex justify-start items-center bg-transparent text-gray-800 hover:bg-gray-100 hover:text-gray-900"}
                      >
                        <Image src={connector.icon!} alt={"icon"} width={30} height={30} className={"mr-4"}/>
                        {connector.name}
                        <span className={"ml-auto text-xs text-gray-500"}>(Not Installed)</span>
                      </Button>
                    ))
                  }
                </div>
              </div>
              {
                isConnecting ?
                  <div className={"flex flex-col items-center justify-center"}>
                    <Image src={icon} alt={"Connecting..."} width={50} height={50}/>
                    Connecting...
                  </div>
                  :
                  <div className={"py-10 px-8 flex flex-col justify-center items-center gap-8"}>
                    <div className={"font-extrabold text-2xl"}>What is a Wallet?</div>
                    {
                      descList.map((item) => {
                        return (
                          <div key={item.title} className={"w-full flex items-center justify-start gap-4"}>
                            <img src={item.icon} alt={item.title} width={55} height={55} className={"mt-1"}/>
                            <div>
                              <div className={"font-semibold"}>{item.title}</div>
                              <div className={"text-sm text-gray-600"}>{item.desc}</div>
                            </div>
                          </div>
                        )
                      })
                    }
                    <Link className={"w-full"} href={"https://ethereum.org/en/wallets/"} target={"_blank"}>
                      <Button
                        variant={"outline"}
                        className={"w-full hover:text-sky-500 hover:border-sky-500 hover:bg-transparent"}
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
              }
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}
