    // Sidebar controls
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('overlay');

    openSidebarBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      openSidebarBtn.setAttribute('aria-expanded', 'true');
      openSidebarBtn.focus();
    });

    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      openSidebarBtn.setAttribute('aria-expanded', 'false');
      openSidebarBtn.focus();
    });

    overlay.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
      if (authPanel.classList.contains('open')) {
        closeAuthPanel();
      }
      overlay.classList.remove('active');
      openSidebarBtn.setAttribute('aria-expanded', 'false');
      openSidebarBtn.focus();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
          openSidebarBtn.setAttribute('aria-expanded', 'false');
          openSidebarBtn.focus();
        }
        if (authPanel.classList.contains('open')) {
          closeAuthPanel();
        }
      }
    });

    // Chat area elements
    const chatMessages = document.getElementById('chatMessages');
    const inputArea = document.getElementById('inputArea');
    const inputText = document.getElementById('inputText');
    const btnSend = document.getElementById('btnSend');
    const btnVoice = document.getElementById('btnVoice');

    // Auth Panel Elements
    const authPanel = document.getElementById('authPanel');
    const authCloseBtn = document.getElementById('authCloseBtn');
    const authTitle = document.getElementById('authTitle');
    const authForm = document.getElementById('authForm');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const switchToSignupBtn = document.getElementById('switchToSignupBtn');
    const switchToLoginBtn = document.getElementById('switchToLoginBtn');
    const authSwitchText = document.getElementById('authSwitchText');
    const inputUsernameDiv = document.getElementById('inputUsernameDiv');
    const inputEmailDiv = document.getElementById('inputEmailDiv');
    const authUsername = document.getElementById('authUsername');
    const authEmail = document.getElementById('authEmail');
    const authPassword = document.getElementById('authPassword');
    const authPasswordConfirm = document.getElementById('authPasswordConfirm');
    const labelPasswordConfirm = document.getElementById('labelPasswordConfirm');

    // Sidebar Login/Signup Buttons
    const sidebarLoginBtn = document.getElementById('sidebarLoginBtn');
    const sidebarSignupBtn = document.getElementById('sidebarSignupBtn');

    // Open Auth Panel (login or signup)
    function openAuthPanel(isSignup = false) {
      authPanel.classList.add('open');
      overlay.classList.add('active');
      switchAuthMode(isSignup);
      authPanel.focus();
    }

    function closeAuthPanel() {
      authPanel.classList.remove('open');
      overlay.classList.remove('active');
      authForm.reset();
      openSidebarBtn.focus();
    }

    authCloseBtn.addEventListener('click', closeAuthPanel);

    sidebarLoginBtn.addEventListener('click', () => {
      closeSidebar();
      openAuthPanel(false);
    });

    sidebarSignupBtn.addEventListener('click', () => {
      closeSidebar();
      openAuthPanel(true);
    });

    openSidebarBtn.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !sidebar.classList.contains('open')) {
        e.preventDefault();
        openSidebarBtn.click();
      }
    });

    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      openSidebarBtn.setAttribute('aria-expanded', 'false');
      openSidebarBtn.focus();
    }

    // Switch between login and signup modes in auth panel
    switchToSignupBtn.addEventListener('click', () => switchAuthMode(true));
    switchToLoginBtn.addEventListener('click', () => switchAuthMode(false));

    function switchAuthMode(isSignup) {
      if (isSignup) {
        authTitle.textContent = 'Sign Up';
        authSubmitBtn.textContent = 'Sign Up';
        authSwitchText.textContent = "Already have an account?";
        switchToSignupBtn.style.display = 'none';
        switchToLoginBtn.style.display = 'inline';

        inputEmailDiv.style.display = 'block';
        authEmail.setAttribute('required', 'true');

        labelPasswordConfirm.style.display = 'block';
        authPasswordConfirm.style.display = 'block';
        authPasswordConfirm.setAttribute('required', 'true');

        authUsername.setAttribute('required', 'true');
        inputUsernameDiv.style.display = 'block';

        authPassword.setAttribute('autocomplete', 'new-password');
        authPasswordConfirm.setAttribute('autocomplete', 'new-password');
      } else {
        authTitle.textContent = 'Login';
        authSubmitBtn.textContent = 'Login';
        authSwitchText.textContent = "Don't have an account?";
        switchToSignupBtn.style.display = 'inline';
        switchToLoginBtn.style.display = 'none';

        inputEmailDiv.style.display = 'none';
        authEmail.removeAttribute('required');
        authEmail.value = '';

        labelPasswordConfirm.style.display = 'none';
        authPasswordConfirm.style.display = 'none';
        authPasswordConfirm.removeAttribute('required');
        authPasswordConfirm.value = '';

        inputUsernameDiv.style.display = 'block';
        authUsername.setAttribute('required', 'true');

        authPassword.setAttribute('autocomplete', 'current-password');
      }
      authUsername.focus();
      authForm.reset();
    }

    // Auth form submission
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isSignup = (authSubmitBtn.textContent === 'Sign Up');

      // Basic validations
      if (!authUsername.value.trim()) {
        alert('Please enter your username.');
        authUsername.focus();
        return;
      }
      if (isSignup) {
        if (!authEmail.value.trim()) {
          alert('Please enter your email.');
          authEmail.focus();
          return;
        }
      }
      if (!authPassword.value) {
        alert('Please enter your password.');
        authPassword.focus();
        return;
      }

      if (isSignup) {
        if (authPassword.value.length < 6) {
          alert('Password must be at least 6 characters.');
          authPassword.focus();
          return;
        }
        if (authPassword.value !== authPasswordConfirm.value) {
          alert('Passwords do not match.');
          authPasswordConfirm.focus();
          return;
        }
      }

      if (isSignup) {
        alert(`Signed up as ${authUsername.value.trim()}. (This is a demo alert: no backend connected.)`);
      } else {
        alert(`Logged in as ${authUsername.value.trim()}. (This is a demo alert: no backend connected.)`);
      }
      closeAuthPanel();
    });

    // Chat behavior

    // Append chat message (isUser: boolean). Message text is escaped for safety.
    function appendMessage(message, isUser = false) {
      message = escapeHtml(message);
      const messageRow = document.createElement('div');
      messageRow.classList.add('message-row');
      messageRow.classList.add(isUser ? 'user-message' : 'ai-message');
      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      messageContent.innerHTML = message.replace(/\n/g, '<br>');
      messageRow.appendChild(messageContent);
      chatMessages.appendChild(messageRow);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Escape potentially malicious characters from user input (very basic)
    function escapeHtml(text) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      };
      return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    }

    // Send user message and get AI reply
    async function sendMessage(text) {
      appendMessage(text, true);
      // Fake AI response with delay for demo
      setTimeout(() => {
        const aiReply = generateAIReply(text);
        appendMessage(aiReply, false);
      }, 1000);
    }

    // Simple fake AI reply generator (placeholder for real ChatGPT API calls)
    function generateAIReply(inputText) {
      let lowerText = inputText.toLowerCase();
      if (lowerText.includes('hello')) {
        return 'Hello! How can I help you today?';
      }
      if (lowerText.includes('how are you')) {
        return 'I\'m just code, but I\'m functioning perfectly! Thanks for asking.';
      }
      if (lowerText.includes('bye')) {
        return 'Goodbye! Have a great day!';
      }
      // fallback reply
      return 'This is a demo AI reply to: ' + escapeHtml(inputText);
    }

    inputArea.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputText.value.trim();
      if (!text) return;
      inputText.value = '';
      sendMessage(text);
    });

    // Voice recognition (Web Speech API)

    let recognition;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.addEventListener('result', (e) => {
        const transcript = e.results[0][0].transcript;
        inputText.value = transcript;
        inputText.focus();
      });

      recognition.addEventListener('end', () => {
        btnVoice.textContent = '🎤';
        btnVoice.disabled = false;
      });

      btnVoice.addEventListener('click', () => {
        if (btnVoice.disabled) return;
        recognition.start();
        btnVoice.textContent = '🎙️...';
        btnVoice.disabled = true;
      });
    } else {
      btnVoice.style.display = 'none'; // Hide if unsupported
    }