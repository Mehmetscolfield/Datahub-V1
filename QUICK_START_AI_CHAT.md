# Quick Start: AI Chat Widget

## 🚀 Get Running in 3 Steps

### Step 1: Get API Key (1 minute)
```
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
```

### Step 2: Set Environment Variable (1 minute)
```bash
# In project root, create/edit .env file:
VITE_GEMINI_API_KEY=your_api_key_here
```

### Step 3: Start and Test (1 minute)
```bash
npm run dev:client
# Open http://localhost:5000
# Click sparkle icon (⨯) in bottom-left corner
# Type: "I have 6.0 IELTS, 3.5 GPA, interested in Engineering"
# Press Enter and watch the AI recommend universities!
```

---

## 💡 What You Get

- **Floating Chat** - Small circle in bottom-left, expands when clicked
- **Smart Recommendations** - AI analyzes IELTS, GPA, interests, suggests universities
- **Multi-Language** - English, Kazakh, Russian supported
- **Error Handling** - Graceful messages if something goes wrong
- **Session History** - Chat persists during your session

---

## 📝 Example Conversation

```
You:  I have 6.0 IELTS, 3.5 GPA, interested in Engineering programs

AI:   Based on your profile, I recommend:
      
      1. **KBTU** - Excellent engineering programs, matches your IELTS
      2. **Kaznu** - Strong engineering, fits your GPA range
      3. **Satbayev** - Specialized in technical education
      
      Reasoning: Your 6.0 IELTS is sufficient for all three. Your
      3.5 GPA aligns well with their admission standards...

You:  What about scholarships?

AI:   All three universities offer:
      - Merit-based scholarships
      - International scholarships (for students like you)
      - Research grants in engineering
      ...
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Chat button doesn't appear | Restart dev server after adding `.env` |
| "API key not configured" error | Check `.env` file has `VITE_GEMINI_API_KEY` |
| API errors | Verify API key is valid, check your internet |
| Chat not responding | Wait 5 seconds (AI is thinking), check browser console |

---

## 📚 Documentation

- **Detailed Setup:** See `AI_CHAT_SETUP.md`
- **Implementation Details:** See `AI_CHAT_IMPLEMENTATION.md`
- **Customization:** Edit component at `client/src/components/ai-chat-widget.tsx`

---

## 🎨 Customization Quick Tips

### Change Button Position
Edit `ai-chat-widget.tsx` line 96:
```tsx
className="fixed bottom-6 left-6 ..."  // Change these values
```

### Change Colors
Edit lines 99 and 118:
```tsx
"bg-gradient-to-r from-blue-500 to-purple-600"  // Change these colors
```

### Change Chat Size
Edit line 115:
```tsx
className="... w-96 h-[600px] ..."  // Adjust width and height
```

---

## ✅ What's Different from Before

**Before:** Users had to paste their own API key in a form on the homepage

**Now:**
- ✅ You configure the key once in `.env`
- ✅ Users never see API key entry
- ✅ Chat widget appears on ALL pages
- ✅ Easier to discover and use
- ✅ Better UX overall

---

## 🎯 Next Steps (Optional)

1. **Customize System Prompt** - Edit AI advisor role in `ai-chat-widget.tsx` line 86
2. **Add Feedback** - Users can rate recommendations (for future feature)
3. **Style Matching** - Update colors to match your brand
4. **Translations** - Add more languages in `i18n.tsx`
5. **Analytics** - Track popular queries (future enhancement)

---

## 📞 Need Help?

1. Check `AI_CHAT_SETUP.md` for detailed troubleshooting
2. Check browser console (F12) for error messages
3. Verify API key at https://makersuite.google.com/app/apikey
4. Ensure `.env` file is in project root directory

---

**Status:** ✅ Ready to use!  
**Config Time:** 3 minutes  
**Files:** `client/src/components/ai-chat-widget.tsx`  
**Requirements:** Google Gemini API Key (free)
