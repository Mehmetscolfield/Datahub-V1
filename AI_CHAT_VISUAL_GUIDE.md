# AI Chat Widget - Visual Overview

## 🎨 UI Layout

```
┌─────────────────────────────────────────────────────┐
│  EduGuide KZ                          🌙 🌍         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Your Page Content Here                            │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
                                                      
                                      ╔════════════╗
                                      ║     ⨯      ║  <- Floating Button
                                      ║ (sparkle)  ║    in bottom-left
                                      ╚════════════╝
```

### When Chat is Opened

```
┌─────────────────────────────────────────────────────┐
│  EduGuide KZ                          🌙 🌍         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Your Page Content                                 │
│                                                     │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘

╔════════════════════════════════════════════════════╗
║  ✨ AI Advisor                              ✕     ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  AI: Hi! Tell me about your academic profile      ║
║      and I'll suggest universities...             ║
║                                                    ║
║  You: I have 6.0 IELTS, 3.5 GPA, Engineering     ║
║                                                    ║
║  AI: Based on your profile:                       ║
║      1. KBTU - Excellent engineering              ║
║      2. Kaznu - Strong engineering                ║
║      3. Satbayev - Technical specialized          ║
║                                                    ║
║      Reasoning: Your 6.0 IELTS is sufficient...  ║
║                                                    ║
╠════════════════════════════════════════════════════╣
║  Example: "I have 6.0 IELTS, 3.5 GPA..."        ║
║  ┌──────────────────────────────────┬─────────┐  ║
║  │ Describe your profile...         │  Send   │  ║
║  └──────────────────────────────────┴─────────┘  ║
╚════════════════════════════════════════════════════╝
```

---

## 🔄 Data Flow

```
                    USER INTERACTIONS
                            │
                            ▼
        ┌───────────────────────────────────┐
        │  AIChatWidget Component           │
        │  ├─ isOpen (boolean)              │
        │  ├─ messages (array)              │
        │  ├─ input (string)                │
        │  └─ loading (boolean)             │
        └───────────────────────────────────┘
                    │
        ┌───────────┴──────────────┐
        │                          │
        ▼                          ▼
   User Types          User Presses Send
   "6.0 IELTS..."              │
                               ▼
                    handleSend() Function
                               │
                ┌──────────────┼──────────────┐
                │              │              │
    Validate    │    Get API Key from    │  Add User
    Input       │    import.meta.env     │  Message
                │                        │  to State
                │                        │
                └────────────┬───────────┘
                             │
                             ▼
                ┌─────────────────────────────┐
                │  Google Gemini API Call     │
                │  POST /generateContent      │
                │  ├─ System: University data │
                │  └─ User: Profile text      │
                └────────────┬────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
              Response ✓          Error ✗
                    │                 │
                    ▼                 ▼
            Parse AI Response    Show Error
            Add to Messages      Message
                    │             in Chat
                    ▼
            Display in Chat
            Panel with
            Auto-scroll
```

---

## 🏗️ Component Architecture

```
App.tsx
├── Providers (Query, I18n, Compare, Favorites)
│
└── AIChatWidget
    ├── State Management
    │   ├── isOpen
    │   ├── messages[]
    │   ├── input
    │   ├── loading
    │   └── error
    │
    ├── Floating Button
    │   └── Opens/Closes chat
    │
    ├── Chat Panel (when open)
    │   ├── Header
    │   │   ├── Title (AI Advisor)
    │   │   └── Close Button
    │   │
    │   ├── ScrollArea (Messages)
    │   │   ├── AI Messages (left-aligned, light bg)
    │   │   ├── User Messages (right-aligned, blue bg)
    │   │   └── Loading Indicator
    │   │
    │   ├── Error Alert (if needed)
    │   │
    │   └── Input Section
    │       ├── Helper Text
    │       ├── Input Field
    │       └── Send Button
    │
    └── API Integration
        └── Google Gemini API
            ├── System Prompt (University Data)
            ├── User Query
            └── Config (temperature, tokens, etc.)
```

---

## 🌐 Language Support

```
┌────────────────────────────────────┐
│  Language Switcher in Navbar       │
│  ├─ English                        │
│  ├─ Қазақша (Kazakh)              │
│  └─ Русский (Russian)              │
└────────────────────────────────────┘
        │
        ▼
    useI18n() Hook
        │
    ┌───┼───┐
    │   │   │
    ▼   ▼   ▼
   en  kz  ru
    │   │   │
    └───┼───┘
        ▼
Translation Keys:
├─ ai.title
├─ ai.chat_placeholder
├─ ai.chat_example
├─ ai.thinking
└─ ...
```

---

## 🔐 Security Flow

```
1. Admin Setup (One-time)
   └─ Get API Key from Google
   └─ Add to .env file
   └─ Restart dev server

2. User Session
   └─ Opens chat
   └─ Sends message
   └─ API Key loaded from env (server-side in build)
   └─ API call made with key
   └─ Response shown to user
   └─ Chat history in component memory (lost on page reload)

3. No Local Storage
   └─ No user data saved
   └─ No API key visible to user
   └─ No secrets in code
```

---

## 📊 Message Types

```
┌─────────────────────────────────────────┐
│ Message Interface                       │
├─────────────────────────────────────────┤
│ {                                       │
│   id: string                            │
│   type: "user" | "ai"                   │
│   content: string                       │
│   timestamp: Date                       │
│ }                                       │
└─────────────────────────────────────────┘

Example:
┌─────────────────────────────────┐
│ AI Message                      │
├─────────────────────────────────┤
│ id: "initial"                   │
│ type: "ai"                      │
│ content: "Hi! Tell me about..." │
│ timestamp: 2024-01-28T...       │
└─────────────────────────────────┘
```

---

## 🎯 User Journey

```
1. User Opens App
   │
   └─ Sees floating sparkle icon in bottom-left
   
2. User Clicks Icon
   │
   └─ Chat panel expands
   └─ Shows greeting message
   
3. User Types Profile
   │
   └─ "I have 6.0 IELTS, 3.5 GPA, Engineering"
   
4. User Presses Send
   │
   └─ Message appears in chat (right side, blue)
   └─ "Thinking..." appears (left side, gray)
   └─ Loading spinner shows
   
5. AI Responds (2-5 seconds)
   │
   └─ "Based on your profile..."
   └─ Lists recommended universities
   └─ Provides reasoning
   
6. User Asks Follow-up (optional)
   │
   └─ Can ask more questions
   └─ Chat history visible
   └─ Can close and reopen widget
   
7. User Closes Chat
   │
   └─ Chat history shown next time they click
   └─ History cleared on page reload
```

---

## 🔄 API Request/Response Cycle

### Request
```json
{
  "contents": [{
    "parts": [
      {
        "text": "You are an expert university advisor...\n\nUniversities:\nKBTU (Almaty): 45 programs...\n..."
      },
      {
        "text": "I have 6.0 IELTS, 3.5 GPA, interested in Engineering"
      }
    ]
  }],
  "generationConfig": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 1024
  }
}
```

### Response
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "Based on your profile, I recommend:\n\n1. **KBTU** - Excellent engineering..."
      }]
    }
  }]
}
```

---

## 💾 State Management

```
Component State:
├─ isOpen: false → true (when user clicks button)
├─ messages: [initial AI message, ...user/AI messages]
├─ input: "I have 6.0 IELTS..." (user typing)
├─ loading: false → true (during API call)
└─ error: "" → "error message" (if API fails)

No Persistence:
├─ Not saved to localStorage
├─ Not sent to backend
├─ Lost on page reload
├─ Lost on browser close
└─ Only persists during session
```

---

## 🎨 Styling

```
Colors:
├─ Button Gradient: blue-500 → purple-600
├─ Header Gradient: blue-500 → purple-600
├─ User Messages: blue-500 (bg), white (text)
├─ AI Messages: slate-200 (light) / slate-700 (dark)
└─ Dark Mode: Supported with dark: prefix

Spacing:
├─ Button: Fixed bottom-6 left-6 (corners from viewport)
├─ Panel: Fixed bottom-24 left-6 (above button)
├─ Size: w-96 (384px wide) × h-[600px] (600px tall)
└─ Message Padding: p-4

Fonts:
├─ Header: Bold, white text
├─ Messages: Regular, inherited color
└─ Placeholder: Muted foreground color
```

---

## 📱 Responsive Behavior

```
Desktop (≥768px):
├─ Chat panel: 384px wide, 600px tall
├─ Floating button: 56px diameter
└─ Visible and fully functional

Tablet (480-768px):
├─ Chat panel: 384px wide (might overlap)
├─ Floating button: 56px diameter
└─ Scrollable if needed

Mobile (<480px):
├─ Chat panel: 384px wide (might overflow)
├─ Consider viewport width
├─ Scrollable content
└─ Floating button: 56px diameter
```

---

## ⚙️ Configuration

```
.env File
├─ VITE_GEMINI_API_KEY=your_key_here
└─ Loaded by Vite build system

import.meta.env
├─ Accessed in component as: import.meta.env.VITE_GEMINI_API_KEY
└─ Available at runtime

Build Process
├─ .env values injected at build time
├─ Available in browser console if needed
└─ Consider security in production
```

---

This diagram provides a complete visual overview of how the AI Chat Widget works!
