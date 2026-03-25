import React from 'react'


const UserInput: React.FC = () => {
    return (
        <div>
            <textarea
                className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Type your message here...">

            </textarea>
        </div>
    )

}

export default UserInput