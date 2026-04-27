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
  
  const languages: Record<string, string> = {
    'x-default': '/en/about-us',
  };
  
  routing.locales.forEach((l) => {
    languages[l] = `/${l}/about-us`;
  });

  return {
    title: 'About Us | CalculatorCentral - Your Trusted Global Calculator Platform',
    description: 'Discover the story behind CalculatorCentral. Learn about our mission to provide accurate, high-performance, and accessible calculators for users worldwide, and meet our lead developer.',
    alternates: {
      canonical: `/${locale}/about-us`,
      languages,
    },
    openGraph: {
      type: 'website',
      title: 'About Us | CalculatorCentral',
      description: 'CalculatorCentral provides world-class computational tools for finance, health, math, and more. Meet the minds that built this high-performance platform.',
      siteName: 'CalculatorCentral',
    },
  };
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  return (
    <main className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 font-sans">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-8">
        <CustomLink href="/" className="hover:text-blue-600 hover:underline transition-colors">Home</CustomLink>
        <span className="mx-2">/</span>
        <span className="text-slate-700 font-medium">About Us</span>
      </div>

      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Empowering Your Decisions with Precision</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          CalculatorCentral represents the pinnacle of modern web utilities—a comprehensive, international-standard platform engineered to deliver rapid, reliable, and entirely free computational tools directly to your browser.
        </p>
      </header>

      <div className="space-y-16">
        {/* Concept & Vision */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">Our Vision & Philosophy</h2>
          <p>
            In an increasingly complex world, making informed decisions on personal finance, health metrics, and academic problems requires more than just guesswork. It requires precision. CalculatorCentral was conceived from a fundamental philosophy: <strong>powerful analytical tools should be universally accessible</strong>.
          </p>
          <p>
            We recognize that whether you are a small business owner in Tokyo calculating loan amortizations, a student in London exploring geometric theorems, or a fitness enthusiast in New York estimating a BMI trajectory, you demand accuracy. Our platform bridges the gap between complex mathematical algorithms and an intuitive, user-centric interface. By leveraging international standards and verified computational models, we ensure that every result produced by our system can be trusted implicitly.
          </p>
          <p>
            Traditional offline applications and archaic web tools are often fraught with slow load times, invasive tracking, and cluttered advertisements. We chose a different path. CalculatorCentral is built upon a high-performance, modern tech stack that relies on serverless edge computing to guarantee minimal latency and exceptional reliability, no matter where you are in the world.
          </p>
        </section>

        {/* What sets us apart */}
        <section>
          <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4">Why We Stand Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Architectural Excellence</h3>
              <p className="text-slate-600 leading-relaxed">
                Deployed globally on edge networks utilizing Next.js App Router, our platform ensures near-instantaneous load times. Computations are executed securely and rapidly, providing a seamless user experience devoid of jarring page reloads or layout shifts.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Calculator size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expansive & Modular</h3>
              <p className="text-slate-600 leading-relaxed">
                Our library encompasses a wide array of disciplines. From sophisticated compound interest charts and currency converters to specialized health calculators, our modular architecture allows us to continually expand our offerings without sacrificing performance.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Localization</h3>
              <p className="text-slate-600 leading-relaxed">
                Adhering to international standards, our calculators seamlessly adapt to diverse numeric formats, currencies, and localized guidelines. We design our algorithms to be robust and universally applicable.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-50 w-14 h-14 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Absolute Data Integrity</h3>
              <p className="text-slate-600 leading-relaxed">
                We believe privacy is a fundamental human right. All sensitive inputs and calculations are processed strictly on the client side. We do not aggregate, harvest, or store your personal calculation data.
              </p>
            </div>
          </div>
        </section>
        
        {/* Developer Identity */}
        <section className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden mt-16">
          <div className="bg-slate-800 text-white p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-2">Developer Identity</h2>
            <p className="text-slate-300">The engineering mind behind CalculatorCentral.</p>
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
              <h3 className="text-2xl font-bold text-slate-900">MD Abu Hanif Mia</h3>
              <p className="text-blue-600 font-medium mt-1 mb-4">Full Stack Web Architect</p>
              <p className="text-sm text-slate-500 mb-6">
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
              <h4 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Contact Information</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</span>
                    <a href="mohammadbitullah@gmail.com" className="text-lg text-slate-800 hover:text-blue-600 transition-colors font-medium">mohammadbitullah@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number</span>
                    <a href="tel:+1234567890" className="text-lg text-slate-800 hover:text-blue-600 transition-colors font-medium">+8801724010261</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Office Address</span>
                    <span className="text-lg text-slate-800 block">2300 Kishoreganj Sadar<br />Dhaka, Bangladesh</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mt-1">
                    <LinkIcon size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Personal Portfolio</span>
                    <a href="https://abu-hanif-mia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline font-medium">My Portfolio Website</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Another Websites */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">Our Another Websites</h2>
          <p className="text-slate-600 mb-8 prose prose-lg">
            Beyond CalculatorCentral, our engineering team cultivates a broader ecosystem of premium digital experiences. Explore our expanding portfolio of professional web platforms below.
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
                className="group block bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{site.name}</h3>
                  <Globe size={18} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                <p className="text-sm text-slate-500 mb-4 h-10">{site.desc}</p>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  Visit Site
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="prose prose-slate prose-lg max-w-none text-center bg-slate-50 p-10 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Continuous Evolvement</h2>
          <p className="mb-6">
            The web is not static, and neither are we. We are constantly expanding our library of tools, refining our algorithms, and responding to the evolving needs of our international audience.
          </p>
          <a href="mohammadbitullah@gmail.com" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors no-underline">
            Reach Out to Our Team
          </a>
        </section>
      </div>
    </main>
  );
}

