import React from "react";
import { getTranslations } from "next-intl/server";

export async function ProbabilitySeoContent() {
  const t = await getTranslations("ProbabilitySeo");

  return (
    <article className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10 prose prose-slate dark:prose-invert max-w-none lg:prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#518231] prose-img:rounded-xl">
      <header className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{t("seoTitle")}</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          {t("seoIntro")}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <div className="md:col-span-8 space-y-12">
          
          <section>
            <h3 className="text-2xl font-semibold mb-4">{t("sec1Title")}</h3>
            <p className="mb-4">{t("sec1P1")}</p>
            <p className="mb-4">{t("sec1P2")}</p>
            <p>{t("sec1P3")}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">{t("sec2Title")}</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>{t("sec2Event").split(':')[0]}:</strong> {t("sec2Event").split(':')[1]}</li>
              <li><strong>{t("sec2SampleSpace").split(':')[0]}:</strong> {t("sec2SampleSpace").split(':')[1]}</li>
              <li><strong>{t("sec2MutuallyExclusive").split(':')[0]}:</strong> {t("sec2MutuallyExclusive").split(':')[1]}</li>
              <li><strong>{t("sec2Independent").split(':')[0]}:</strong> {t("sec2Independent").split(':')[1]}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">{t("sec3Title")}</h3>
            <div className="bg-slate-50 p-6 rounded-2xl mb-4 border border-slate-100">
              <h4 className="font-semibold text-lg mb-2">{t("sec3Addition")}</h4>
              <p>{t("sec3AdditionDesc")}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-semibold text-lg mb-2">{t("sec3Multiplication")}</h4>
              <p>{t("sec3MultiplicationDesc")}</p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">{t("sec4Title")}</h3>
            <p className="mb-4">{t("sec4Cond")}</p>
            <p className="mb-4 bg-blue-50 border-l-4 border-blue-600 p-4 text-blue-900 rounded-r-lg">
              {t("sec4Bayes")}
            </p>
            <p>{t("sec4BayesApp")}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">{t("sec5Title")}</h3>
            <p className="mb-4">{t("sec5Desc")}</p>
            <p className="font-mono bg-slate-100 px-2 py-1 rounded inline-block mb-4">{t("sec5Formula")}</p>
            <p>{t("sec5Example")}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">{t("sec6Title")}</h3>
            <p className="mb-4">{t("sec6Desc")}</p>
            <p>{t("sec6Conversion")}</p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4">{t("sec7Title")}</h3>
            <p className="mb-4">{t("sec7Desc")}</p>
            <p>{t("sec7Sim")}</p>
          </section>
        </div>

        {/* Sidebar / Additional Info Column */}
        <aside className="md:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-6">
            <h3 className="text-xl font-bold mb-4">{t("sec8Title")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-3 mt-1 flex-shrink-0">1</span>
                <p className="text-sm">{t("sec8Finance")}</p>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-700 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-3 mt-1 flex-shrink-0">2</span>
                <p className="text-sm">{t("sec8Medicine")}</p>
              </li>
              <li className="flex items-start">
                <span className="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-3 mt-1 flex-shrink-0">3</span>
                <p className="text-sm">{t("sec8Gaming")}</p>
              </li>
            </ul>

            <h3 className="text-xl font-bold mt-8 mb-4 border-t border-slate-100 pt-6">{t("sec9Title")}</h3>
            <ul className="space-y-4">
              <li className="text-sm">
                <strong>{t("sec9Gamblers").split(':')[0]}:</strong> {t("sec9Gamblers").split(':')[1]}
              </li>
              <li className="text-sm">
                <strong>{t("sec9BaseRate").split(':')[0]}:</strong> {t("sec9BaseRate").split(':')[1]}
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* FAQ Section with Schema.org rich results potential */}
      <section className="mt-16 pt-12 border-t border-slate-200 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center">{t("faqTitle")}</h3>
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-lg mb-2 text-slate-800">{t("faq1Q")}</h4>
            <p className="text-slate-600">{t("faq1A")}</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-lg mb-2 text-slate-800">{t("faq2Q")}</h4>
            <p className="text-slate-600">{t("faq2A")}</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-lg mb-2 text-slate-800">{t("faq3Q")}</h4>
            <p className="text-slate-600">{t("faq3A")}</p>
          </div>
        </div>
      </section>
    </article>
  );
}
