"use client"

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";


export const QueryClientProvider = ({ children }: {children: ReactNode}) => {
    const [client] = useState(new QueryClient())

    return <ReactQueryClientProvider client={client}>{children}</ReactQueryClientProvider>
} 
