import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

const useDeviceWebSocket = () => {
    const client = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessages] = useState([]);
    const [overEnergyMessage, setOverEnergyMessage] = useState([]);
    useEffect(() => {
        // Initialize the STOMP client
        client.current = new Client({
            brokerURL: 'ws://microservice3.localhost/ws',
            debug: (str) => console.log("STOMP Debug:", str),
            reconnectDelay: 5000, // Retry connection after 5 seconds
        });

        // Handle connection
        client.current.onConnect = () => {
            console.log("Connected to WebSocket!");
            setIsConnected(true);

            // Subscribe to the topics
            client.current.subscribe('/devices', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setMessages(parsedMessage);
            });

            client.current.subscribe('/devices/new', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setNewMessages(parsedMessage);
            });

            client.current.subscribe('/overEnergy', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setOverEnergyMessage(parsedMessage);
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


    const sendMeasurement = (measurementDto) => {
        if (isConnected && client.current) {
            client.current.publish({
                destination: '/app/measurement',
                body: JSON.stringify(measurementDto),
            });
        } else {
            console.error("Cannot send measurement, client not connected.");
        }
    };

    const init = () => {
        if (isConnected && client.current) {
            client.current.publish({
                destination: '/app/init',
            });
        } else {
            console.error("Cannot send measurement, client not connected.");
        }
    };

    return {isConnected, messages ,newMessage ,sendMeasurement, overEnergyMessage, init };
};

export default useDeviceWebSocket;
