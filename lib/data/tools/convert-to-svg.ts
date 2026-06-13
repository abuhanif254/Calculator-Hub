import { ToolConfig } from './types';

export const convertToSvgToolConfig: ToolConfig = {
  slug: "convert-to-svg",
  title: "Convert to SVG",
  shortDescription: "Convert PNG, JPG, JPEG, WEBP, and BMP images into scalable, clean SVG vector graphics locally in your browser. Optimize paths, simplify curves, remove backgrounds, and download individually or in batch.",
  category: "Image Tools",
  keywords: [
    "convert to svg",
    "image to svg",
    "svg converter",
    "jpg to svg",
    "png to svg",
    "webp to svg",
    "raster to svg",
    "vector converter",
    "vectorize image",
    "online svg converter",
    "svg generator"
  ],
  features: [
    "Trace raster bitmap images (PNG, JPG, WEBP, BMP, GIF) into vector SVGs locally",
    "Six tracing presets: Logo, Icon, Illustration, Line Art, Monochrome, and Full Color",
    "Trace quality controls: Fast, Balanced, High Quality, and Ultra Precision settings",
    "Fine-grained path controls: Simplify curves (RDP tolerance) and Shape Smoothing (Bézier tension)",
    "Edge detection adjustments: Edge Sensitivity, Detail Retention, and Precision thresholds",
    "Transparency options: Automatic background removal, transparent outputs, or custom solid backdrops",
    "Sync viewports with side-by-side zoom comparisons and split-screen swipe previewers",
    "Vector statistics including path count, color count, optimization score, and size changes",
    "Integrated Monaco editor for viewing, editing, copying, and downloading raw SVG code",
    "Developer exports including inline SVG tags, React Component templates, and responsive picture code",
    "Process queues sequentially and package-export batch conversions as a ZIP folder"
  ],
  useCases: [
    "Vectorizing low-resolution company logos (PNG/JPG) into scalable high-quality SVGs for print or web",
    "Converting flat sketches and drawings into clean vector outlines for laser engraving or vinyl cutting",
    "Converting icons or illustrations into minified SVGs to reduce page weight and asset bundle sizes",
    "Raster-to-vector extraction of charts, blueprints, and diagrams for engineering or CAD systems",
    "Removing background colors from logos or icons while creating clean vector contours",
    "Securing design workflows by processing sensitive corporate assets 100% offline and locally"
  ],
  howToSteps: [
    "Upload your images (PNG, JPG, WEBP, BMP, GIF) by dragging and dropping them, or browsing.",
    "Select your preferred Tracing Preset (e.g. Logo, Line Art, Illustration).",
    "Choose your Color Processing mode (Full Color, Grayscale, Monochrome, Black & White) and set color counts.",
    "Fine-tune shape precision, node simplification, and corner smoothing to adjust output path counts.",
    "Verify the results in the sync-zoomable comparison panel or the code viewer tab.",
    "Download the SVG file, copy the XML code, or export the entire batch queue as a ZIP file."
  ],
  relatedTools: [
    { name: "PNG to SVG", slug: "png-to-svg" },
    { name: "SVG to PNG", slug: "svg-to-png" },
    { name: "SVG Optimizer", slug: "svg-optimizer" },
    { name: "Favicon Generator", slug: "favicon-generator" },
    { name: "Convert to PNG", slug: "convert-to-png" },
    { name: "Convert to WebP", slug: "convert-to-webp" }
  ],
  examples: [],
  faq: [
    {
      question: "What is an SVG format?",
      answer: "SVG stands for Scalable Vector Graphics. It is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation. Unlike raster formats (like PNG or JPG), which store images as grids of colored pixels, SVG stores images as mathematical formulas describing points, lines, curves, shapes, and colors. This allows SVGs to be scaled to any size without losing quality or becoming pixelated."
    },
    {
      question: "What is the difference between raster and vector images?",
      answer: "Raster images (such as PNG, JPG, WEBP, and GIF) are made up of a fixed grid of pixels. When you scale up a raster image, the pixels expand, resulting in a blurry, pixelated image. Vector images (such as SVG, EPS, and PDF Vector) are made up of paths defined by mathematical equations. When you scale a vector image, the browser recalculates the equations, keeping the image perfectly sharp at any size or resolution."
    },
    {
      question: "How does the Image to SVG converter work?",
      answer: "The converter works by applying image processing algorithms locally in your browser. First, it samples the uploaded image's pixels and clusters them into a localized color palette using K-Means clustering. Next, it maps the pixel grid into indexed color regions. It then traces the boundaries of each color layer to form polyline contours. Finally, it simplifies the paths using Ramer-Douglas-Peucker polyline simplification and fits Bézier curves to create smooth, scalable vector shapes."
    },
    {
      question: "Is my image uploaded to your server?",
      answer: "No. Privacy and security are core principles of our platform. All image processing, color quantization, contour tracing, and SVG generation happen entirely locally within your browser using HTML5 Canvas, OffscreenCanvas, and client-side JavaScript. Your images are never sent to our servers, ensuring your sensitive graphics remain 100% private."
    },
    {
      question: "What raster formats are supported as input?",
      answer: "The converter supports PNG, JPG, JPEG, WEBP, BMP, and static GIF images. It is also designed to support HEIC (iPhone photos), AVIF, and TIFF formats by leveraging dynamic browser-side decoders."
    },
    {
      question: "Can I convert color images to SVG?",
      answer: "Yes. Our converter features a 'Full Color' mode that allows you to specify the maximum number of colors (from 2 up to 64). The tracing engine will group similar colors together to create a multi-layered vector graphic. You can also trace in Grayscale, Monochrome, or high-contrast Black & White."
    },
    {
      question: "What are the vectorization presets?",
      answer: "We provide six optimized presets:\n1. **Logo Mode**: Ideal for company logos, stickers, and brand icons. Focuses on sharp edges and flat colors.\n2. **Icon Mode**: Maximizes shape simplification and path smoothing to create clean, lightweight icons.\n3. **Illustration**: Designed for complex multi-colored graphic illustrations with layered shapes.\n4. **Line Art Mode**: Traces the edges of drawings as stroked lines rather than solid fills.\n5. **Monochrome Mode**: Creates single-color vector silhouettes or templates.\n6. **Full Color**: Preserves maximum color details and shape precision."
    },
    {
      question: "Can I use the generated SVGs for print design?",
      answer: "Yes. Because SVGs are vector files, they are highly suited for high-resolution professional printing. You can scale them up to billboard sizes without any loss of quality. They are also perfect for screen printing and merchandise mockups."
    },
    {
      question: "Are the generated SVGs suitable for vinyl cutters and laser engraving?",
      answer: "Yes. CNC machines, vinyl cutters (like Cricut or Silhouette), laser engravers, and embroidery machines require vector path coordinates to guide their cutting heads or needles. By using the 'Line Art' or 'Black & White' modes, you can generate clean, connected outline paths optimized for cutting and engraving."
    },
    {
      question: "Can I batch convert multiple images to SVG?",
      answer: "Yes. You can upload multiple files at once. The converter queue will process them sequentially. Once finished, you can review each vector graphic individually or download all converted SVGs as a single ZIP archive."
    },
    {
      question: "How do I reduce the file size of the generated SVG?",
      answer: "To reduce the file size of your SVG, you can:\n1. Reduce the **Color Count** (fewer color layers mean fewer paths).\n2. Increase the **Simplify** slider (reduces the number of nodes/anchor points along paths).\n3. Increase **Shape Smoothing** (groups segments into long, smooth curves).\n4. Toggle **Remove Background** to discard unnecessary background rectangular shapes."
    },
    {
      question: "What does the 'Simplify' setting do?",
      answer: "The 'Simplify' setting controls the Ramer-Douglas-Peucker (RDP) tolerance threshold. It removes unnecessary anchor points (nodes) that lie close to the traced path. A higher simplification value results in fewer nodes and a smaller file size, but may slightly alter the shape details. A lower value preserves exact coordinates at the expense of larger file sizes."
    },
    {
      question: "What does the 'Smoothing' setting do?",
      answer: "The 'Smoothing' setting controls the tension of the fitted Bézier curves. A value of 0 results in sharp, straight polygonal segments (flat lines). Higher values apply mathematical spline calculations to create smooth, curved paths, which are ideal for icons, organic illustrations, and rounded typography."
    },
    {
      question: "What is K-Means color clustering in vectorization?",
      answer: "K-Means clustering is an unsupervised machine learning algorithm used by our tracer to analyze the colors of your uploaded image. It groups similar pixel colors into 'K' clusters, establishing an optimized palette that represents the image with minimal distortion. This helps in tracing distinct color layers without manual color selection."
    },
    {
      question: "What is Ramer-Douglas-Peucker polyline simplification?",
      answer: "It is an algorithm that decimes a curve composed of line segments to a similar curve with fewer points. It is widely used in vectorization to filter out digital noise and jitter, ensuring that path curves are defined by only the most critical anchor points."
    },
    {
      question: "Can I edit the SVG code directly?",
      answer: "Yes. Our tool features an integrated **SVG Code Viewer** built with Monaco Editor. You can view the raw XML markup, make live code edits (such as changing colors, adding classes, or modifying viewBox attributes), and immediately see the visual changes render in the live preview workspace."
    },
    {
      question: "Does this tool support transparent backgrounds?",
      answer: "Yes. If your source image is a transparent PNG or WebP, the engine will ignore transparent areas. If the image has a solid background (like white or black), you can enable the **Remove Background** toggle to automatically key it out, producing a transparent vector graphic."
    },
    {
      question: "Can I copy the SVG code to my clipboard?",
      answer: "Yes. Inside the 'Code View' tab, there is a dedicated 'Copy SVG Code' button that copies the clean XML markup to your clipboard. This is ideal for quickly pasting SVG code directly into HTML documents or React projects."
    },
    {
      question: "Does this tool generate React SVG Components?",
      answer: "Yes. In the developer statistics panel, you can copy a fully-formatted React TypeScript component snippet representing your vectorized SVG. This includes JSX-compatible attributes and prop interfaces."
    },
    {
      question: "Why is the SVG file size sometimes larger than the original PNG?",
      answer: "Vector files represent shapes mathematically. If you upload a complex photograph with gradients, textures, or thousands of unique colors, the engine has to create thousands of overlapping paths to represent those details. In such cases, the vector file can easily exceed the size of a compressed raster image. Vectors are best suited for flat graphics, logos, icons, diagrams, and line drawings."
    },
    {
      question: "Can I convert JPG to SVG?",
      answer: "Yes. Our tool supports JPG conversion. Because JPG is a lossy format, it contains compression artifacts (noise) around edges. We recommend increasing the **Smoothing** and **Simplify** parameters slightly when tracing JPGs to clean up these artifacts."
    },
    {
      question: "Does this tool support offline conversion?",
      answer: "Yes. Once the page is loaded in your web browser, all core tracing and conversion tasks run entirely offline on your local processor. You can continue converting images without an active internet connection."
    },
    {
      question: "What browser compatibility is required?",
      answer: "The tool is fully compatible with all modern browsers supporting HTML5 Canvas and ES6 JavaScript, including Chrome, Safari, Firefox, Edge, and mobile browsers."
    },
    {
      question: "How does the 'Line Art' mode work?",
      answer: "Unlike filled modes that trace solid shape layers, Line Art mode maps the contours as thin open or closed polylines. It applies custom stroke colors and stroke widths, turning illustrations or sketches into clean wireframe vectors."
    },
    {
      question: "Can I limit the number of colors in the SVG?",
      answer: "Yes. Under the color settings, you can customize the **Color Count** slider from 2 up to 64 colors. Limiting colors simplifies the graphic and reduces the final SVG file size."
    },
    {
      question: "What is an SVG viewBox?",
      answer: "The `viewBox` is an attribute of the `<svg>` element that defines the aspect ratio and internal coordinate system of the graphic. It allows the SVG to scale responsively to fit any container width and height dynamically."
    },
    {
      question: "What is the difference between SVG and EPS?",
      answer: "SVG is designed primarily for the web and interactive displays, utilizing XML markup that browsers can render natively. EPS (Encapsulated PostScript) is a legacy vector format used primarily in the print industry. SVGs can be converted to EPS using editors like Illustrator or Inkscape."
    },
    {
      question: "Can I save my favorite settings?",
      answer: "Yes. You can save custom configurations (preset, colors, simplify, smoothing) under the 'Saved Presets' section. These are stored locally on your machine via `localStorage` and can be loaded with a single click in future sessions."
    },
    {
      question: "How does the split-screen comparison work?",
      answer: "The split-screen comparison displays a slider overlay. Dragging the slider left or right reveals the original raster image on one side and the vectorized SVG output on the other, allowing you to inspect visual discrepancies."
    },
    {
      question: "Can I paste an image directly from my clipboard?",
      answer: "Yes. You can paste an image directly into the workspace drop zone using `Ctrl+V` (or `Cmd+V` on Mac). The tool will capture the clipboard data and add it to your queue instantly."
    },
    {
      question: "What is the maximum resolution supported?",
      answer: "There is no strict resolution limit. However, extremely high-resolution images (e.g. 8K) will consume more memory and processing power since all calculations are done locally in your browser. We recommend keeping files under 20MB for a smooth UX."
    },
    {
      question: "Does this tool support SVG minification?",
      answer: "Yes. You can select the 'Minified SVG' export option. This removes comments, XML namespaces, unnecessary whitespaces, and metadata to reduce the final file size by up to 25%."
    },
    {
      question: "What is Bezier curve fitting?",
      answer: "Bezier curve fitting is the process of calculating smooth cubic or quadratic curves to represent a series of connected coordinate points. This transforms blocky polygonal paths into clean, organic curves."
    },
    {
      question: "Can I restore color gradients in the SVG?",
      answer: "Vector tracing converts gradients into discrete bands of solid colors. If you want a smooth gradient, you can trace with a higher color count (e.g., 32 or 64 colors) or edit the SVG paths in the code viewer to apply CSS linear or radial gradients."
    },
    {
      question: "How does the background removal sensitivity work?",
      answer: "The background removal tool analyzes the color of the corner pixel of the image as the reference background. The sensitivity slider controls the threshold distance: a higher sensitivity removes colors that are slightly different from the reference color, while a lower sensitivity only removes exact matches."
    },
    {
      question: "Can I convert GIF to SVG?",
      answer: "Yes. You can upload GIF files. The tool will capture the first static frame of the GIF and vectorize it. Animated GIFs will be processed as static images."
    },
    {
      question: "Does the SVG support responsive design?",
      answer: "Yes. The generated SVG uses a `viewBox` and `width=\"100%\"` / `height=\"100%\"` settings. This allows the vector image to adapt and scale fluidly within any responsive CSS grid or flexbox layout."
    },
    {
      question: "Can I export to PDF or EPS vector formats?",
      answer: "Currently, our tool exports standardized SVG, Optimized SVG, and Minified SVG. PDF and EPS vector formats are listed in our architectural roadmap and will be supported in future releases."
    },
    {
      question: "Is there a charge to convert files?",
      answer: "No. This tool is 100% free with no limits, registrations, or advertisements."
    },
    {
      question: "Is my device's performance affected during conversion?",
      answer: "Since processing is local, CPU usage will temporarily increase during the tracing phase. We use asynchronous timeouts and web worker concepts to keep the UI interactive, preventing browser freezes."
    },
    {
      question: "What does the Optimization Score mean?",
      answer: "The Optimization Score is an indicator of path efficiency. It compares the number of paths and anchor points to the output dimensions, showing how well-optimized the file is for web delivery. High scores indicate lean, fast-loading SVGs."
    },
    {
      question: "What does the Scalability Score mean?",
      answer: "The Scalability Score measures the structural layout of the SVG (presence of viewBox, lack of fixed pixel widths, path simplification). High scores guarantee the graphic scales fluidly on Retina displays and responsive designs."
    },
    {
      question: "Can I import this SVG directly in Tailwind CSS?",
      answer: "Yes. You can copy the SVG path code and paste it inside an HTML `<svg>` element styled with Tailwind utility classes (such as `w-8 h-8 text-blue-500 hover:text-blue-600`)."
    },
    {
      question: "Does the tool support dark theme layout?",
      answer: "Yes. The workspace is fully responsive and integrates with your system's light and dark theme mode, offering a dark designer interface."
    },
    {
      question: "Can I convert sketches to vectors?",
      answer: "Yes. Upload a high-contrast photograph of your sketch. Select 'Line Art' or 'Black & White' mode, adjust edge sensitivity, and you will get clean black vector contours on a transparent background."
    },
    {
      question: "What is an anchor point in a vector path?",
      answer: "An anchor point (or node) is a coordinate point that defines the start, end, or turning point of a path segment. Curved segments also feature control points to guide the curve's curvature."
    },
    {
      question: "Can I see the path coordinates?",
      answer: "Yes. By selecting the 'Code View' tab, you can inspect the SVG `<path d=\"...\">` data showing the coordinate sequences (e.g. M, L, C, Z commands) in detail."
    },
    {
      question: "How do I print the SVG directly?",
      answer: "You can download the SVG file and open it in any web browser, then press `Ctrl+P` (or `Cmd+P`) to print it. For professional printing, import the SVG into vector software like Illustrator, CorelDraw, or Inkscape."
    },
    {
      question: "Is it safe to close the browser tab during a batch conversion?",
      answer: "Do not close the tab while the conversion is running. Because all conversions occur in your local browser memory, closing the tab will cancel the processing queue."
    },
    {
      question: "What are the future features planned for this tool?",
      answer: "Our roadmap includes AI-powered vectorization, path edit nodes (direct canvas vector editing), direct export to EPS/DXF, and cloud synchronization."
    }
  ],
  longDescription: `
## Ultimate Guide to Image Vectorization: Converting Raster Images to SVG

In the modern digital landscape, graphic assets must adapt fluidly to a wide variety of resolutions, viewport sizes, and print layouts. Traditional raster graphics, while excellent for capturing complex photographic details, fail to scale dynamically, leading to pixelation and visual degradation. This comprehensive guide explores the science, mathematics, and practical workflows behind converting raster images into Scalable Vector Graphics (SVG).

---

### Understanding the Divide: Raster vs. Vector Graphics

To appreciate the necessity of vector conversion, we must examine how digital images are represented:

#### 1. Raster Graphics (Bitmaps)
Formats like \\.png\\, \\.jpg\\, \\.webp\\, \\.bmp\\, and \\.gif\\ represent images as fixed grids of individual pixels, each assigned a specific color value. The file size of a raster image is directly tied to its resolution (dimensions in pixels). 

Key characteristics of raster graphics include:
- **Resolution Dependence**: Scaling up a bitmap image requires the rendering engine to interpolate or stretch existing pixels, causing blurriness, jagged edges (aliasing), and visual noise.
- **Color Complexity**: Ideal for photographs, where subtle gradients and lighting variations are captured on a pixel-by-pixel basis.
- **Fixed Geometry**: The layout is locked into a coordinate grid, making it difficult to isolate individual shapes or elements.

#### 2. Vector Graphics
Formats like \\.svg\\, \\.eps\\, \\.pdf\\, and \\.dxf\\ represent images as a collection of geometric primitives (points, lines, curves, polygons, and circles) defined by mathematical equations. 

Key characteristics of vector graphics include:
- **Infinite Scalability**: Since shapes are described mathematically, they can be scaled up or down infinitely without any loss in clarity, sharp borders, or detail. An SVG rendering at $16 \\times 16$ pixels uses the exact same geometry definition when rendered on a $10,000 \\times 10,000$ pixel screen.
- **Lightweight File Size**: For logos, icons, line art, and flat illustrations, vector files are significantly smaller than their raster counterparts because they store coordinates instead of pixel grids.
- **Resolution Independence**: Vector assets render at the native DPI of the display or printing device, ensuring crisp lines on standard screens, high-density Retina displays, and large-format print setups.

| Feature | Raster Graphics (PNG, JPG, WEBP) | Vector Graphics (SVG, EPS, PDF) |
| :--- | :--- | :--- |
| **Data Representation** | Grid of color pixels | Mathematical geometry formulas |
| **Scalability** | Resolution-dependent (becomes blurry when scaled) | Resolution-independent (infinitely scalable) |
| **Best For** | High-definition photographs | Logos, icons, charts, typography, drawings |
| **File Size Scale** | Scales with pixel resolution | Scales with vector path complexity |
| **Browser Compatibility** | Native (supported by all browsers) | Native (supported by all modern browsers) |
| **Editable Components**| Difficult to isolate individual elements | Easy to modify points, strokes, and fills |

---

### The Mathematics of Tracing: How Vectorization Works

Converting a raster grid of pixels into a set of vector paths is a multi-step mathematical process:

\`\`\`mermaid
graph TD
    A[Raster Image Input] --> B[Color Quantization & Palette Selection]
    B --> C[Layer Thresholding & Grid Mapping]
    C --> D[Contour Boundary Path Tracing]
    D --> E[Ramer-Douglas-Peucker Polyline Simplification]
    E --> F[Bézier Curve Fitting]
    F --> G[SVG XML Document Output]
\`\`\`

#### Step 1: Color Quantization (K-Means Clustering)
Bitmaps can contain millions of unique colors. To trace vector paths, we must compress these colors into a manageable palette. The algorithm samples pixels from the image and clusters them using the **K-Means algorithm**:
1. Select $K$ initial color centroids randomly or based on color popularity.
2. Assign each pixel color to its nearest centroid using squared Euclidean distance:
   $$d(c_1, c_2)^2 = (r_1 - r_2)^2 + (g_1 - g_2)^2 + (b_1 - b_2)^2$$
3. Re-calculate the centroids by taking the mean color values of all pixels assigned to each cluster.
4. Repeat the process until the centroids stabilize (usually 3 to 5 iterations).

This results in a clean, quantized image where every pixel belongs to one of $K$ indexing layers.

#### Step 2: Boundary Contour Tracing
For each color layer, the engine traces the contours (outer borders and internal holes) of the colored regions:
- It checks adjacent pixels in four directions to build directed edge segments.
- Segments are linked sequentially to form closed loops of coordinate polylines.
- The algorithm distinguishes between outer boundaries and inner cutout holes to apply appropriate vector filling rules (such as \`fill-rule=\"evenodd\"\`).

#### Step 3: Polyline Simplification (Ramer-Douglas-Peucker Algorithm)
The raw traced boundaries contain thousands of tiny step-like nodes matching the pixel grid, creating a jagged outline. To smooth these paths, we apply the **Ramer-Douglas-Peucker (RDP) algorithm**:
1. Identify the line segment between the start and end points of a path.
2. Find the point on the path that is furthest from this line segment.
3. If the perpendicular distance $d$ to this point is greater than a specified tolerance $\\epsilon$, split the path at this point and recursively simplify the two sub-sections.
4. If the furthest point is closer than $\\epsilon$, discard all intermediate points, keeping only the endpoints of the segment.

Increasing the simplification tolerance $\\epsilon$ significantly reduces the node count, which is crucial for clean vector outputs and small file sizes.

#### Step 4: Bézier Curve Fitting
To convert the simplified polygonal paths into smooth, organic shapes, the engine fits **Bézier curves** to the coordinate points. A cubic Bézier curve is defined by four points: a start point $P_0$, an end point $P_3$, and two control points $P_1$ and $P_2$:
$$\\mathbf{B}(t) = (1-t)^3\\mathbf{P}_0 + 3(1-t)^2t\\mathbf{P}_1 + 3(1-t)t^2\\mathbf{P}_2 + t^3\\mathbf{P}_3, \\quad t \\in [0,1]$$

Our tracing engine calculates tangent vectors at each node point based on neighbor coordinates, scaling control handles (tangent weights) relative to segment lengths to generate smooth, natural curves without introducing sharp corners.

---

### Step-by-Step Guide to Vectorizing Your Images

Follow these steps to convert raster files into production-grade vector graphics:

1. **Upload the Source Asset**: Drag and drop your PNG, JPG, or WebP file into the drop zone. The previewer will display the image size and resolution.
2. **Choose the Vectorization Preset**:
   - For corporate branding, typography, or illustrations, select **Logo Mode** or **Icon Mode**.
   - For line drawings, sketches, or cutting patterns, select **Line Art Mode**.
   - For colorful designs or cartoons, select **Full Color Mode**.
3. **Configure Color Count & Palette**: Set the Color Count slider. Flat designs usually look best with 4 to 8 colors. Increasing the color count to 16 or 32 adds depth but increases path complexity.
4. **Adjust Path Optimization**:
   - **Simplify**: Increase this value to reduce the number of node points, making the SVG lighter and cleaner.
   - **Smoothing**: Increase this value to smooth out jagged lines and create organic curves.
5. **Inspect the Result**: Use the sync-zoom viewer to verify the vector boundaries against the original pixel grid. Pan around details to check alignment.
6. **Download or Copy Code**: Export the finished file as a standard, optimized, or minified SVG. Developers can copy the XML code directly or export the React Component snippet.
`
};
