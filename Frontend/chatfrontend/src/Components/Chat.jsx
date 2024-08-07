import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import { Message } from "./Message";
import { useEffect, useRef, useState} from "react";

export const Chat = ({ messages, chatRoom, closeChat, sendMessage }) => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef();

    useEffect (() => {
        messagesEndRef.current.scrollIntoView();
    }, [messages])

    const onSendMessage = () => {
        sendMessage(message);
        setMessage("")
    }

    const onKeyEnterPress = (e) => {
        if (e.code == "Enter")
            onSendMessage();
    }

    return (
        <div className="w-1/2 bg-white p-8 rounded shadow-lg">
            <div className="flex flex-row justify-between mb-5">
                <Heading size="lg">{chatRoom}</Heading>
                <CloseButton onClick={closeChat} />
            </div>
            <div className="flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3">
                {messages.map((messageInfo, index) => (
                    <Message messageInfo={messageInfo} key={index}/>
                ))}
                <span ref={messagesEndRef} />
            </div>
            <div className="flex gap-3 mb-4">
                <Input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyDown={onKeyEnterPress}
                    placeholder="Введите сообщение" />
            </div>
            <Button colorScheme="blue" onClick={onSendMessage}>Отправить</Button>
        </div>
    )
}