import { NotFoundView } from './components/NotFoundView';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col dark:bg-slate-950 dark:text-slate-100 font-sans">
        <NotFoundView />
      </body>
    </html>
  );
}
