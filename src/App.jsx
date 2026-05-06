import { useState } from "react";
import nodexLogo from "./assets/axis.png";
import nlogo from "./assets/nodex.png";
import FaultyTerminal from "./components/FaultyTerminal";
import AxisDemo from "./components/AxisDemo";
//const [input, setInput] = useState("");
//const [output, setOutput] = useState("");

const CheckIcon = () => (
  <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
  </svg>
);

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-5 w-5 fill-current text-neutral-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="m8.5 3c3.0375661 0 5.5 2.46243388 5.5 5.5 0 1.24832096-.4158777 2.3995085-1.1166416 3.3225711l4.1469717 4.1470988c.2928932.2928932.2928932.767767 0 1.0606602-.2662666.2662665-.6829303.2904726-.9765418.0726181l-.0841184-.0726181-4.1470988-4.1469717c-.9230626.7007639-2.07425014 1.1166416-3.3225711 1.1166416-3.03756612 0-5.5-2.4624339-5.5-5.5 0-3.03756612 2.46243388-5.5 5.5-5.5zm0 1.5c-2.209139 0-4 1.790861-4 4s1.790861 4 4 4 4-1.790861 4-4-1.790861-4-4-4z" />
  </svg>
);

function CopyButton({ text, large = false }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`${large ? "text-neutral-400 hover:text-neutral-600" : "block py-1 px-2.5 text-neutral-500 hover:text-black transition-colors focus:outline-none"}`}
    >
      {copied ? <TickIcon /> : <CopyIcon />}
    </button>
  );
}

// Llama SVG logo (simplified)
function OllamaLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="60" rx="28" ry="30" fill="black"/>
      <ellipse cx="35" cy="38" rx="10" ry="13" fill="black"/>
      <ellipse cx="65" cy="38" rx="10" ry="13" fill="black"/>
      <ellipse cx="35" cy="36" rx="5" ry="7" fill="white"/>
      <ellipse cx="65" cy="36" rx="5" ry="7" fill="white"/>
      <circle cx="35" cy="36" r="3" fill="black"/>
      <circle cx="65" cy="36" r="3" fill="black"/>
      <ellipse cx="50" cy="55" rx="10" ry="8" fill="#1a1a1a"/>
      <path d="M44 64 Q50 70 56 64" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// OpenClaw mascot SVG (simplified llama with claw)
function OpenClawMascot() {
  return (
    <svg width="288" height="288" viewBox="0 0 288 288" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="144" cy="180" rx="70" ry="80" fill="black"/>
      {/* Head */}
      <ellipse cx="144" cy="100" rx="45" ry="50" fill="black"/>
      {/* Ears */}
      <ellipse cx="115" cy="60" rx="15" ry="22" fill="black"/>
      <ellipse cx="173" cy="60" rx="15" ry="22" fill="black"/>
      <ellipse cx="115" cy="58" rx="8" ry="14" fill="white"/>
      <ellipse cx="173" cy="58" rx="8" ry="14" fill="white"/>
      {/* Eyes */}
      <circle cx="130" cy="95" r="10" fill="white"/>
      <circle cx="158" cy="95" r="10" fill="white"/>
      <circle cx="132" cy="95" r="5" fill="black"/>
      <circle cx="160" cy="95" r="5" fill="black"/>
      <circle cx="133" cy="93" r="2" fill="white"/>
      <circle cx="161" cy="93" r="2" fill="white"/>
      {/* Snout */}
      <ellipse cx="144" cy="112" rx="16" ry="12" fill="#333"/>
      {/* Smile */}
      <path d="M136 116 Q144 122 152 116" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Legs */}
      <rect x="100" y="240" width="22" height="35" rx="11" fill="black"/>
      <rect x="166" y="240" width="22" height="35" rx="11" fill="black"/>
      <rect x="108" y="230" width="22" height="35" rx="11" fill="black"/>
      <rect x="158" y="230" width="22" height="35" rx="11" fill="black"/>
      {/* Claw arm */}
      <path d="M200 150 Q230 130 240 110" stroke="black" strokeWidth="14" strokeLinecap="round" fill="none"/>
      <path d="M240 110 L255 95 M240 110 L252 115 M240 110 L245 98" stroke="black" strokeWidth="8" strokeLinecap="round"/>
      {/* Tail */}
      <path d="M90 200 Q60 220 55 250" stroke="black" strokeWidth="18" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function Navbar({ onDemoClick, onNavigate }){
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white" style={{ borderBottom: "1px solid transparent" }}>
      <nav className="flex w-full items-center justify-between px-6 py-2">
        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="z-50 flex items-center">
          <img src={nlogo} alt="NodeX Labs" className="h-14 w-auto" />
        </button>

        {/* Desktop left links */}
        <div className="hidden lg:flex items-center space-x-6 ml-6 mr-6 xl:mr-0 text-lg xl:flex-1">
          <button onClick={() => onNavigate("home")} className="hover:underline underline-offset-4">
            Home
          </button>

          <button onClick={() => onNavigate("features")} className="hover:underline underline-offset-4">
            Features
          </button>

          <button onClick={() => onNavigate("architecture")} className="hover:underline underline-offset-4">
            Architecture
          </button>
        </div>

        {/* Search bar */}
        {/* <div className="flex-grow justify-center items-center hidden lg:flex">
          <div className="relative w-full xl:max-w-5xl">
            <div className="relative flex w-full bg-white border border-neutral-300 items-center rounded-md shadow-sm">
              <span className="pl-4 text-2xl text-neutral-500 flex items-center">
                <SearchIcon />
              </span>
              <input
                className="resize-none rounded-full border-0 py-3.5 bg-transparent text-sm w-full placeholder:text-neutral-500 focus:outline-none focus:ring-0 px-3"
                placeholder="Ask Axis about your day, your schedule, or anything..."
                autoComplete="off"
              />
            </div>
          </div>
        </div> */}

        <div className="hidden lg:flex flex-1 justify-center">
          <span className="text-sm text-neutral-400 tracking-wide">
            Local. Private. Yours.
          </span>
        </div>

        {/* Desktop right buttons */}
        <div className="hidden lg:flex xl:flex-1 items-center space-x-2 justify-end ml-6 xl:ml-0">
          {/* <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center rounded-full bg-black/5 hover:bg-black/10 text-lg px-4 py-1.5 text-black whitespace-nowrap"
          >
            GitHub
          </a> */}
          <button
          onClick={onDemoClick}
          className="flex cursor-pointer items-center rounded-full bg-neutral-800 text-lg px-4 py-1.5 text-white hover:bg-black whitespace-nowrap"
        >
          Demo
        </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="z-50">
            {menuOpen ? (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
          {menuOpen && (
            <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
              <div className="flex flex-col space-y-5 pt-20 text-3xl">
                <a className="px-6" href="#">Architecture</a>
                <a className="px-6" href="#">Demo</a>
                <a className="px-6" href="#">Docs</a>
                <a className="px-6" href="#">GitHub</a>
                <a className="px-6" href="#">Sign in</a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function HeroSection({ onDemoClick }){
  return (
    <main id="home" className="w-full flex flex-col pt-20 pb-40 items-center text-center">

    {/* FULL WIDTH STRIP */}
    <div className="w-full h-[320px] relative mb-5">
      <FaultyTerminal className="absolute inset-0 w-full h-full" />

      {/* Overlay logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={nodexLogo}
          alt="NodeX"
          className="h-[85%] max-h-[280px] w-auto object-contain opacity-95"
        />
      </div>


    </div>


  <div className="mt-6 mb-8 flex flex-col items-center gap-1">
    <p className="text-base text-neutral-500">
      Your Habits, We Understand!
    </p>

    <p className="text-xs tracking-[0.2em] text-neutral-400 ">
      NodeX Axis
    </p>
  </div>

      <h1 className="text-3xl md:text-4xl font-medium mb-6" style={{ fontFamily: "'Georgia', serif" }}>
        Smarter food choices begin with behavior.<br />
      </h1>
      <div className="hidden sm:flex flex-col items-center mt-2">
        <pre className="flex items-center rounded-xl bg-black/5 border border-neutral-100 font-mono text-sm text-black">
          <code className="py-3 pl-4">naxis analyze habits --nutrition</code>
          <CopyButton text="nodex init && nodex start axis" />
        </pre>
        {/* <p className="text-sm text-neutral-500 mt-3">
          A journey of a thousand miles, all begins with small steps.
          {" "}
          <a href="#" className="underline underline-offset-2 hover:text-neutral-800">
            
          </a>
        </p> */}
      </div>
      <button
        onClick={onDemoClick}
        className="flex sm:hidden items-center justify-center rounded-full bg-neutral-800 px-6 py-2 mt-5 text-lg text-white hover:bg-black"
      >
        Run Demo →
      </button>
    </main>
  );
}

function AutomateSection() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 mb-56">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div>
          <h3 className="text-4xl font-medium mb-8" style={{ fontFamily: "'Georgia', serif" }}>Before the traction slips out of your hand, the Axis rotates to pull it all back!</h3>
          <p className="text-lg text-black mb-5">
            Axis analyzes behavioral patterns like screen time, inactivity, stress signals, meal timing, and digital habits to identify unhealthy eating tendencies before they escalate.
          </p>
          <p className="text-lg text-black mb-10">
            Because every little snack is a moment to turn it all around. So, stop all the clocks, silence the pianos and the muffled drums. Let the sky look like a thousand doves. Because you have your truly trusty Axis.
          </p>
          <div className="bg-neutral-100 rounded-xl px-5 py-4 flex items-center justify-between gap-4 font-mono text-base mb-8">
            <span>naxis analyze habits --profile</span>
            <CopyButton text="nodex focus start" large />
          </div>
          {/* <a href="#" className="text-base text-neutral-500 underline underline-offset-4 hover:text-neutral-800">
            See more apps →
          </a> */}
        </div>
        <div className="rounded-2xl overflow-hidden border border-neutral-200">
          <div className="bg-white px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <div className="bg-white px-5 py-6 font-mono text-sm text-neutral-600 leading-relaxed">
            <p><span className="text-neutral-400">$</span> Starting nutritional analysis...</p>
            <p className="text-neutral-400 mt-1">Detecting behavioural signals...</p>
            <p className="text-neutral-400 mt-1">Analyzing meal timings...</p>
            <p className="text-neutral-400 mt-1">Monitoring your late night snacks...</p>
            <p className="mt-3">✓ Habit Profile Updated</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// function CloudSection() {
//   return (
//     <section id="pricing" className="mx-auto w-full max-w-6xl px-6 mb-56">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
//         <div>
//           <h2 className="text-4xl font-medium mb-8" style={{ fontFamily: "'Georgia', serif" }}>All local, no risk of data leaks!</h2>
//           <p className="text-lg text-black mb-6">NodeX's Axis runs entirely on your own devices. No servers. No tracking. No leaks.</p>
//           <ul className="space-y-3 mb-8">
//             {[
//               "Runs entirely on your devices...",
//               "No external servers...",
//               "No data collection...",
//               "Works fully offline...",
//             ].map((item) => (
//               <li key={item} className="flex items-start gap-3 text-base">
//                 <CheckIcon />
//                 <span>{item}</span>
//               </li>
//             ))}
//           </ul>
//           {/* <a
//             href="#"
//             className="inline-flex items-center justify-center rounded-full bg-neutral-800 px-8 py-3 text-lg text-white hover:bg-black font-medium"
//           >
//             Create account
//           </a> */}
//         </div>
//         <div className="flex flex-col gap-4">
//           {/* Pro card */}
//           <div className="rounded-2xl border border-neutral-200 p-6">
//             <p className="text-sm text-neutral-500 mb-1">Pro</p>
//             <h3 className="text-xl font-medium mb-2">Solve harder tasks, faster</h3>
//             <p className="text-sm text-neutral-600 mb-4">Run 3 cloud models at a time with 50x more cloud usage.</p>
//             <div className="flex items-center justify-between">
//               <div>
//                 <span className="text-2xl font-semibold">
//                   $20 <span className="text-base font-normal text-neutral-500">/ mo</span>
//                 </span>
//                 <p className="text-xs text-neutral-500 mt-0.5">
//                   or <a href="#" className="underline underline-offset-2 hover:text-neutral-700">$200/year</a>
//                 </p>
//               </div>
//               {/* <a
//                 href="#"
//                 className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-black font-medium px-6 py-2 text-sm"
//               >
//                 Get Pro
//               </a> */}
//             </div>
//           </div>
//           {/* Max card */}
//           <div className="rounded-2xl bg-neutral-800 text-white p-6">
//             <p className="text-sm text-neutral-400 mb-1">Max</p>
//             <h3 className="text-xl font-medium mb-2">For your most demanding work</h3>
//             <p className="text-sm text-neutral-400 mb-4">Run 10 cloud models at a time with 5x more usage than Pro.</p>
//             <div className="flex items-center justify-between">
//               <span className="text-2xl font-semibold">
//                 $100 <span className="text-base font-normal text-neutral-400">/ mo</span>
//               </span>
//               {/* <a
//                 href="#"
//                 className="inline-flex items-center justify-center rounded-full bg-white hover:bg-neutral-100 text-black font-medium px-6 py-2 text-sm"
//               >
//                 Get Max
//               </a> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


function ArchitectureSection() {
  return (
    <section id="architecture" className="mx-auto w-full max-w-6xl px-6 mb-56">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl font-medium mb-4" style={{ fontFamily: "'Georgia', serif" }}>
          Behavior-aware health intelligence powered by contextual data.
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Axis combines behavioral inputs, contextual signals, and adaptive AI analysis to understand the patterns that influence unhealthy eating habits. 
        </p>

        {/* <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
        It orchestrates the unique strengths of each device to create a seamless, powerful, and private AI experience that evolves with you.
        </p> */}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Phone */}
        <div className="border border-neutral-200 rounded-2xl p-6">
          <h3 className="text-xl font-medium mb-2">Local habit processor</h3>
          <p className="text-sm text-neutral-500 mb-4">Behavioral sensor</p>
          <p className="text-sm text-neutral-600">
            Aggregates behavioral and nutrition pattern data
          </p>
        </div>

        {/* Old Device */}
        <div className="border border-neutral-200 rounded-2xl p-6">
          <h3 className="text-xl font-medium mb-2">Habit Intelligence Layer</h3>
          <p className="text-sm text-neutral-500 mb-4">Always-on local server</p>
          <p className="text-sm text-neutral-600">
            Aggregates behavioral, nutrition, and environmental pattern data
          </p>
        </div>

        {/* Laptop */}
        <div className="border border-neutral-200 rounded-2xl p-6">
          <h3 className="text-xl font-medium mb-2">AI inference engine</h3>
          <p className="text-sm text-neutral-500 mb-4">Inference engine</p>
          <p className="text-sm text-neutral-600">
            Generates adaptive nutrition and habit insights
          </p>
        </div>

      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section id="privacy" className="mx-auto w-full max-w-6xl px-6 mb-56">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <h2 className="text-4xl font-medium mb-8" style={{ fontFamily: "'Georgia', serif" }}>Personal health data should stay personal.</h2>
          <ul className="space-y-4">
            {[
              "No cloud sync. Ever.",
              "No training on your data",
              "Full local control",
              "Instant wipe anytime",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-base">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <svg className="w-48 h-48 text-neutral-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
      </div>
    </section>
  );
}


function CTASection({ onDemoClick }){
  return (
    <section className="max-w-6xl w-full mx-auto px-6 mb-24 md:mb-56">
      <div className="py-12 px-12 flex flex-col items-center text-center gap-6">
        <h2 className="text-3xl font-medium" style={{ fontFamily: "'Georgia', serif" }}>Healthy habits begin with better awareness.</h2>
        <button
        onClick={onDemoClick}
        className="inline-flex items-center justify-center rounded-full bg-neutral-800 px-8 py-3 text-lg text-white hover:bg-black"
      >
        Run Demo
      </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto">
      <div className="flex items-center justify-center px-6 py-6 text-sm text-neutral-500">
        © 2026 NodeX Labs
      </div>
    </footer>
  );
}

// export default function App() {
//   return (
//     <div
//       className="antialiased min-h-screen w-full m-0 flex flex-col overflow-x-hidden"
//       style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor: "white", color: "black" }}
//     >
//       <Navbar />
//       <HeroSection />
//       <AutomateSection />
//       <CloudSection />
//       <PrivacySection />
//       <CTASection />
//       <Footer />
//     </div>
//   );
// }

export default function App() {
  const [showDemo, setShowDemo] = useState(false);


  const scrollToSection = (id) => {
  const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openDemo = () => setShowDemo(true);

  if (showDemo) {
    return <AxisDemo onBack={() => setShowDemo(false)} />;
  }

  return (
    <div className="antialiased min-h-screen w-full m-0 flex flex-col overflow-x-hidden"
      style={{ fontFamily:"'HelveticaNeue',Helvetica,Arial,sans-serif", backgroundColor:"white", color:"black" }}
    >
      <Navbar onDemoClick={openDemo} onNavigate={scrollToSection} />
      <HeroSection onDemoClick={openDemo} />
      <AutomateSection />
      <ArchitectureSection />
      <PrivacySection />
      <CTASection onDemoClick={openDemo} />
      <Footer />
    </div>
  );
}