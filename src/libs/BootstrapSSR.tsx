"use client";

import { ReactNode } from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';

export function BootstrapSSR({children}: {children: ReactNode}) {
    return (
        <SSRProvider>{children}</SSRProvider>
    )
}