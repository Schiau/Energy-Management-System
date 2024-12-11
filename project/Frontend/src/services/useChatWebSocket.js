import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

const useChatWebSocket = () => {
    const client = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messagesSock, setMessagesSock] = useState([]);
    const [lastMessages, setLastMessage] = useState(null);
    const [connectedUsers, setConnectedUsers] = useState([]);


    useEffect(() => {
            //ws://localhost:8083
            //ws://microservice4.localhost
        client.current = new Client({
            brokerURL: 'ws://microservice4.localhost/ws',
            debug: (str) => console.log("STOMP Debug:", str),
            reconnectDelay: 5000, // Retry connection after 5 seconds
        });

        // Handle connection
        client.current.onConnect = () => {
            console.log("Connected to WebSocket!");
            setIsConnected(true);

            // Subscribe to the topics
            client.current.subscribe('/chatroom', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setMessagesSock((prevMessages) => {
                    const updatedMessages = [...prevMessages, {...parsedMessage, isRead:false }];
                    return updatedMessages;
                });
                setLastMessage(parsedMessage);
            });

            client.current.subscribe('/chatroom/connected-users', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setConnectedUsers(parsedMessage);
                console.log(parsedMessage)
            });
        };

        // Handle errors
        client.current.onStompError = (frame) => {
            console.error("WebSocket error:", frame.headers['message']);
        };

        // Activate the client
        client.current.activate();

        // Cleanup on unmount
        return () => {
            if (client.current) {
                client.current.deactivate();
            }
        };
    }, []);


    const sendMessage = (message) => {
        if (isConnected && client.current) {
            client.current.publish({
                destination: '/app/message',
                body: JSON.stringify(message),
            });
        } else {
            console.error("Cannot send message, client not connected.");
        }
    };

    return {isConnected,lastMessages,connectedUsers, messagesSock ,sendMessage};
};

export default useChatWebSocket;
