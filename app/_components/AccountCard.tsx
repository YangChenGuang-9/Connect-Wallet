"use client";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAccount, useDisconnect, useBalance } from "wagmi";
import {useState} from "react";

export default function AccountCard() {
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const [copyStatus,setCopyStatus] = useState(false);
	const { data, isLoading } = useBalance({
		address: address,
	})

	const handleAddressCopy = async () => {
		await navigator.clipboard.writeText(address!)
		setCopyStatus(true)
		setTimeout(() => setCopyStatus(false),1500)
	}
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-2">
				<Label htmlFor="email" className={"text-lg"}>Address:</Label>
				<p id="email">{address}</p>
			</div>
			<div className="flex items-center gap-2">
				<Label htmlFor="eth" className={"text-lg"}>assets:</Label>
				<p id="eth">{ isLoading ? "loading..." : `${data?.formatted} ${data?.symbol}`}</p>
				{isLoading}
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant={"outline"}
					onClick={handleAddressCopy}
					className={"w-full hover:text-green-600 hover:border-green-600 hover:bg-transparent"}
				>
					{copyStatus ? <span className={"text-green-600 "}>Copied! 😀</span> : "Copy Address"}
				</Button>
				<Button
					variant={"outline"}
					onClick={() => disconnect()}
					className={"w-full hover:text-sky-500 hover:border-sky-500 hover:bg-transparent"}
				>
					Disconnect
				</Button>
			</div>
		</div>
	)
}
