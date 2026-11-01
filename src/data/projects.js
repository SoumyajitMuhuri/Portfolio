import yaprIcon from '../public/Yapr.png'
import convergeIcon from '../public/Converge.png'
import charaforgeIcon from '../public/Charaforge.png'
import currencyConverterIcon from '../public/Bidirectional Currency Converter.png'

const projects = [
  {
    id: 'yapr',
    icon: yaprIcon,
    title: 'Yapr – A Social Messenger with Real-Time Chat, Media Sharing, and Live Presence',
    description: 'A social messaging application featuring real-time Socket.IO messaging with multiple users, live online presence indicators, secure Clerk authentication, multi-media sharing, an interactive user-friendly UI, and paginated conversation history.',
    tech: ['React', 'Socket.io', 'Node.js', 'Express.js', 'MongoDB', 'Clerk', 'ImageKit', 'Zustand', 'HeroUI', 'Tailwind CSS'],
    siteUrl: 'https://yapr.onrender.com',
    codeUrl: 'https://github.com/SoumyajitMuhuri/Yapr',
    demo: { type: '', src: '' },
    visible: true,
  },
  {
    id: 'converge',
    icon: convergeIcon,
    title: 'Converge – A URL Shortener with QR Codes and Live Analytics',
    description: 'A URL shortener with expiry-aware Redis caching, asynchronous visit tracking through BullMQ workers, and live analytics powered by Redis Pub/Sub and Server-Sent Events.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Recharts', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'BullMQ', 'JWT', 'ImageKit'],
    siteUrl: 'https://converge-psi-inky.vercel.app',
    codeUrl: 'https://github.com/SoumyajitMuhuri/Converge',
    demo: { type: '', src: '' },
    visible: true,
  },
  {
    id: 'charaforgeai',
    icon: charaforgeIcon,
    title: 'CharaforgeAI – A Tool that Turns Sketches into Stylized AI-Generated Character Art',
    description: 'An AI-powered creative application that transforms canvas sketches into stylized character artwork using Cloudflare Workers AI (FLUX), with Gemini-generated character profiles and an ImageKit-powered community gallery.',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Cloudflare Workers AI', 'Google Gemini', 'ImageKit'],
    siteUrl: 'https://charaforgeai.vercel.app',
    codeUrl: 'https://github.com/SoumyajitMuhuri/CharaforgeAI',
    demo: { type: '', src: '' },
    visible: true,
  },
  {
    id: 'currency-converter',
    icon: currencyConverterIcon,
    title: 'Bidirectional Currency Converter – Real-Time Rates in Either Direction',
    description: 'A client-side currency converter supporting instant bidirectional calculations, live exchange rates, per-currency rate caching, and deduplication of concurrent API requests.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'ExchangeRate-API'],
    siteUrl: 'https://currencyconvert2026.netlify.app',
    codeUrl: 'https://github.com/SoumyajitMuhuri/Bidirectional-RT-currency',
    demo: { type: '', src: '' },
    visible: true,
  },
]

export default projects
