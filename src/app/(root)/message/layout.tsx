import MessageList from "@/components/shared/MessageList"
import Wrapper from "@/components/shared/Wrapper"


export default function MessageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className=" flex flex-row items-start justify-start gap-10     mx-2 md:px-8 lg:ml-[270px] md:ml-[100px] md:mr-0  ">
            <MessageList />
            {children}
        </div>
    )
}
