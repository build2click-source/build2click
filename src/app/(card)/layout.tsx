import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BUILD2CLICK | Digital Business Card',
};

export default function CardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>{children}</body>
        </html>
    );
}
