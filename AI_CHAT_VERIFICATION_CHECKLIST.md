# AI Chat Widget - Verification Checklist

## ✅ Installation & Setup Checklist

### Phase 1: Environment Setup (5 minutes)

- [ ] **Obtained Google Gemini API Key**
  - Visited https://makersuite.google.com/app/apikey
  - Created new API key
  - Key is valid and active
  - Note: You can test it here: https://aistudio.google.com/app/apikey

- [ ] **Created/Updated .env File**
  - Created `.env` in project root (same level as package.json)
  - Added line: `VITE_GEMINI_API_KEY=your_key_here`
  - Replaced `your_key_here` with actual API key
  - File is UTF-8 encoded
  - File is NOT committed to git (.gitignore exists)

- [ ] **Dependencies Installed**
  - Ran `npm install`
  - No errors during installation
  - `node_modules/` directory exists

### Phase 2: Code Verification (2 minutes)

- [ ] **Files Created Successfully**
  - ✅ `client/src/components/ai-chat-widget.tsx` exists
  - ✅ `AI_CHAT_SETUP.md` exists
  - ✅ `AI_CHAT_IMPLEMENTATION.md` exists
  - ✅ `QUICK_START_AI_CHAT.md` exists
  - ✅ `AI_CHAT_VISUAL_GUIDE.md` exists
  - ✅ `.env.example` exists

- [ ] **Files Modified Successfully**
  - ✅ `client/src/App.tsx` has `AIChatWidget` import
  - ✅ `client/src/App.tsx` has `<AIChatWidget />` in component
  - ✅ `client/src/pages/home.tsx` no longer has AI Suggestion section
  - ✅ `client/src/lib/i18n.tsx` has 4 new translation keys per language

- [ ] **No Syntax Errors**
  - Ran `npm run check` (TypeScript check)
  - No compilation errors
  - No type errors

### Phase 3: Runtime Testing (5 minutes)

- [ ] **Dev Server Starts**
  - Ran `npm run dev:client`
  - Server started successfully
  - App opened at http://localhost:5000
  - No errors in browser console (F12)

- [ ] **Floating Button Visible**
  - Opened http://localhost:5000
  - Saw sparkle icon (⨯) in bottom-left corner
  - Button is visible on all pages
  - Button is clickable

- [ ] **Chat Panel Opens**
  - Clicked floating button
  - Chat panel expanded
  - Header shows "AI Advisor" (or translated version)
  - Close button (X) is visible
  - Initial message appears: "Hi! Tell me about your academic profile..."

- [ ] **Input Works**
  - Input field is enabled
  - Placeholder text shows: "Describe your profile..."
  - Can type in input field
  - Send button is visible

- [ ] **Message Sending**
  - Typed: "I have 6.0 IELTS, 3.5 GPA, interested in Engineering"
  - Pressed Enter or clicked Send button
  - User message appears in chat (right side, blue)
  - Message appears in conversation history

- [ ] **AI Response**
  - "Thinking..." message appears
  - Spinner/loader visible
  - After 2-5 seconds, AI response appears
  - Response contains university recommendations
  - Response has reasoning/explanation
  - No error messages

- [ ] **Chat Features Work**
  - Messages auto-scroll to bottom
  - Can type multiple messages
  - Chat history persists during session
  - Can close and reopen chat (history preserved)
  - Closing panel with X works

### Phase 4: Language Support (2 minutes)

- [ ] **English (en)**
  - Chat title shows: "AI Advisor"
  - Placeholder shows: "Describe your profile..."
  - Example shows: "Example: 'I have 6.0 IELTS...'"
  - Thinking shows: "Thinking..."

- [ ] **Kazakh (kz)**
  - Click language switcher (globe icon) in navbar
  - Select Қазақша
  - Chat title shows: "АИ Кеңесші"
  - Placeholder shows: "Өзіңіздің профиліңізді сипаттаңыз..."
  - Example shows: "Мысалы: 'Менде 6.0 IELTS...'"
  - Thinking shows: "Ойлануда..."

- [ ] **Russian (ru)**
  - Switch to Русский
  - Chat title shows: "ИИ Консультант"
  - Placeholder shows: "Опишите ваш профиль..."
  - Example shows: "Пример: 'У меня 6.0 IELTS...'"
  - Thinking shows: "Обдумываю..."

### Phase 5: Error Handling (3 minutes)

- [ ] **API Key Error**
  - Temporarily remove `VITE_GEMINI_API_KEY` from .env
  - Restart dev server
  - Try to send a message
  - Error message appears: "API key not configured. Please contact administrator."
  - Restore .env file
  - Test passes ✓

- [ ] **Invalid API Key Error**
  - Temporarily change API key to invalid value: `VITE_GEMINI_API_KEY=invalid_key_123`
  - Send a message
  - Error appears in chat: "❌ API key seems too short..." or API error
  - Restore valid API key
  - Test passes ✓

- [ ] **Network Error Handling**
  - Disable internet connection (or throttle in DevTools)
  - Try to send message
  - Appropriate error message appears
  - Chat still responsive
  - Restore connection

- [ ] **Empty Message Handling**
  - Click Send with empty input
  - Nothing happens (ignored)
  - Input field clears
  - Test passes ✓

### Phase 6: Features Testing (3 minutes)

- [ ] **Auto-scroll**
  - Send multiple messages
  - Chat automatically scrolls to bottom
  - Latest message visible without manual scrolling

- [ ] **Message Types**
  - User messages: Right-aligned, blue background, white text
  - AI messages: Left-aligned, gray background, dark text
  - Visual distinction clear

- [ ] **Keyboard Shortcuts**
  - Enter key sends message
  - Shift+Enter creates multiline (if needed)
  - Message sends on Enter press

- [ ] **Button Responsiveness**
  - Click to open: Smooth animation
  - Click to close: Smooth animation
  - Icon changes (sparkle ↔ X)

- [ ] **Panel Features**
  - Can scroll through messages if many
  - Panel doesn't block page content
  - Panel overlays nicely
  - Close button works

### Phase 7: Integration Testing (2 minutes)

- [ ] **Works on All Pages**
  - Home page: Chat button visible
  - Universities page: Chat button visible
  - University details: Chat button visible
  - Compare page: Chat button visible
  - Not Found page: Chat button visible

- [ ] **Works with Providers**
  - i18n Provider: Language switching works
  - Compare Provider: Can use chat then navigate
  - Favorites Provider: Can use chat then navigate
  - All contexts work together

- [ ] **Mobile Responsive**
  - Resize browser to mobile size (<480px)
  - Button still visible
  - Panel still accessible
  - Chat functional
  - Text readable

### Phase 8: Documentation Check (1 minute)

- [ ] **README Updated** (optional)
  - Consider updating main README.md
  - Add section about AI Chat Widget

- [ ] **Setup Docs Clear**
  - QUICK_START_AI_CHAT.md explains setup
  - AI_CHAT_SETUP.md has detailed instructions
  - AI_CHAT_IMPLEMENTATION.md documents changes
  - AI_CHAT_VISUAL_GUIDE.md has diagrams

- [ ] **Code Comments Present**
  - Component has comments explaining key sections
  - Complex logic is commented
  - Easy to understand and modify

---

## 🧪 Test Scenarios

### Scenario 1: First-Time User
```
1. Opens app
2. Sees floating button
3. Clicks button
4. Chat opens with greeting
5. Types: "I want to study Computer Science"
6. Sends message
7. Gets recommendations
8. Satisfied with response
Result: ✅ PASS
```

### Scenario 2: Multi-turn Conversation
```
1. Ask: "What universities have Engineering?"
2. AI responds with options
3. Follow-up: "Which is cheapest?"
4. AI responds
5. Follow-up: "Can I apply with my IELTS score?"
6. AI responds
7. Close chat
8. Reopen chat - history preserved
Result: ✅ PASS
```

### Scenario 3: Language Switching Mid-Chat
```
1. Send message in English
2. Get response in English
3. Switch language to Kazakh
4. Send new message
5. Chat UI updates to Kazakh
6. AI can understand Kazakh input
Result: ✅ PASS
```

### Scenario 4: Error Recovery
```
1. API fails (simulate with bad key)
2. Error message appears
3. Fix the issue (.env)
4. Try again
5. Chat works normally
Result: ✅ PASS
```

### Scenario 5: Long Conversation
```
1. Have 20+ message exchanges
2. Chat maintains history
3. Scrolling works smoothly
4. No performance degradation
5. Memory usage reasonable
Result: ✅ PASS
```

---

## 📊 Performance Checklist

- [ ] **First Load**
  - Page loads in < 3 seconds
  - Floating button appears immediately
  - No layout shift

- [ ] **Chat Open**
  - Panel expands in < 500ms
  - Initial message displays instantly
  - No lag or stuttering

- [ ] **Message Send**
  - Local message appears instantly
  - API call takes 2-5 seconds typically
  - Loading state shows progress
  - No UI freezing

- [ ] **Memory**
  - Chat history doesn't cause memory leak
  - 50+ messages don't noticeably slow things down
  - Closing chat doesn't cause issues

- [ ] **Network**
  - Works on 4G connection
  - Works on WiFi
  - Handles slow connections gracefully

---

## 🚀 Deployment Checklist

- [ ] **Environment Variables**
  - API key set on production server
  - `.env` file not committed to git
  - `.env.example` committed with documentation

- [ ] **Security**
  - API key not in source code
  - API key not visible in browser
  - HTTPS used in production
  - Rate limiting considered

- [ ] **Performance**
  - Bundle size acceptable
  - No unnecessary requests
  - Caching strategies in place

- [ ] **Monitoring**
  - Error logging enabled
  - API usage monitored
  - User feedback mechanism present

---

## ✅ Final Sign-Off

| Item | Status | Notes |
|------|--------|-------|
| Setup Complete | ☐ | All .env variables set |
| Code Deployed | ☐ | Files in correct locations |
| Testing Complete | ☐ | All scenarios tested |
| Documentation Ready | ☐ | Setup guides provided |
| Ready for Users | ☐ | Feature launched |

---

## 📝 Test Result Summary

```
Date Tested: _______________
Tester: _______________
Browser: _______________
Device: _______________
OS: _______________

Total Tests: 47
Passed: _____ / 47
Failed: _____ / 47

Blocking Issues: _______________
Minor Issues: _______________
Ready for Production: ☐ YES  ☐ NO

Notes:
_______________________________________________________________
_______________________________________________________________
_______________________________________________________________
```

---

**Each checkbox should be verified before marking the feature as complete!**
