import React from 'react'
import DOMPurify from 'dompurify'
import {useRef, useEffect, useState} from 'react'
import {Send} from 'lucide-react'
import {v4 as uuidv4} from 'uuid';
import AIChatBubble from "../components/AIChatBubble.tsx";
import UserChatBubble from "../components/UserChatBubble.tsx";
import {sendUserMessage} from "../services/api.ts";
import {marked} from 'marked'
import {renderer} from '../modules/markdownParser.ts'
import Logo from "../assets/images/my-logo.png"
import ErrorScreen from "../components/ErrorScreen.tsx";


export interface UIMessage {
    id: string
    role: 'user' | 'assistant'
    text: string
    loading?: boolean
}

export default function ChatPage() {
    const [streaming, setStreaming] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [error, setError] = useState(false)
    const [messageContainer, setMessageContainer] = useState<UIMessage []>([])
    const userInputRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    marked.use({
        renderer,
        breaks: true,
        gfm: true,
        useNewRenderer: true,
    })

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'})
        }
        if (inputRef.current && inputRef.current.scrollHeight > 0) {
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
            inputRef.current.style.paddingBottom = '10px'
        }

    }, [messageContainer, userInput])


    // purify user input to prevent XXS attacks
    const formattedInput = () => {
        let purifiedBreak = userInput.replace(/\n/g, '<br>')
        purifiedBreak = DOMPurify.sanitize(purifiedBreak, {
            USE_PROFILES: {html: true},
            ALLOWED_TAGS: ['br'],
        })
        return purifiedBreak
    }


    const handleSubmit = async () => {
        const trimmedInput = userInput.trim()
        if (!trimmedInput) return

        const userMsg: UIMessage = {
            id: uuidv4(),
            role: 'user',
            text: formattedInput()
        }

        setMessageContainer(prev => [...prev, userMsg])
        setUserInput('')
        setStreaming(true)
        inputRef.current?.focus()

        // Simulate AI response after 500ms.
        const aiId = uuidv4()
        setTimeout(() => {
            const assistantMsg: UIMessage = {
                id: aiId,
                role: 'assistant',
                text: '',
                loading: true
            }
            setMessageContainer(prev => [...prev, assistantMsg])
            setStreaming(false)
        }, 500)

        sendUserMessage(formattedInput())
            .then((res) => {
                // console.log('ui response', res)

                if (res) {
                    setMessageContainer(prev =>
                        prev.map(msg => msg.id === aiId ? {...msg, text: res, loading: false} : msg)
                    )
                    console.log(messageContainer)

                } else {
                    setError(true)
                }
            })


    }


    return (

        <div
            className="min-h-screen relative flex flex-col">
            {/* Header */}
            <header
                className="sticky top-0 backdrop-blur-xl pb-4 flex ">
                <div className="mx-auto  flex flex-col -space-y-8 text-white">
                    <div className="flex items-center justify-center">
                        <img src={Logo} alt="logo-image" className="w-32"/>
                        <h1 className="text-2xl font-bold">Lyn AI</h1>
                    </div>
                    <div>
                        <p className="mt-1 text-sm text-center ">
                            Ask me about my profession and I'll do my best to help
                        </p>
                    </div>
                </div>
            </header>
            <div
                className="w-10/12 mx-auto pb-32">
                {/* Messages Container */}
                <div
                    className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 "
                >
                    <div className="mx-auto max-w-2xl space-y-4">
                        {messageContainer.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                                <div className="rounded-full bg-slate-200 p-4 dark:bg-slate-700">
                                    <svg
                                        className="h-8 w-8 text-slate-500 dark:text-slate-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Chat with Linah
                                </h2>
                                <p className="max-w-sm text-slate-600 dark:text-slate-300">
                                    Ask me anything about my profession, experience, or projects. I'm here to help!
                                </p>
                            </div>
                        ) : (
                            messageContainer.map((message) => {
                                // const messageText = getMessageText(message)
                                return (
                                    message.role === 'user' ?
                                        <UserChatBubble message={message.text} key={message.id}/> :
                                        <AIChatBubble isLoading={message.loading as boolean} isError={error}
                                                      message={DOMPurify.sanitize(marked.parse(message.text) as string)}
                                                      key={message.id}/>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
            {
                !error ? (
                        <div className="fixed cursor-text bottom-0 transition duration-700 ease-in-out backdrop-blur-2xl left-4 w-[calc(100vw-2rem)]  md:left-16 md:w-[calc(100vw-8rem)] xl:left-64 xl:w-[calc(100vw-32rem)]">

                            <div ref={userInputRef} className=" pb-8 px-4">
                                <div className="relative grid grid-cols-12 border-[1px] border-slate-300 rounded-2xl">
                                    <div className="col-span-11 w-full">
                                    <textarea
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                if (e.shiftKey) {
                                                    return  //shift + Enter allow new line
                                                } else if (e.ctrlKey) {
                                                    handleSubmit()
                                                }
                                                handleSubmit()
                                            }
                                        }}
                                        ref={inputRef}
                                        placeholder="Type your question..."
                                        value={userInput}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
                                        disabled={streaming}

                                        className="w-full resize-none px-4 py-2 overflow-hidden flex-1 text-white border-none focus:outline-none placeholder:text-slate-400"
                                    />
                                    </div>
                                    <div className="absolute w-full px-4 bottom-2 flex justify-end items-center">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={streaming || !userInput.trim()}
                                            className={`h-10 w-10 flex justify-center items-center p-2 rounded-full ${!userInput.trim() ? '' : 'bg-casablanca-400'}`}
                                        >
                                            <Send className="h-4 w-4"/>
                                            {/*<span className="hidden sm:inline">Send</span>*/}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <ErrorScreen type="fail" message="Something went wrong please try again"/>
                    )
            }
            <div ref={scrollRef}></div>
        </div>
    )
}
