

const AIChatBubble = ({message, isError,  isLoading}: {message: string, isError: boolean, isLoading: boolean},  ) => {
    return (
            !isError && (
                <div className="flex 'justify-end'">
                    <div

                        className="max-w-md text-wrap text-slate-900 bg-casablanca-400 shadow-sm  rounded-2xl px-4 py-3">
                        {
                            isLoading?
                                ( <span  className="loading loading-dots loading-xl"></span>)
                                :
                                (
                                    <p dangerouslySetInnerHTML={{ __html: message }}
                                       className="leading-relaxed text-black"
                                    />
                                )
                        }


                    </div>
                </div>
            )

    )
}

export default AIChatBubble