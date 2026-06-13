export interface SvgOptimizerOptions {
  preset: 'safe' | 'standard' | 'aggressive' | 'max';
  precision: number;
  removeComments: boolean;
  removeMetadata: boolean;
  removeEditorTags: boolean;
  removeHiddenElements: boolean;
  removeDefaultAttributes: boolean;
  minifyStyles: boolean;
  collapseGroups: boolean;
  cleanColors: boolean;
  roundCoordinates: boolean;
  simplifyPaths: boolean;
}

export interface SvgAnalysis {
  fileSize: number;
  width: number | null;
  height: number | null;
  viewBox: string | null;
  elementCount: number;
  pathCount: number;
  groupCount: number;
  styleCount: number;
  gradientCount: number;
  metadataCount: number;
}

export class SvgOptimizer {
  /**
   * Helper to minify color names, HEX codes, and rgb() values
   */
  private static minifyColor(colorStr: string): string {
    let color = colorStr.trim().toLowerCase();
    
    // Convert rgb() values
    const rgbRegex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
    const match = color.match(rgbRegex);
    if (match) {
      const r = Math.min(255, parseInt(match[1])).toString(16).padStart(2, '0');
      const g = Math.min(255, parseInt(match[2])).toString(16).padStart(2, '0');
      const b = Math.min(255, parseInt(match[3])).toString(16).padStart(2, '0');
      color = `#${r}${g}${b}`;
    }
    
    // Shorten HEX color codes (e.g., #ffffff -> #fff)
    if (color.startsWith('#') && color.length === 7) {
      if (color[1] === color[2] && color[3] === color[4] && color[5] === color[6]) {
        color = `#${color[1]}${color[3]}${color[5]}`;
      }
    }

    // Convert to shorter representation
    const hexToName: Record<string, string> = {
      '#000000': 'black',
      '#000': 'black',
      '#ffffff': 'white',
      '#fff': 'white',
      '#ff0000': 'red',
      '#f00': 'red'
    };

    if (hexToName[color]) {
      return hexToName[color];
    }

    return color;
  }

  /**
   * Parse path data d string, round coordinates, and minify spacing
   */
  private static optimizePathData(d: string, precision: number): string {
    if (!d) return '';

    // Regex to extract commands and numeric values (handles floats, exponents, and negatives)
    const tokenRegex = /([mlhvcsqtazMLHVCSQTAZ])|(-?\d*\.?\d+(?:[eE][-+]?\d+)?)/g;
    const tokens: string[] = [];
    let match;

    while ((match = tokenRegex.exec(d)) !== null) {
      if (match[1]) {
        // Command
        tokens.push(match[1]);
      } else if (match[2]) {
        // Coordinate
        const val = parseFloat(match[2]);
        const rounded = parseFloat(val.toFixed(precision));
        tokens.push(rounded.toString());
      }
    }

    // Reconstruct optimized path d string with minimum spaces
    let result = '';
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const prevToken = tokens[i - 1];

      if (i === 0) {
        result += token;
        continue;
      }

      const isCommand = /[mlhvcsqtazMLHVCSQTAZ]/.test(token);
      const isPrevCommand = prevToken && /[mlhvcsqtazMLHVCSQTAZ]/.test(prevToken);

      if (isCommand || isPrevCommand) {
        // No space needed next to a command letter
        result += token;
      } else if (token.startsWith('-')) {
        // No space needed before negative coordinates
        result += token;
      } else {
        // Space needed between consecutive positive numbers
        result += ' ' + token;
      }
    }

    return result;
  }

  /**
   * Traverses nodes to strip comments
   */
  private static removeComments(node: Node) {
    let child = node.firstChild;
    while (child) {
      const next = child.nextSibling;
      if (child.nodeType === Node.COMMENT_NODE) {
        node.removeChild(child);
      } else {
        this.removeComments(child);
      }
      child = next;
    }
  }

  /**
   * Checks if attribute value matches the SVG default render properties
   */
  private static isDefaultAttribute(tagName: string, name: string, value: string): boolean {
    const val = value.trim().toLowerCase();
    if (name === 'x' && val === '0') return true;
    if (name === 'y' && val === '0') return true;
    if (name === 'xml:space' && val === 'preserve') return true;
    if (name === 'version' && val === '1.1') return true;
    if (name === 'fill' && val === 'black' && (tagName === 'path' || tagName === 'rect' || tagName === 'circle')) return true;
    return false;
  }

  /**
   * Walk DOM tree and run nodes filters
   */
  private static cleanDomNodes(el: Element, options: SvgOptimizerOptions, defsIds: Set<string>) {
    // 1. Remove hidden elements
    if (options.removeHiddenElements) {
      const display = el.getAttribute('display');
      const opacity = el.getAttribute('opacity');
      const wAttr = el.getAttribute('width');
      const hAttr = el.getAttribute('height');

      if (display === 'none' || opacity === '0' || wAttr === '0' || hAttr === '0') {
        el.parentNode?.removeChild(el);
        return;
      }

      if (el.tagName.toLowerCase() === 'path' && el.getAttribute('d') === '') {
        el.parentNode?.removeChild(el);
        return;
      }
    }

    // 2. Clean up editor tags and namespaces
    const attrsToRemove: string[] = [];
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      const name = attr.name;
      const val = attr.value;

      if (options.removeEditorTags) {
        if (
          name.startsWith('inkscape:') ||
          name.startsWith('sodipodi:') ||
          name.startsWith('adobe:') ||
          name.includes('illustrator')
        ) {
          attrsToRemove.push(name);
          continue;
        }
      }

      if (options.removeDefaultAttributes) {
        if (this.isDefaultAttribute(el.tagName.toLowerCase(), name, val)) {
          attrsToRemove.push(name);
          continue;
        }
      }

      // Shorten HEX/RGB colors inside attributes
      if (options.cleanColors) {
        if (name === 'fill' || name === 'stroke') {
          if (val && val !== 'none' && !val.startsWith('url')) {
            el.setAttribute(name, this.minifyColor(val));
          }
        }
      }

      // Round coordinates in path tags
      if (options.roundCoordinates && el.tagName.toLowerCase() === 'path' && name === 'd') {
        el.setAttribute('d', this.optimizePathData(val, options.precision));
      }
    }

    attrsToRemove.forEach(attr => el.removeAttribute(attr));

    // 3. Minify inline styles
    if (options.minifyStyles) {
      const style = el.getAttribute('style');
      if (style) {
        const minified = style
          .split(';')
          .map(s => {
            const parts = s.split(':');
            if (parts.length === 2) {
              let key = parts[0].trim();
              let val = parts[1].trim();
              if (options.cleanColors && (key === 'fill' || key === 'stroke')) {
                val = this.minifyColor(val);
              }
              return `${key}:${val}`;
            }
            return '';
          })
          .filter(Boolean)
          .join(';');
        
        if (minified) el.setAttribute('style', minified);
        else el.removeAttribute('style');
      }
    }

    // Recurse children (do it in reverse order in case elements are removed)
    const children = Array.from(el.children);
    for (let i = children.length - 1; i >= 0; i--) {
      this.cleanDomNodes(children[i], options, defsIds);
    }

    // 4. Collapse styleless/redundant groups
    if (options.collapseGroups && el.tagName.toLowerCase() === 'g') {
      if (el.attributes.length === 0 && el.parentNode) {
        // Move children to parent, then remove group
        const parent = el.parentNode;
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
      }
    }
  }

  /**
   * Scans document for referenced defs IDs (gradients, patterns etc)
   */
  private static scanReferencedIds(el: Element, idsSet: Set<string>) {
    for (let i = 0; i < el.attributes.length; i++) {
      const val = el.attributes[i].value;
      if (val && val.includes('url(#')) {
        const match = val.match(/url\(#([^)]+)\)/);
        if (match) {
          idsSet.add(match[1]);
        }
      }
    }
    for (let i = 0; i < el.children.length; i++) {
      this.scanReferencedIds(el.children[i], idsSet);
    }
  }

  /**
   * Clean unused nodes inside <defs>
   */
  private static removeUnusedDefs(doc: Document, referencedIds: Set<string>) {
    const defs = doc.querySelectorAll('defs *');
    defs.forEach(node => {
      const id = node.getAttribute('id');
      if (id && !referencedIds.has(id)) {
        // Unused definition node, delete it
        node.parentNode?.removeChild(node);
      }
    });

    // Clean up empty defs
    const defsContainers = doc.querySelectorAll('defs');
    defsContainers.forEach(container => {
      if (container.children.length === 0) {
        container.parentNode?.removeChild(container);
      }
    });
  }

  /**
   * Analyze SVG code metrics
   */
  public static analyze(svgText: string): SvgAnalysis {
    const stats: SvgAnalysis = {
      fileSize: new Blob([svgText]).size,
      width: null,
      height: null,
      viewBox: null,
      elementCount: 0,
      pathCount: 0,
      groupCount: 0,
      styleCount: 0,
      gradientCount: 0,
      metadataCount: 0
    };

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) return stats;

      const svgEl = doc.querySelector('svg');
      if (!svgEl) return stats;

      // Extract basic dimensions
      const wAttr = svgEl.getAttribute('width');
      const hAttr = svgEl.getAttribute('height');
      if (wAttr) stats.width = parseFloat(wAttr) || null;
      if (hAttr) stats.height = parseFloat(hAttr) || null;

      const viewBox = svgEl.getAttribute('viewBox');
      if (viewBox) {
        stats.viewBox = viewBox;
        const parts = viewBox.split(/[\s,]+/).map(parseFloat);
        if (parts.length === 4) {
          if (stats.width === null) stats.width = parts[2];
          if (stats.height === null) stats.height = parts[3];
        }
      }

      // Count tags
      const allElements = doc.querySelectorAll('*');
      stats.elementCount = allElements.length;
      stats.pathCount = doc.querySelectorAll('path').length;
      stats.groupCount = doc.querySelectorAll('g').length;
      stats.styleCount = doc.querySelectorAll('style').length + svgEl.querySelectorAll('[style]').length;
      stats.gradientCount = doc.querySelectorAll('linearGradient, radialGradient, pattern').length;
      stats.metadataCount = doc.querySelectorAll('metadata, sodipodi\\:namedview, sodipodi\\:grid').length;
    } catch (e) {
      console.error(e);
    }

    return stats;
  }

  /**
   * Run optimization pipeline
   */
  public static optimize(svgText: string, options: SvgOptimizerOptions): string {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        throw new Error("Invalid XML layout detected. Please verify your SVG formatting.");
      }

      const svgRoot = doc.querySelector('svg');
      if (!svgRoot) {
        throw new Error("No root <svg> element found in the document.");
      }

      // 1. Remove comments
      if (options.removeComments) {
        this.removeComments(doc);
      }

      // 2. Remove editor metadata elements directly
      if (options.removeMetadata) {
        const metaElements = doc.querySelectorAll('metadata, sodipodi\\:namedview, adobe\\:ns, sodipodi\\:grid');
        metaElements.forEach(el => el.parentNode?.removeChild(el));
      }

      // Scan referenced IDs first to avoid breaking referenced nodes
      const referencedIds = new Set<string>();
      this.scanReferencedIds(svgRoot, referencedIds);

      // 3. Clean up DOM nodes recursively
      this.cleanDomNodes(svgRoot, options, referencedIds);

      // 4. Remove unused defs
      if (options.removeEditorTags) {
        this.removeUnusedDefs(doc, referencedIds);
      }

      // 5. Serialize XML back to string
      const serializer = new XMLSerializer();
      let optimizedText = serializer.serializeToString(doc);

      // 6. Text minification (remove newlines, double spaces, padding around XML tags)
      optimizedText = optimizedText
        .replace(/[\n\r]+/g, ' ') // replace line breaks with spaces
        .replace(/>\s+</g, '><')   // strip whitespace between tag ends/starts
        .replace(/\s{2,}/g, ' ')   // collapse double spaces
        .trim();

      return optimizedText;
    } catch (e: any) {
      console.error(e);
      return svgText; // Fallback to original
    }
  }
}
