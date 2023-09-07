const selectors = {
    mihai: document.querySelector('#mihai-selector'),
    ioana: document.querySelector('#ioana-selector'),
  };
  
  const chatHeader = document.querySelector('.chat-header');
  const chatMessages = document.querySelector('.chat-messages');
  const chatInputForm = document.querySelector('.chat-input-form');
  const chatInput = document.querySelector('.chat-input');
  const clearChatBtn = document.querySelector('.clear-chat-button');
  
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  
  const createChatMessageElement = (message) => `
    <div class="message ${message.sender === expeditor.current ? 'blue-bg' : 'gray-bg'}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>
  `;
  
  window.onload = () => {
    messages.forEach((message) => {
      chatMessages.innerHTML += createChatMessageElement(message);
    });
  };
  
  const expeditor = {
    current: 'Mihai',
    update: (name) => {
      expeditor.current = name;
      chatHeader.innerText = `${expeditor.current} chatting...`;
      chatInput.placeholder = `Type here, ${expeditor.current}...`;
  
      for (const selector in selectors) {
        selectors[selector].classList.remove('active-person');
      }
  
      selectors[name.toLowerCase()].classList.add('active-person');
  
      chatInput.focus();
    },
  };
  
  for (const selector in selectors) {
    selectors[selector].onclick = () => expeditor.update(selector.charAt(0).toUpperCase() + selector.slice(1));
  }
  
  const sendMessage = (e) => {
    e.preventDefault();
  
    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
      sender: expeditor.current,
      text: chatInput.value,
      timestamp,
    };
  
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
  
    chatMessages.innerHTML += createChatMessageElement(message);
    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
  
  chatInputForm.addEventListener('submit', sendMessage);
  
  clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    chatMessages.innerHTML = '';
  });
