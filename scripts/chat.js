const supabaseUrl = 'https://zmwzcrqiwcengzbjfopr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptd3pjcnFpd2Nlbmd6Ympmb3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxOTE3NzAsImV4cCI6MjA0NDc2Nzc3MH0.GL_XkNteUY9tAB5DJ26nnvZq34-gBz3zGPAibB4PnLk';
const supabaseSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptd3pjcnFpd2Nlbmd6Ympmb3ByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTE5MTc3MCwiZXhwIjoyMDQ0NzY3NzcwfQ.8hYs6XE3A6swCkp6xItcUuXRJpGrcFAeDH8f-uKzwLo';

const supabase = createClient(supabaseUrl, supabaseKey, supabaseSecret);

const chatContainer = document.getElementById('chat-container');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Listen for new messages
supabase.from('messages').on('INSERT', (payload) => {
    const message = payload.new;
    const messageHTML = `
        <div class="message">
            <span class="username">${message.username}</span>
            <span class="message-text">${message.text}</span>
        </div>
    `;
    messagesContainer.innerHTML += messageHTML;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Send message
sendButton.addEventListener('click', async () => {
    const text = messageInput.value.trim();
    if (text) {
        const { data, error } = await supabase.from('messages').insert([
            {
                username: 'Anonymous', // Replace with actual username
                text,
            },
        ]);
        if (error) console.error(error);
        messageInput.value = '';
    }
});

// Initialize chat
async function initChat() {
    const { data, error } = await supabase.from('messages').select('*');
    if (error) console.error(error);
    data.forEach((message) => {
        const messageHTML = `
            <div class="message">
                <span class="username">${message.username}</span>
                <span class="message-text">${message.text}</span>
            </div>
        `;
        messagesContainer.innerHTML += messageHTML;
    });
}

initChat();
