import { useEffect, useState } from "react";

/**
 * useMounted - React hook to determine if the component has mounted.
 * @returns {boolean} mounted - True if the component is mounted on the client.
 */
export function useMounted(): boolean {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	return mounted;
}
