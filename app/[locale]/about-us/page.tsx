import { Metadata } from 'next';
import { Link as CustomLink, routing } from '@/i18n/routing';
import Image from 'next/image';
import { 
  Calculator, Zap, Globe, ShieldCheck, Mail, Phone, 
  MapPin, Linkedin, Facebook, Instagram, Github, Link as LinkIcon 
} from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  return {
    title: 'About Us | Nexus Calculator - Your Trusted Global Tools Platform',
    description: 'Discover the story behind Nexus Calculator. Learn about our mission to provide accurate calculators, powerful developer utilities, PDF tools, and image tools for users worldwide.',
    alternates: getCanonicalAndAlternates('/about-us', locale),
    openGraph: {
      type: 'website',
      title: 'About Us | Nexus Calculator Tools Platform',
      description: 'Nexus Calculator provides world-class computational tools, developer utilities, image editors, and PDF tools. Meet the minds that built this high-performance platform.',
      siteName: 'Nexus Calculator',
    },
  };
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 font-sans">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <CustomLink href="/" className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors">Home</CustomLink>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-300 font-medium">About Us</span>
      </div>

      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Empowering Your Decisions with Precision</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Nexus Calculator represents the pinnacle of modern web utilities—a comprehensive, international-standard platform engineered to deliver rapid, reliable, and entirely free calculators, developer tools, image editors, and PDF utilities directly to your browser.
        </p>
      </header>

      <div className="space-y-16">
        {/* Concept & Vision */}
        <section className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-4">Our Vision & Philosophy</h2>
          <p>
            What started as a premier destination for high-precision calculators has evolved into an expansive ecosystem. In an increasingly complex digital world, professionals and everyday users require a diverse set of utilities. Nexus Calculator was conceived from a fundamental philosophy: <strong>powerful analytical and developer tools should be universally accessible</strong>.
          </p>
          <p>
            We recognize that whether you are a small business owner calculating loan amortizations, a software engineer formatting complex JSON and debugging code, or a digital creator compressing PDFs and manipulating images—you demand accuracy and performance. Our platform bridges the gap between complex operations and an intuitive, user-centric interface. By leveraging international standards, we ensure that every calculation, formatting, and conversion produced by our system can be trusted implicitly.
          </p>
          <p>
            Traditional offline applications and archaic web tools are often fraught with slow load times, invasive tracking, and cluttered advertisements. We chose a different path. Nexus Calculator is built upon a high-performance, modern tech stack that relies on serverless edge computing to guarantee minimal latency and exceptional reliability, no matter where you are in the world.
          </p>
        </section>

        {/* What sets us apart */}
        <section>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 border-b dark:border-slate-700 pb-4">Why We Stand Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Architectural Excellence</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Deployed globally on edge networks utilizing Next.js App Router, our platform ensures near-instantaneous load times. Computations are executed securely and rapidly, providing a seamless user experience devoid of jarring page reloads or layout shifts.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Calculator size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Expansive & Modular</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our library encompasses a wide array of disciplines. From sophisticated financial calculators and health trackers to developer tools, robust PDF modifiers, and image generators, our modular architecture allows us to continually expand our utility suite without sacrificing performance.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Global Localization</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Adhering to international standards, our calculators seamlessly adapt to diverse numeric formats, currencies, and localized guidelines. We design our algorithms to be robust and universally applicable.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Absolute Data Integrity</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe privacy is a fundamental human right. All sensitive inputs and calculations are processed strictly on the client side. We do not aggregate, harvest, or store your personal calculation data.
              </p>
            </div>
          </div>
        </section>

        {/* Comprehensive Tool Ecosystem (SEO Focus) */}
        <section className="prose prose-slate dark:prose-invert prose-lg max-w-none mt-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-4">A Comprehensive Ecosystem of Digital Utilities</h2>
          <p>
            As a leading <strong>all-in-one digital utility platform</strong>, we engineer tools that cater to the everyday needs of professionals, software engineers, designers, and students globally. Our rigorous approach to web architecture guarantees that whether you need to format complex code, convert rich media, manipulate documents, or execute advanced financial algorithms, you have an enterprise-grade solution at your fingertips.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none pl-0 mt-8">
            <li className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <strong className="text-xl text-slate-900 dark:text-white flex items-center mb-2">Advanced Developer Tools</strong>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 m-0">Access robust developer utilities including <em>JSON formatters</em>, <em>CSS minifiers</em>, <em>Base64 encoders/decoders</em>, and <em>cryptographic hash generators</em>. These secure, client-side tools accelerate your development workflow by providing instant string manipulations, code formatting, and cryptographic tasks natively within your browser without compromising sensitive data.</p>
            </li>
            <li className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <strong className="text-xl text-slate-900 dark:text-white flex items-center mb-2">Professional PDF Utilities</strong>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 m-0">Manage and modify your documents with ease using our comprehensive PDF suite. We employ highly optimized WebAssembly algorithms to <em>compress PDFs</em>, <em>merge and split documents</em>, <em>extract individual pages</em>, and <em>convert PDF to Word or Image formats</em>. Everything is processed directly on your device, ensuring total privacy and GDPR compliance.</p>
            </li>
            <li className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <strong className="text-xl text-slate-900 dark:text-white flex items-center mb-2">Image & Media Processing</strong>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 m-0">Enhance, resize, and transform your visual assets instantly. Our media toolkit features blazing-fast <em>image converters (JPG, PNG, WebP, SVG)</em>, <em>AI-powered background removers</em>, <em>intelligent image compressors</em>, and <em>favicon generators</em>. Perfectly designed for content marketers and web designers looking to achieve optimal image SEO, faster page loads, and superior Core Web Vitals.</p>
            </li>
            <li className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <strong className="text-xl text-slate-900 dark:text-white flex items-center mb-2">High-Precision Calculators</strong>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 m-0">From sophisticated <em>mortgage and auto loan calculators</em> to nuanced <em>health, fitness, and scientific calculation tools</em>. Engineered with localized date formats, internationalized currencies, and precise floating-point math, our calculators deliver mathematically verified, context-aware insights for tracking compounding interest, retirement planning, and academic problem-solving.</p>
            </li>
          </ul>
        </section>
        
        {/* Developer Identity */}
        <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden mt-16">
          <div className="bg-slate-800 text-white p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-2">Developer Identity</h2>
            <p className="text-slate-300">The engineering mind behind Nexus Calculator.</p>
          </div>
          
          <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-full lg:w-1/3 flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 relative">
                {/* Fallback image if no real image is provided. User can replace this easily. */}
                <Image 
                  src="https://ik.imagekit.io/ubwpdqyav/my_photo-removebg-preview.png?updatedAt=1776774813574" 
                  alt="Lead Developer" 
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">MD Abu Hanif Mia</h3>
              <p className="text-[#518231] font-medium mt-1 mb-4">Full Stack Web Architect</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Specializing in high-performance web applications, scalable cloud architecture, and user-centric UI/UX design. Driven by a passion for delivering enterprise-level products to the global market.
              </p>
              
              <div className="flex gap-4 justify-center">
                <a href="https://www.linkedin.com/in/md-abu-hanif-mia" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/abuhanif254" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.facebook.com/bitulla" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/bitullah_aj" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-2">Contact Information</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Email Address</span>
                    <a href="mailto:nexuscalculator@gmail.com" className="text-lg text-slate-800 dark:text-slate-200 hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors font-medium">nexuscalculator@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Phone Number</span>
                    <a href="tel:+8801724010261" className="text-lg text-slate-800 dark:text-slate-200 hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors font-medium">+8801724010261</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Office Address</span>
                    <span className="text-lg text-slate-800 dark:text-slate-200 block">2300 Kishoreganj Sadar<br />Dhaka, Bangladesh</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <LinkIcon size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Personal Portfolio</span>
                    <a href="https://abu-hanif-mia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-lg text-[#518231] dark:text-[#6fa844] hover:underline font-medium">My Portfolio Website</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Another Websites */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-4">Our Other Projects</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Beyond Nexus Calculator, our engineering team cultivates a broader ecosystem of premium digital experiences. Explore our expanding portfolio of professional web platforms below.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'The Reason Magazine', url: 'https://the-reason-magazine.vercel.app', desc: 'Reason Magazine was founded with a clear purpose: to provide a professional, high-quality platform for atheism activism and secular advocacy.' },
              { name: 'Blood Donation Application', url: 'https://elaborate-toffee-f152b0.netlify.app', desc: 'A full-stack web application for managing blood donation requests, connecting donors with recipients, and processing donations through secure payment integration.' },
              { name: 'MovieMaster Pro', url: 'https://mellifluous-lebkuchen-ba8a35.netlify.app', desc: 'A comprehensive movie management system where users can browse, manage, and organize their favorite movies with advanced filtering and personal collections.' },
              { name: 'Demo Platform Four', url: 'https://demo-website-four.com', desc: 'Interactive educational hub for remote learning.' },
              { name: 'Demo Platform Five', url: 'https://demo-website-five.com', desc: 'Advanced analytics dashboard for digital marketers.' },
            ].map((site, index) => (
              <a 
                key={index} 
                href={site.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#518231]/30 dark:hover:border-[#518231]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">{site.name}</h3>
                  <Globe size={18} className="text-slate-400 group-hover:text-[#518231]" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 min-h-[2.5rem] line-clamp-3">{site.desc}</p>
                <span className="text-xs font-semibold text-[#518231] bg-[#518231]/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Visit Site
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="prose prose-slate dark:prose-invert prose-lg max-w-none text-center bg-slate-50 dark:bg-slate-800/50 p-10 rounded-3xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Continuous Evolvement</h2>
          <p className="mb-6">
            The web is not static, and neither are we. We are constantly expanding our library of tools, refining our algorithms, and responding to the evolving needs of our international audience.
          </p>
          <a href="mailto:nexuscalculator@gmail.com" className="inline-flex items-center justify-center bg-[#518231] hover:bg-[#436a28] text-white font-medium py-3 px-8 rounded-xl transition-colors no-underline">
            Reach Out to Our Team
          </a>
        </section>
      </div>
    </main>
  );
}

