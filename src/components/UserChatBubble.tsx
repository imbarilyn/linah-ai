// import type {UIMessage} from "./ChatPage.tsx";

const UserChatBubble = ({message}: {message: string}) => {
    return (
        <div className="flex justify-end">
            <div
                className="max-w-md text-wrap bg-casablanca-200 text-white shadow-md rounded-2xl px-4 py-3">
                <p className="leading-relaxed text-black">{message}</p>
            </div>
        </div>
    )
}

export default UserChatBubble