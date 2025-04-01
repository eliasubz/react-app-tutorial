import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (message.trim()) {
            setChat([...chat, { user: 'You', text: message }]);
            setMessage('');
            try {
                const response = await axios.post('http://localhost:5000/chat/chat', { message });
                console.log(response);
                setChat([...chat, { user: 'You', text: message }, { user: 'AI', text: response.data.reply }]);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            <div>
                {chat.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}:</strong>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>

                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;