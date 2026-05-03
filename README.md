# Nexus Calculator 🧮

Welcome to **Nexus Calculator**, a comprehensive and modern web application offering a wide variety of interactive calculators. Built with performance, accessibility, and internationalization in mind, Nexus Calculator aims to be your one-stop destination for all your calculation needs, whether financial, mathematical, or scientific.

## ✨ Features

- **Extensive Calculator Library:** Includes a growing collection of tools such as Mortgage Calculators, Scientific Calculators, and more.
- **Modern Tech Stack:** Built with the latest Next.js 15 App Router for optimal performance and SEO.
- **Internationalization (i18n):** Full support for multiple languages using `next-intl`.
- **Responsive Design:** Fully responsive and mobile-friendly interface built with Tailwind CSS.
- **Accessible UI:** Designed with accessibility in mind, utilizing modern UI patterns and standard HTML semantics.
- **Sleek Interface:** Clean, intuitive, and modern user interface enhanced with stylish icons.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js installed on your machine. We recommend Node.js v18 or later.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/nexus-calculator.git
   cd nexus-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Review `.env.example` and create a `.env.local` file if any environment variables are required.
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application in your local environment.

## 📂 Project Structure

```text
nexus-calculator/
├── app/                  # Next.js App Router root
│   ├── [locale]/         # Internationalized route groups
│   ├── components/       # Reusable standalone React components
│   ├── globals.css       # Global styles and Tailwind directives
│   └── ...
├── messages/             # i18n translation JSON files (e.g., en.json, es.json)
├── i18n/                 # i18n routing and configuration
├── lib/                  # Utility functions and shared logic
├── hooks/                # Custom React hooks
├── public/               # Static assets (images, fonts, etc.)
└── ...
```

## 🏗️ Building for Production

To create an optimized production build, run:

```bash
npm run build
```

After the build completes, you can start the production server:

```bash
npm start
```

## 🌐 Internationalization (i18n)

This project uses `next-intl` to manage translations.
- Translation strings are located in the `/messages` directory as JSON files.
- To add a new language, create a new JSON file (e.g., `fr.json`) in `/messages` and update the configuration in `/i18n/routing.ts` to include the new locale.

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Author: Your Name
Email: your.email@example.com

Project Link: [https://github.com/your-username/nexus-calculator](https://github.com/your-username/nexus-calculator)
