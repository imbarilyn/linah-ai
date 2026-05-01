

const AIChatBubble = ({message, isError,  isLoading}: {message: string, isError: boolean, isLoading: boolean},  ) => {
    return (
        <div className="flex 'justify-end'">
            <div
                className="max-w-md text-wrap text-slate-900 bg-casablanca-500 shadow-sm  rounded-2xl px-4 py-3">
                <p className="leading-relaxed text-black">{message}</p>
            </div>
        </div>
    )
}

export default AIChatBubble