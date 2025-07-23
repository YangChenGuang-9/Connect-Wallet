"use client";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {useAccount, useDisconnect, useBalance, useSendTransaction} from "wagmi";
import {useState, useCallback} from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { parseEther } from "viem";

export default function AccountCard() {
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const [copyStatus, setCopyStatus] = useState(false);
	const [disconnecting, setDisconnecting] = useState(false);
	const { data, isLoading, refetch } = useBalance({
		address: address,
		// enabled: !!address, // 移除不支持的 enabled 属性
	});

	const [toAddress, setToAddress] = useState("");
	const [amount, setAmount] = useState("");
	const [txError, setTxError] = useState("");

	const {
		sendTransaction,
		isSuccess: txSuccess,
		isError: txIsError,
		reset: resetTx
	} = useSendTransaction();

	// 复制地址，增加异常处理，复制后按钮短暂禁用
	const handleAddressCopy = useCallback(async () => {
		if (!address) return;
		try {
			await navigator.clipboard.writeText(address);
			setCopyStatus(true);
			setTimeout(() => setCopyStatus(false), 1500);
		} catch (e) {
			setCopyStatus(false);
			alert("Copy failed, please copy manually");
		}
	}, [address]);

	// 断开连接，增加 loading 状态
	const handleDisconnect = useCallback(async () => {
		setDisconnecting(true);
		try {
			await disconnect();
		} finally {
			setDisconnecting(false);
		}
	}, [disconnect]);

	// 发送 ETH 交易
	const handleSend = useCallback(() => {
		setTxError("");
		if (!toAddress || !amount) {
			setTxError("Please enter the destination address and amount");
			return;
		}
		try {
			sendTransaction({
				to: toAddress as `0x${string}`,
				value: parseEther(amount),
			});
		} catch (e: any) {
			console.log(e, "e");
			setTxError(e?.message || "Transaction Failure");
		}
	}, [toAddress, amount, sendTransaction]);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col sm:flex-row items-center gap-2">
				<Label htmlFor="address" className={"text-lg text-muted-foreground self-start font-bold"}>Address:</Label>
				<p id="address" className="break-all min-w-[120px]">{address || <span className="text-gray-400">Not connected</span>}</p>
			</div>
			<div className="flex items-center gap-2">
				<Label htmlFor="eth" className={"text-lg text-muted-foreground font-bold"}>Assets:</Label>
				<p id="eth">{!address ? <span className="text-gray-400">-</span> : isLoading ? "loading..." : `${data?.formatted ?? '-'} ${data?.symbol ?? ''}`}</p>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant={"outline"}
					onClick={handleAddressCopy}
					className={"w-full hover:text-green-600 hover:border-green-600 hover:bg-transparent"}
					disabled={!address || copyStatus}
				>
					{copyStatus ? <span className={"text-green-600"}>Copied! 😀</span> : "Copy Address"}
				</Button>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={"w-full hover:text-red-600 hover:border-red-600 hover:bg-transparent"}
							disabled={!address || disconnecting}
						>
							{disconnecting ? "Disconnecting..." : "Disconnect"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-45 mr-2" side="top" align="center" sideOffset={8}>
						<div className="grid gap-4">
							<div className="space-y-2">
								<p className="text-muted-foreground text-sm">
									Please confirm whether to disconnect.
								</p>
								<Button
									onClick={handleDisconnect}
									variant={"outline"}
									className={"w-16 h-7 float-right"}
									disabled={disconnecting}
								>
									{disconnecting ? "Processing..." : "Confirm"}
								</Button>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
			{/* 链上交互区块 */}
			<div className="flex flex-col gap-2 p-4 border rounded-lg bg-muted/30">
				<div className="font-bold mb-1">Send ETH</div>
				<input
					className="border rounded px-2 py-1 text-sm"
					placeholder="Target Address"
					value={toAddress}
					onChange={e => setToAddress(e.target.value)}
				/>
				<input
					className="border rounded px-2 py-1 text-sm"
					placeholder="Amount (ETH)"
					value={amount}
					onChange={e => setAmount(e.target.value)}
				/>
				<Button
					variant="default"
					className="w-full mt-2"
					onClick={handleSend}
					disabled={!address}
				>
					Send
				</Button>
				{txSuccess && <div className="text-green-600 text-xs mt-1">Transaction confirmed!</div>}
				{txIsError && <div className="text-red-600 text-xs mt-1">Transaction Failure!</div>}
				{txError && <div className="text-red-600 text-xs mt-1">{txError}</div>}
			</div>
		</div>
	);
}
