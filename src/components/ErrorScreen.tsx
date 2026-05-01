import React from "react";


export interface ErrorMessage {
    message: string
    type: 'warning ' | 'fail'
}

const ErrorScreen: React.FC<ErrorMessage> = (error: ErrorMessage) => {
    const refreshPage = () => {
        window.location.reload()
    }
    return (
        <div className="w-10/12 lg:w-6/12 mx-auto">
            <div
                className={`rounded-xl ${error.type === 'fail' ? 'border-rose-500 bg-rose-200 ' : 'border-yellow-500 bg-yellow-200 '} "border"`}
            >
                <div className="py-8 px-4 flex-col md:flex space-y-3">
                    <div className="flex gap-2">
                        <div className="flex gap-1">
                            <span className={`${error.type === 'fail' ? 'text-pink-500' : 'text-yellow-400'} material-icons-outlined`}>info</span>
                            <p className="text-small text-black">{error.message}</p>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end gap-2">



                                <button
                                    onClick={() => refreshPage()}
                                    className="btn  bg-black shadow-none rounded-xl p-4"
                                >
                                    <span className="text-white text-extra-small">Refresh page</span>
                                </button>


                            {/*<button className="btn bg-dark-two p-4 rounded-xl flex">*/}
                            {/*    <span className="material-icons-outlined  text-casablanca-500 lg:text-lg text-sm">loop</span>*/}
                            {/*    <span className="text-small text-nowrap text-white">Regenerate Response</span>*/}
                            {/*</button>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorScreen