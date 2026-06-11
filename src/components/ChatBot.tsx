"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";

type Message = { role: "user" | "bot"; text: string; time: string };

const RICK_NUMBER = "+447344624714";
const WHATSAPP_URL = `https://wa.me/447344624714`;

const EMERGENCY_TIPS: Record<string, string> = {
  "gas leak": "🚨 GAS LEAK — URGENT:\n1. Don't touch any switches\n2. Open all windows and doors\n3. Leave the property immediately\n4. Don't use your phone inside — call from outside\n5. Turn off the gas at the meter (outside or under stairs)\n6. Call National Gas Emergency: 0800 111 999\n7. Then call Rick",
  "no heating": "🥶 No heating:\n1. Check your thermostat is set above room temp\n2. Check the boiler display for error codes (tell Rick the code)\n3. Try pressing the reset button once\n4. Check your gas supply (try another gas appliance like a hob)\n5. If none of that works, call Rick — he'll get to you ASAP",
  "no hot water": "🚿 No hot water:\n1. Check the boiler is on and set to heating + hot water\n2. Look for an error code on the display\n3. Try the reset button once\n4. Check the diverter valve isn't stuck (tell Rick if it's making a humming noise)\n5. Call Rick for a same-day fix",
  "burst pipe": "💧 BURST PIPE:\n1. Turn off your main stopcock immediately (usually under the kitchen sink or where the water enters the house)\n2. Turn on all cold taps to drain the system\n3. Turn off your boiler and hot water\n4. Catch water with buckets/towels\n5. Call Rick now — this is an emergency",
  "boiler": "🔥 Boiler issue:\nTell me your boiler's error code (shown on the display) and I'll give you specific advice. Or call Rick who can diagnose remotely.\nCommon fixes:\n- Press reset once and wait 2 minutes\n- Check pressure gauge is between 1–1.5 bar\n- Check pilot light if older boiler",
  "leak": "💧 Water leak:\n1. Find the source — is it a pipe, radiator, or appliance?\n2. Turn off the stopcock under your kitchen sink\n3. Put buckets/towels down\n4. Take photos\n5. Call Rick — he'll advise if you can wait or need urgent help",
  "pressure": "📊 Boiler pressure:\nIdeal pressure is 1–1.5 bar when cold.\n- Too low (below 0.5): repressurise using the filling loop (a silver/blue flexible hose under the boiler)\n- Too high (above 3): bleed a radiator slightly\n- Keeps dropping: you likely have a leak — call Rick",
  "radiator": "🌡️ Radiator issue:\n- Cold at top, warm at bottom: needs bleeding — use a radiator key, open the valve until water appears\n- Cold all over: check the valve is open (turn the head anti-clockwise)\n- Leaking from valve: wrap a cloth around it and call Rick\n- All radiators cold: may be a pump or zone valve issue — call Rick",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(EMERGENCY_TIPS)) {
    if (lower.includes(key)) return response;
  }
  if (lower.includes("emerg") || lower.includes("urgent") || lower.includes("help")) {
    return `🚨 This sounds urgent. Call Rick now on ${RICK_NUMBER} or message on WhatsApp for a fast response.\n\nWhile you wait, describe your problem and I'll give you immediate safety steps.`;
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("charge") || lower.includes("quote")) {
    return "💷 For pricing:\n- Annual boiler service: from £85\n- Gas safety certificate (CP12): from £65\n- Emergency callout: from £120 (first hour)\n- General plumbing: from £65/hr\n\nFor an accurate quote, call Rick or message on WhatsApp.";
  }
  if (lower.includes("area") || lower.includes("cover") || lower.includes("come to") || lower.includes("location")) {
    return "📍 Rick covers Norfolk, Suffolk, Essex and London. Message on WhatsApp with your postcode to confirm we can reach you.";
  }
  if (lower.includes("book") || lower.includes("appoint") || lower.includes("available") || lower.includes("when")) {
    return "📅 To book a job, call or WhatsApp Rick directly. He typically responds within the hour during working hours (8am–7pm). For emergencies, call any time.";
  }
  if (lower.includes("cp12") || lower.includes("certificate") || lower.includes("landlord")) {
    return "📋 Gas Safety Certificates (CP12):\n- Required annually for all rental properties\n- Rick is Gas Safe registered so your CP12 is legally compliant\n- From £65 for up to 2 appliances\n- Can often be done same or next day\n\nCall or WhatsApp to book.";
  }
  return "👋 Hi! I'm EAB's emergency assistant. I can help with:\n\n• Gas leaks & emergencies\n• No heating or hot water\n• Burst pipes & leaks\n• Boiler pressure issues\n• Radiator problems\n• Pricing & booking\n\nWhat's the issue? Type it and I'll give you immediate advice. For urgent help, call Rick directly.";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "👋 Hi! I'm EAB's emergency assistant.\n\nDescribe your issue and I'll give you immediate advice — or call/WhatsApp Rick directly.", time: "now" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setMessages(m => [...m, { role: "user", text: userMsg, time: now }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: "bot", text: getResponse(userMsg), time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button onClick={() => setOpen(true)}
          className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">Need Help?</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: "520px" }}>
          {/* Header */}
          <div className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-lg">🔧</div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-700"></span>
              </div>
              <div>
                <div className="font-semibold text-sm">EAB Emergency Assistant</div>
                <div className="text-xs text-blue-200">Online · Instant advice</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-600"><X className="w-4 h-4" /></button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 p-3 bg-red-50 border-b border-red-100">
            <a href={`tel:${RICK_NUMBER}`} className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 text-white text-xs font-semibold py-2 rounded-lg">
              <Phone className="w-3.5 h-3.5" /> Emergency Call
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white text-xs font-semibold py-2 rounded-lg">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Rick
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${m.role === "user" ? "bg-blue-700 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
                  {m.text}
                  <div className={`text-[10px] mt-1 ${m.role === "user" ? "text-blue-200" : "text-gray-400"}`}>{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                placeholder="Describe your issue..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
              />
              <button onClick={send} disabled={!input.trim()} className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center hover:bg-blue-800 disabled:opacity-40">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">Instant advice · Call Rick for emergencies</div>
          </div>
        </div>
      )}
    </>
  );
}
