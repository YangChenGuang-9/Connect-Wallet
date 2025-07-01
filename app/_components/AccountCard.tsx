"use client";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAccount, useDisconnect, useBalance } from "wagmi";
import {useState} from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

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
		<div className="flex flex-col gap-5">
			<div className="flex flex-col sm:flex-row items-center gap-2">
				<Label htmlFor="email" className={"text-lg text-muted-foreground self-start font-bold"}>Address:</Label>
				<p id="email">{address}</p>
			</div>
			<div className="flex items-center gap-2">
				<Label htmlFor="eth" className={"text-lg text-muted-foreground font-bold"}>Assets:</Label>
				<p id="eth">{isLoading ? "loading..." : `${data?.formatted} ${data?.symbol}`}</p>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant={"outline"}
					onClick={handleAddressCopy}
					className={"w-full hover:text-green-600 hover:border-green-600 hover:bg-transparent"}
				>
					{copyStatus ? <span className={"text-green-600 "}>Copied! 😀</span> : "Copy Address"}
				</Button>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={"w-full hover:text-red-600 hover:border-red-600 hover:bg-transparent"}
						>
							Disconnect
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-45 mr-2" side="top" align="center" sideOffset={8}>
						<div className="grid gap-4">
							<div className="space-y-2">
								<p className="text-muted-foreground text-sm">
									Please confirm whether to disconnect.
								</p>
								<Button
									onClick={() => disconnect()}
									variant={"outline"}
									className={"w-16 h-7 float-right"}
								>
									Confirm
								</Button>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
