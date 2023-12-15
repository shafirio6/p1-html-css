function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatBox = document.getElementById('chatBox');

    // Create a user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userInput;

    // Append the user message to the chat box
    chatBox.appendChild(userMessage);

    // Clear the user input field
    document.getElementById('userInput').value = '';

    // Simulate an AI response (you can replace this with actual AI responses)
    setTimeout(function() {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.textContent = 'AI response goes here.';
        chatBox.appendChild(aiMessage);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500); // Simulating a delay for the AI response
}
