import React, {useState, useEffect} from 'react';
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5003/get-messages');
            setMessages(prev => [data, ...prev]);
            await subscribe();
        } catch (e) {
            setTimeout(() => {
                subscribe();
            }, 500)
        }
    }
    const sendMessage = async () => {
        await axios.post('http://localhost:5003/new-messages', {
            message: value,
            id: Date.now()
        })
    }
    return (
        <div>
            <div>
                <input value={value} onChange={(e) => setValue(e.target.value)} type='text'/>
                <button onClick={sendMessage}>Send message</button>
            </div>
            <div>
                {messages.map(mess => (
                    <div key={mess.id}>
                        {mess.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LongPulling;