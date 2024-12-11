import { useState, useEffect } from 'react';
import useChatWebSocket from '../../services/useChatWebSocket';

const Chat = ({ userName }) => {
    const { isConnected,connectedUsers,lastMessages, messagesSock, sendMessage } = useChatWebSocket();
    const [message, setMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      if (isConnected) {
          const joinMessage = {
              senderName: userName,
              receiverName: '',
              message: `${userName} has joined the chat`,
              status: "JOIN"
          };
          sendMessage(joinMessage);
      }

      return () => {
          if (isConnected) {
              const leftMessage = {
                  senderName: userName,
                  receiverName: '',
                  message: `${userName} has left the chat`,
                  status: "LEAVE"
              };
              sendMessage(leftMessage);
          }
      };
  }, [userName, isConnected]);

    const handleSendMessage = () => {
        if (message.trim() && selectedUser != null) {
          let content ={
             senderName: userName, 
             receiverName: selectedUser,
             message: message ,
             status: "MESSAGE"
            }
            sendMessage(content);
            setMessage("");
            console.log(messagesSock);
        }
    };

    const sendTyping = () =>{
      if (message.trim() && selectedUser != null) {
        let content ={
          senderName: userName, 
          receiverName: selectedUser,
          message: "" ,
          status: "TYPING"
          }
          sendMessage(content);
      }
    }

    useEffect(() => {
      if(lastMessages == null) return;
      if(lastMessages.receiverName === userName && lastMessages.senderName === selectedUser && lastMessages.status === "TYPING")
      {
        setIsTyping(true);
        messagesSock.filter(msg => msg.status === "MESSAGE" &&
          msg.senderName === userName && (msg.receiverName === selectedUser || msg.receiverName === "all")
        ).map((msg) => msg.isRead = true)
      }

      if(isTyping)
      {
        if(lastMessages.receiverName === userName && lastMessages.senderName === selectedUser && lastMessages.status === "MESSAGE")
          {
            setIsTyping(false);
          }
      }
      console.log(lastMessages)
    },[lastMessages])

    const handleChangeMessage = (e) => {
      setMessage(e.target.value);
      sendTyping();
    };

    const handleChangeSender = e =>
    {
        setSelectedUser(e.target.value);
        setIsTyping(false)
    }

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <select
                  value={selectedUser}
                  onChange={(e) => handleChangeSender(e)}
                  style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', flex: 1 }}
              >
                  <option key={0} value={''}></option>
                  {userName === "Admin" && <option key={1} value={'all'}>
                      All
                  </option>}
                  {connectedUsers
                      .filter((u) => u !== userName)
                      .map((user, index) => (
                          <option key={index + 2} value={user}>
                              {user}
                          </option>
                      ))}
              </select>
              <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleChangeMessage}
                  style={{
                      padding: '0.5rem',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      flex: 2,
                      marginRight: '0.5rem',
                  }}
              />
              <button
                  onClick={handleSendMessage}
                  disabled={!isConnected || !message.trim() || !selectedUser}
                  style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                  }}
              >
                  Send
              </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Messages</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {messagesSock
                      .filter(
                          (msg) =>
                              msg.status === 'MESSAGE' &&
                              (msg.senderName === userName || msg.senderName === selectedUser) &&
                              (msg.receiverName === userName || msg.receiverName === selectedUser || msg.receiverName === 'all')
                      )
                      .map((msg, index) => (
                          <li
                              key={index}
                              style={{
                                  marginBottom: '0.8rem',
                                  padding: '0.8rem',
                                  backgroundColor: msg.senderName === userName ? (msg.isRead ? '#d4edda' : '#f8d7da') : '#f1f1f1',
                                  borderRadius: '10px',
                                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                  alignSelf: msg.senderName === userName ? 'flex-end' : 'flex-start',
                                  maxWidth: '70%',
                                  wordWrap: 'break-word',
                              }}
                          >
                              <strong>{msg.senderName}:</strong> {msg.message}
                          </li>
                      ))}
                  {isTyping && (
                      <li
                          key={messagesSock.length + 1}
                          style={{
                              marginBottom: '0.8rem',
                              padding: '0.8rem',
                              fontStyle: 'italic',
                              backgroundColor: '#f1f1f1',
                              borderRadius: '10px',
                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                          }}
                      >
                          <strong>{selectedUser} is typing...</strong>
                      </li>
                  )}
              </ul>
          </div>
      </div>
  );
};

export default Chat;
