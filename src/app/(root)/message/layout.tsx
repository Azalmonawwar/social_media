import MessageList from "@/components/shared/MessageList"


export default function MessageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <MessageList />
            {children}
        </>
    )
}
