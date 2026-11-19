---
metaTitle: "XML Formatter, Validator & XPath Tester | Client-Side"
metaDescription: "Beautify, minify, and validate XML locally with Monaco syntax highlighting, interactive tree view, XPath 1.0 querying, and instant XML-to-JSON output."
metaKeywords: "xml formatter, xml beautifier, xml pretty print, xml minifier, format xml online, xml parser, xml validator, beautify xml, minify xml, xml syntax checker, format xml, clean xml"
title: "XML Formatter & Beautifier"
shortDescription: "Format, beautify, minify, validate, and convert XML documents instantly. Features syntax highlighting, tree view, XPath testing, XML-to-JSON conversion, and format presets — all client-side."
faqs:
  - question: "How does the validator catch XML syntax errors and pinpoint their exact location?"
    answer: "Every edit triggers a debounced browser-native DOMParser pass in strict application/xml mode. If the document violates W3C XML 1.0 well-formedness rules—such as an unclosed tag, mismatched case, or unescaped ampersand—the parser emits a parsererror diagnostic and extracts the exact line and column number."
  - question: "How are XML attributes and repeated sibling elements represented when converting XML to JSON?"
    answer: "Element attributes are grouped cleanly inside an @attributes object, mixed text or CDATA content alongside attributes is stored under a #text property, and repeated sibling tags with the same name automatically promote into a JSON array so no records are overwritten."
  - question: "Why does my XPath query return zero matches on an XML document with a default xmlns namespace?"
    answer: "In XPath 1.0, unprefixed element names like //url always match nodes in the null namespace, never nodes bound to a default xmlns URI. Either query using a bound prefix resolved by createNSResolver or match namespace-agnostically with local-name(), such as //*[local-name()='url']."
  - question: "When should I avoid minifying XML payloads?"
    answer: "Minification collapses whitespace strictly between adjacent closing and opening tags, which is safe for data-oriented SOAP envelopes, sitemaps, and RSS feeds. However, in mixed-content document schemas such as XHTML or DocBook where spaces separate inline formatting tags like <b>bold</b> <i>italic</i>, stripping inter-tag spaces can merge adjacent words."
  - question: "Can I fetch an XML feed from a URL, and are my local XML files kept private?"
    answer: "All parsing, formatting, XPath evaluation, tree rendering, and JSON conversion run locally in your browser without sending local uploads to any server. The optional Import URL button performs a direct browser fetch(), which works for public CORS-enabled endpoints (servers that block cross-origin browser requests will return a CORS error)."
features:
  - "Real-time W3C XML 1.0 well-formedness validation via native DOMParser with exact line and column diagnostics"
  - "Dual-pane Monaco Editor workspace with XML syntax highlighting, light/dark theme sync, and Word Wrap toggle"
  - "Configurable pretty-printing (2 spaces, 4 spaces, or Tabs) plus one-click inter-tag XML minification"
  - "Interactive collapsible DOM Tree Viewer displaying elements, attributes, text nodes, CDATA blocks, and comments"
  - "Live XPath 1.0 query tester powered by document.evaluate() with namespace resolution and 500-node match capping"
  - "Instant XML-to-JSON converter (@attributes / #text mapping), URL import, .xml upload, and 10-slot local history"
useCases:
  - "Debugging minified SOAP API responses, SAML assertions, and enterprise EDI payloads with exact syntax-error locations"
  - "Auditing XML sitemaps, RSS/Atom syndication feeds, and Maven pom.xml or AndroidManifest.xml configuration files"
  - "Testing XPath 1.0 expressions against nested product catalogs before embedding queries into scrapers or XSLT pipelines"
  - "Converting legacy XML webhook responses into structured JSON objects for modern REST microservices and frontend apps"
  - "Exploring deeply nested 1,000-line configuration hierarchies interactively using the collapsible DOM Tree Viewer"
  - "Compacting verbose XML request templates into single-line payloads for curl scripts, Postman collections, or message queues"
howToSteps:
  - "Paste raw XML into the Monaco input editor, upload a local .xml file, or click Import URL to fetch a CORS-enabled feed."
  - "Check the live validation banner above the editor; if any tag or entity breaks XML 1.0 rules, jump directly to the reported line and column."
  - "Choose 2 Spaces, 4 Spaces, or Tabs beside the Format button and click Format—or click Minify to strip inter-tag whitespace."
  - "Switch to the Tree Viewer tab to expand or collapse nested elements, inspect attribute values, and verify comment or CDATA placement."
  - "Open the XPath Tester tab, type an expression such as //item[@active='true']/title, and run it to inspect serialized node matches."
  - "Visit the XML to JSON tab to copy or export the equivalent JSON representation, or download your cleaned XML output."
---

Unlike forgiving HTML parsers that quietly guess where a missing closing tag belongs, **W3C XML 1.0** follows draconian error handling: a single unescaped `&`, mismatched tag capitalization, or stray character before the `<?xml?>` prolog invalidates the entire payload. **XML Formatter & Beautifier** combines a dual-pane **Monaco Editor** with the browser's native `DOMParser`, giving you instant well-formedness validation, configurable pretty-printing, minification, collapsible DOM tree inspection, XPath 1.0 querying, and XML-to-JSON conversion—all executed privately on your local machine.

## Enforcing W3C XML 1.0 Well-Formedness in the Browser

Half a second after you stop typing or pasting, the editor runs `new DOMParser().parseFromString(xml, "application/xml")`. Because this uses the browser engine's full standards-compliant XML parser rather than a loose regex check, it enforces every core XML 1.0 (Fifth Edition) grammatical constraint:

- **Single root element**: Exactly one top-level document element must wrap all sibling nodes.
- **Strict case sensitivity**: `<OrderItem>` and `</orderItem>` are distinct names and immediately fail pairing validation.
- **Quoted attribute values**: Every attribute must be enclosed in matching single (`'...'`) or double (`"..."`) quotes, and duplicate attribute names on the same element are illegal.
- **Predefined character entities**: Raw `<` and `&` characters inside text nodes or attribute values must be escaped as `&lt;` and `&amp;` (alongside `&gt;`, `&quot;`, and `&apos;` where contextually required)—unless wrapped inside an explicit `<![CDATA[ ... ]]>` section.

### Diagnosing Common Parser Errors by Line and Column

When the parser encounters malformed markup, it injects a `<parsererror>` node containing the engine's exact failure message. The validation banner extracts both the **line** and **column** coordinates automatically. Three culprits account for the vast majority of production XML failures:

1. **Unescaped query-string ampersands**: URLs like `<link>https://api.example.com?a=1&b=2</link>` break parsing because `&b` is read as an unterminated entity reference. Fix it by writing `&amp;b=2`.
2. **Double hyphens inside comments**: Per the XML 1.0 spec, `--` is forbidden anywhere inside `<!-- ... -->` comments (even inside commented-out CLI flags like `<!-- --verbose -->`).
3. **Leading whitespace or BOM before the XML declaration**: `<?xml version="1.0" encoding="UTF-8"?>` must start at byte 0, line 1, column 1; even a single leading space triggers a processing-instruction syntax error.

If you are authoring web markup that allows void tags (`<img>`, `<br>`) and relaxed attribute quoting, use our dedicated [HTML Formatter](/en/tools/html-formatter) instead of strict XML mode.

## Pretty-Printing, Mixed-Content Whitespace, and Minification

Formatting splits adjacent tag boundaries (`><`) onto clean lines, tracks element nesting depth across opening, self-closing (`<tag />`), and closing tags, and applies your chosen **2 Spaces**, **4 Spaces**, or **Tab** indentation. Conversely, **Minify** removes redundant inter-tag indentation (`/>\s+</g` → `><`), shrinking verbose SOAP envelopes, API fixtures, and sitemap feeds—for example, files generated by the [Sitemap XML Generator](/en/tools/sitemap-xml-generator)—into compact single-line strings.

Keep one XML specification subtlety in mind: XML distinguishes **data-oriented** documents (config files, RPC payloads, catalogs) from **mixed-content** documents (XHTML, DocBook, TEI). In mixed content like `<p>Click <b>Save</b> <i>now</i>.</p>`, the single space between `</b>` and `<i>` is semantically significant; minifying between adjacent inline tags collapses `Save now` into `Savenow`. Always keep pretty-printing or preserve `xml:space="preserve"` sections intact when editing prose-oriented XML.

## Navigating Deep Schemas with Tree View and XPath 1.0

When inspecting a 4,000-line Maven `pom.xml`, SAML 2.0 assertion, or financial ISO 20022 message, linear scrolling hides parent-child hierarchy. Switching to the **Tree Viewer** renders the parsed DOM interactively with the first two levels expanded, color-coding element tags, attribute key-value pairs, CDATA/text payloads, and `<!-- comments -->` so you can fold unrelated branches cleanly.

For surgical extraction, open the **XPath Tester** tab. Queries run directly against the live XML document via `doc.evaluate(xpathQuery, doc, resolver, XPathResult.ANY_TYPE, null)` and serialize up to 500 matching nodes with `XMLSerializer`:

```xpath
//book[@category='programming' and price < 45]/title
//item[contains(@sku, 'US-')]/stock/text()
//*[local-name()='loc']
```

### Handling Default and Prefixed Namespaces in XPath

The built-in `doc.createNSResolver(doc.documentElement)` automatically resolves declared namespace prefixes (such as `soap:Envelope` or `atom:entry`) declared on the root element. However, **XPath 1.0** specifies that unprefixed node tests never match a *default* namespace (`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`). Whenever a sitemap or Office Open XML document declares an unprefixed `xmlns`, match elements cleanly with `local-name()`—for example, `//*[local-name()='url']/*[local-name()='loc']`—to bypass default-namespace binding quirks.

## Deterministic XML-to-JSON Translation Rules

Because XML supports attributes, ordered sibling tags, comments, and mixed text that have no single native JSON equivalent, predictable conventions matter when bridging legacy XML systems with REST APIs. The **XML to JSON** tab applies deterministic DOM-to-object rules that you can further inspect or validate in our [JSON Formatter](/en/tools/json-formatter):

| XML Construct | Example XML Snippet | Formatter & Tree View Behavior | Resulting JSON Representation |
| :--- | :--- | :--- | :--- |
| **Simple Element** | `<status>OK</status>` | Indented leaf node with text child | `"status": "OK"` |
| **Element with Attributes** | `<price cur="USD">29.99</price>` | Attributes highlighted inline on open tag | `"price": { "@attributes": { "cur": "USD" }, "#text": "29.99" }` |
| **Empty Self-Closing Tag** | `<flag enabled="true" />` | Rendered as single self-closing node | `"flag": { "@attributes": { "enabled": "true" } }` |
| **Repeated Sibling Tags** | `<tag>xml</tag><tag>api</tag>` | Stacked sibling branches under parent | `"tag": ["xml", "api"]` (auto-promoted array) |
| **CDATA Section** | `<raw><![CDATA[a < b & c]]></raw>` | Displayed verbatim without entity escaping | `"raw": "a < b & c"` |
| **XML Comments** | `<!-- Build 42 -->` | Italicized muted node in Tree Viewer | Stripped during JSON object serialization |
| **Namespaces** | `<ns:id xmlns:ns="urn:x">7</ns:id>` | Preserved verbatim; queryable via resolver | `"ns:id": { "@attributes": { "xmlns:ns": "urn:x" }, "#text": "7" }` |

Between live Monaco syntax highlighting, debounced `DOMParser` validation, interactive DOM folding, XPath 1.0 testing, and deterministic JSON output, every inspection step completes locally inside a single browser tab.
