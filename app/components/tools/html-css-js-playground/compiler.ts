import { marked } from 'marked';
// @ts-ignore
import * as Babel from '@babel/standalone';

export type HtmlMode = 'html' | 'markdown';
export type CssMode = 'css' | 'scss';
export type JsMode = 'javascript' | 'babel';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.head.appendChild(script);
  });
}

export async function compileCode(
  html: string,
  css: string,
  js: string,
  htmlMode: HtmlMode,
  cssMode: CssMode,
  jsMode: JsMode
): Promise<{ compiledHtml: string; compiledCss: string; compiledJs: string; error?: string }> {
  let compiledHtml = html;
  let compiledCss = css;
  let compiledJs = js;

  try {
    // Compile HTML
    if (htmlMode === 'markdown') {
      compiledHtml = await marked.parse(html);
    }

    // Compile CSS
    if (cssMode === 'scss') {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js');
      compiledCss = await new Promise((resolve, reject) => {
        // @ts-ignore
        if (!window.Sass) return reject(new Error("Sass failed to load"));
        
        // @ts-ignore
        window.Sass.compile(css, (result: any) => {
          if (result.status === 0) {
            resolve(result.text);
          } else {
            reject(new Error(result.formatted || result.message));
          }
        });
      });
    }

    // Compile JS
    if (jsMode === 'babel') {
      const result = Babel.transform(js, { presets: ['react', 'env'] });
      compiledJs = result.code || '';
    }

    return { compiledHtml, compiledCss, compiledJs };
  } catch (err: any) {
    return { compiledHtml: '', compiledCss: '', compiledJs: '', error: err.message || 'Compilation Error' };
  }
}
