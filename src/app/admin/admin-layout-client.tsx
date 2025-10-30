/** @format */

"use client";

import { SessionProvider } from "next-auth/react";
import { Providers } from "@/app/providers";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<SessionProvider>{children}</SessionProvider>
		</Providers>
	);
}
