import { ToolConfig } from './types';

export const pngToSvgToolConfig: ToolConfig = {
  slug: "png-to-svg",
  title: "PNG to SVG",
  shortDescription: "Convert PNG, JPG, JPEG, and WEBP images into scalable, high-quality SVG vector graphics. Clean paths, shape smoothing, background removal, and client-side processing.",
  category: "Image Tools",
  keywords: [
    "png to svg",
    "convert png to svg",
    "image to svg",
    "raster to vector",
    "vectorize image",
    "png vectorizer",
    "logo to svg",
    "online vector converter",
    "svg generator",
    "bitmap to vector"
  ],
  features: [
    "Trace raster images (PNG, JPG, JPEG, WEBP, BMP) into scalable vector SVGs entirely locally",
    "Six vectorization presets: Logo, Icon, Illustration, Line Art, Black & White, and Detailed Mode",
    "Trace quality controls: Fast, Balanced, High Quality, and Ultra Precision settings",
    "Multiple color modes including Full Color, Limited Color, Grayscale, Monochrome, and Black & White",
    "Advanced path optimization: simplify shapes, smooth curves, and reduce node count",
    "Automatic background removal or solid fill options for transparent vector output",
    "Interactive side-by-side zoomable inspect viewer to compare original pixels vs vector geometry",
    "Built-in developer dashboard with path counts, SVG markup editor, copy/minification tools, and batch ZIP downloader"
  ],
  useCases: [
    "Converting company logos from low-resolution PNGs to scalable SVGs for print, responsive websites, and banners",
    "Tracing hand-drawn artwork, sketches, or typography diagrams into editable clean vector outlines",
    "Preparing raster graphics for CNC cutting, vinyl carving, laser engraving, and screen printing",
    "Vectorizing flat icons and illustrations to reduce bundle sizes in frontend web development",
    "Minifying and cleaning editor metadata from SVGs while preserving geometric fidelity",
    "Locally batch-converting legacy image libraries into modern responsive vector assets"
  ],
  howToSteps: [
    "Upload your image (PNG, JPG, WEBP, BMP) by dragging and dropping it, or clicking to browse files.",
    "Select your desired Vectorization Mode (e.g. Logo, Icon, Line Art) in the settings panel.",
    "Adjust Trace Quality (Fast, Balanced, High, Ultra) and define the maximum Color Count.",
    "Tune advanced controls: Corner Precision, Edge Sensitivity, Shape Smoothing, and background transparent removal.",
    "Preview the results side-by-side using the interactive zoom tool to check curve alignment.",
    "Download your vectorized SVG, copy its source code, or batch-export the entire queue as a ZIP package."
  ],
  relatedTools: [
    { name: "SVG to PNG", slug: "svg-to-png" },
    { name: "Favicon Generator", slug: "favicon-generator" },
    { name: "Image Converter", slug: "image-converter" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Resize Image", slug: "resize-image" },
    { name: "Background Remover", slug: "background-remover" },
    { name: "AI Image Upscaler", slug: "ai-image-upscaler" }
  ],
  examples: [],
  faq: [
    {
      question: "What is a PNG to SVG converter?",
      answer: "A PNG to SVG converter is an image vectorization tool that analyzes raster images (which are made of fixed pixels, like PNGs or JPEGs) and traces their shapes, lines, and colors to create scalable vector graphics (SVGs, which are described mathematically by paths and curves)."
    },
    {
      question: "How does vectorization work?",
      answer: "Vectorization works by tracing boundaries of color areas in an image. The engine quantizes colors, builds outline coordinates (polylines) for each color mask, simplifies these outlines to reduce anchor points, and fits Bézier curves to create smooth, scalable shapes."
    },
    {
      question: "Can I convert logos to SVG with this tool?",
      answer: "Yes, this tool features a dedicated 'Logo Mode' designed specifically for company logos, badges, stickers, and brand icons. It excels at tracing solid shapes, clean typography, and sharp borders."
    },
    {
      question: "Will the quality of my image improve after converting to SVG?",
      answer: "Vectorization does not enhance photos in a raster sense, but it translates shapes into infinite scale graphics. If you convert a logo, it will become perfectly sharp and scale cleanly to any resolution (such as billboard sizes) without showing pixelation."
    },
    {
      question: "Is SVG scalable?",
      answer: "Yes. SVG stands for Scalable Vector Graphics. Because shapes are defined by mathematical coordinate equations rather than pixel grids, they can be scaled up or down infinitely without any loss in clarity or resolution."
    },
    {
      question: "Can I use the generated SVGs for printing?",
      answer: "Absolutely. SVGs are ideal for print publishing, vinyl cutting, screen printing, embroidery, laser engraving, and CNC machining, as cutting software requires vector paths rather than pixel grids to guide machinery."
    },
    {
      question: "What image formats are supported as input?",
      answer: "The converter supports PNG, JPG, JPEG, WEBP, BMP, and GIF. It is also designed with future architecture in mind to support HEIC, AVIF, and TIFF images."
    },
    {
      question: "What output formats are generated?",
      answer: "The output is a standardized SVG vector graphic. We support exporting raw SVGs, optimized SVGs (with cleaned parameters), and minified SVGs (with minimal markup sizes)."
    },
    {
      question: "Does the conversion process happen on a server?",
      answer: "No. All vectorization processing is performed entirely locally inside your browser using HTML5 Canvas, offscreen canvases, and client-side JavaScript. No images are uploaded to our servers, ensuring absolute privacy."
    },
    {
      question: "Can I convert color images or only black and white?",
      answer: "You can convert both. We support Full Color (multi-palette), Limited Colors (custom count), Grayscale, Monochrome, and high-contrast Black & White tracing modes."
    },
    {
      question: "What is the difference between raster and vector graphics?",
      answer: "Raster graphics (PNG, JPG) store images as a grid of pixels; scaling them up causes pixelation and blur. Vector graphics (SVG) store paths, lines, and fills using math formulas, allowing infinite scaling without distortion."
    },
    {
      question: "How do I remove the background from my image?",
      answer: "Our tool provides a 'Transparent Background' preset that ignores white or background pixels during path tracing, letting you export the foreground subject with a clean transparent backdrop."
    },
    {
      question: "What is path simplification?",
      answer: "Path simplification is a process that reduces the number of anchor points (nodes) in a vector path. This keeps the SVG code lightweight, speeds up rendering, and makes the shapes easier to edit in vector software."
    },
    {
      question: "Can I convert photos into vector art?",
      answer: "Yes, using the 'Illustration' or 'Detailed Artwork' modes, you can vectorize photos. Note that photos have thousands of gradients, so the vectorized output will look like a stylized cartoon or low-poly painting rather than a photorealistic image."
    },
    {
      question: "What are Bézier curves?",
      answer: "Bézier curves are parametric curves used in computer graphics. They use control points to define smooth, mathematical curves, which are used inside SVG path coordinates (`d` attributes) to draw shapes elegantly."
    },
    {
      question: "Does this tool support batch conversion?",
      answer: "Yes, you can upload multiple images at once. The batch queue will process them sequentially, and you can download them individually or bundle all vectorized SVGs in a single ZIP file."
    },
    {
      question: "Can I edit the SVG code after conversion?",
      answer: "Yes. The tool includes a live SVG Code Viewer and editor. You can copy the code directly, preview changes, or copy it for pasting directly into HTML or vector editors."
    },
    {
      question: "What is the shape accuracy setting?",
      answer: "Shape accuracy controls how closely the traced vector paths follow the original raster pixel edges. Higher values follow pixel shapes precisely, while lower values yield smoother, simplified shapes."
    },
    {
      question: "What is edge sensitivity?",
      answer: "Edge sensitivity defines the threshold at which the tracer registers a change in color or contrast as a new boundary line. Adjusting this helps isolate thin lines or faint details."
    },
    {
      question: "Will the generated SVG work in Adobe Illustrator?",
      answer: "Yes. The generated SVGs adhere to standard W3C specifications and can be opened, edited, and scaled in Adobe Illustrator, Inkscape, Figma, CorelDRAW, and Sketch."
    },
    {
      question: "Is there a file size limit for uploads?",
      answer: "To ensure fluid client-side performance, we recommend uploading images under 15MB. Very large images will be automatically downsampled depending on the Trace Quality setting."
    },
    {
      question: "How does Grayscale mode work?",
      answer: "Grayscale mode converts the image's pixel colors into shades of gray before tracing, helping you create monochromatic shaded vectors from colored originals."
    },
    {
      question: "Can I copy the SVG code directly to my clipboard?",
      answer: "Yes. There is a 'Copy Code' button inside the editor panel that allows you to copy the vector source markup to your clipboard instantly for use in React, HTML, or CSS codebases."
    },
    {
      question: "Can I save my conversion settings?",
      answer: "Yes. You can save your favorite settings (colors, simplification, threshold, mode) as custom presets to reuse them quickly for future projects."
    },
    {
      question: "Does the tool support dark mode?",
      answer: "Yes, the interface is fully styled for both light and dark modes, integrating seamlessly with your browser's theme settings."
    },
    {
      question: "Why does my vectorized SVG look blocky?",
      answer: "Blockiness occurs if the source image is extremely pixelated, or if the shape accuracy is set too high without curve smoothing. Increase shape smoothing and reduce edge sensitivity to get clean lines."
    },
    {
      question: "How do I make the SVG code as small as possible?",
      answer: "Select the 'Minified SVG' export option. This removes unnecessary whitespace, metadata, comments, and empty groups, reducing the final file size for faster web loading."
    },
    {
      question: "Can I convert JPG to SVG?",
      answer: "Yes, the tool accepts JPG and JPEG inputs and processes them locally to produce SVG files, just like PNGs."
    },
    {
      question: "What is color quantization?",
      answer: "Color quantization is a process that reduces the number of distinct colors in an image. It is a necessary first step in vectorization to group pixels into solid color shapes."
    },
    {
      question: "What is a SVG viewbox?",
      answer: "The `viewBox` is an SVG attribute that defines the coordinate space. It ensures that the vector graphics scale proportionally when embedded in web layouts, regardless of the container width."
    },
    {
      question: "Can I convert black and white line art?",
      answer: "Yes. The 'Line Art' and 'Black & White' modes are specifically optimized for tracing scanned signatures, sketches, blueprints, and line-drawing art."
    },
    {
      question: "Will the SVG have a background if the PNG did?",
      answer: "Yes. If the source PNG has a solid background, the tracer will create a vector shape for it. You can select 'Transparent Background' or use the auto background removal toggle to exclude it."
    },
    {
      question: "Can I use the output SVGs on my website?",
      answer: "Yes. SVGs are directly supported by all modern browsers. You can embed them using `<img>` tags, CSS background-images, or inline markup."
    },
    {
      question: "Does the converter require an internet connection?",
      answer: "No. Once the page is loaded, the vectorizer runs 100% offline. You can convert files without any network connection because all processing logic is local."
    },
    {
      question: "How many paths does a typical logo have?",
      answer: "A simple logo typically contains between 5 and 50 paths. Detailed logos or emblems may have hundreds. Our analyzer lists the exact path count for every conversion."
    },
    {
      question: "What is corner precision?",
      answer: "Corner precision dictates how aggressively the vectorizer rounds off sharp corners. High precision preserves sharp angles; low precision smooths them into rounded joints."
    },
    {
      question: "Can I convert GIF to SVG?",
      answer: "Yes, the first frame of static or animated GIFs can be imported and vectorized into static SVG shapes."
    },
    {
      question: "What is the optimization score?",
      answer: "The optimization score is a rating generated by our dashboard. It analyzes the ratio of nodes to paths and suggests whether the file size can be reduced further by simplifying nodes."
    },
    {
      question: "Does this tool support SVG compression?",
      answer: "We output standard SVG and minified SVG text. For compressed GZIP versions (SVGZ), you can zip the text. Most web servers compress SVGs automatically using GZIP/Brotli."
    },
    {
      question: "Can I convert WEBP images to SVG?",
      answer: "Yes. WEBP is fully supported as an input format. The canvas decoder extracts the pixels and feeds them to the local tracing engine."
    },
    {
      question: "How do I trace scanned signatures?",
      answer: "Use 'Black & White' or 'Line Art' mode, set colors to monochrome, and adjust the threshold slider until the signature is dark and clear, then click trace."
    },
    {
      question: "Will this tool work on mobile devices?",
      answer: "Yes. The interface is completely responsive, allowing you to take photos on your smartphone, upload them, and vectorize them on the go."
    },
    {
      question: "Why is the SVG file size larger than the original PNG?",
      answer: "This happens if you vectorize a photo or detailed image with thousands of colors. Vector formats describe every path mathematically. If there are too many paths, the code size grows. Vectorization is best suited for clean graphics."
    },
    {
      question: "Does it support inline styles or presentation attributes?",
      answer: "Our engine uses standard SVG presentation attributes (like `fill='...'`) on paths. This makes the SVGs widely compatible with web pages, styling sheets, and vector software."
    },
    {
      question: "How does the tool calculate the scalability score?",
      answer: "The scalability score represents how well the vector shapes scale. Clean, path-optimized vectors with a proper viewBox receive a 100% score."
    },
    {
      question: "Can I drag and drop images directly?",
      answer: "Yes. You can drag images from your desktop and drop them anywhere in the workspace drop zone to start the conversion process."
    },
    {
      question: "Does this tool collect any analytics about my images?",
      answer: "No. Because the conversion is entirely client-side, we never see, upload, or collect your files. We only compile standard page views."
    },
    {
      question: "What is the Autotracer method?",
      answer: "Autotracer refers to automated vectorization algorithms (like Potrace or ImageTracer) that scan borders and fit curves, replacing manual vector redrawing."
    },
    {
      question: "Can I download the SVG directly to my downloads folder?",
      answer: "Yes. Clicking the 'Download SVG' button triggers a local blob export, saving the file directly to your system's download folder."
    },
    {
      question: "Is there any software to install?",
      answer: "No. There is no software or plugin required. The tool runs completely inside your standard web browser (Chrome, Safari, Firefox, Edge, etc.)."
    }
  ],
  longDescription: `
# The Comprehensive Engineering Manual to Image Vectorization: Tracing, Quantization, and Bézier Curve Fitting

## 1. Introduction: The Raster-to-Vector Paradigm Shift

Digital images are broadly divided into two structural categories: **raster** (bitmap) and **vector**. A raster image, such as a PNG, JPG, or WEBP, is defined by a static coordinate grid of pixels. Each pixel holds a specific color value. While raster formats are excellent for capturing complex, continuous-tone variations in photographs, they suffer from a fundamental limitation: scalability. When a raster image is enlarged beyond its native dimensions, the pixel grid becomes visible, resulting in pixelation, blur, and aliasing.

Conversely, vector graphics, most commonly represented by the **Scalable Vector Graphics (SVG)** format, describe images using geometric primitives—points, lines, paths, curves, polygons, and circles. These elements are written mathematically. For example, a line is defined by its start and end coordinates, a circle by its center and radius, and a complex outline by a sequence of path commands. 

Because vectors are defined by mathematical formulas rather than static pixels, they are resolution-independent. When you scale an SVG, the rendering engine recalculates the coordinates and renders the shapes perfectly sharp at any resolution, from tiny favicon icons to massive print billboards.

Image vectorization, also known as raster-to-vector conversion or image tracing, is the computational process of translating a pixel-based raster image into mathematically defined vector paths. This manual details the engineering pipelines, mathematical formulas, and optimization models required to perform accurate client-side vectorization inside web browsers.

---

## 2. Color Quantization: Dimensionality Reduction of the Pixel Space

The first step in any vectorization pipeline is reducing the color space of the input image. A standard 24-bit RGB raster image can contain up to 16.7 million unique colors. Tracing distinct paths for each of these colors is computationally impractical and would yield a bloated SVG file with millions of tiny, overlapping shapes. **Color Quantization** is the process of reducing the number of distinct colors in an image to a manageable palette (typically between 2 and 64 colors) while minimizing visual distortion.

### The Mathematics of Quantization
Let \\(I\\) represent the original image, which is a set of pixels \\(p = (r, g, b) \\in \\mathbb{R}^3\\). The goal of color quantization is to find a palette \\(K = \\{c_1, c_2, \\dots, c_k\\}\\) of \\(k\\) colors that minimizes the total quantization error, typically measured as the sum of squared Euclidean distances:

\\[E = \\sum_{p \\in I} \\min_{c_i \\in K} \\|p - c_i\\|^2\\]

Where \\(\\|p - c_i\\| = \\sqrt{(r_p - r_{c_i})^2 + (g_p - g_{c_i})^2 + (b_p - b_{c_i})^2}\\).

### Clustering Algorithms
To partition the color space and find the optimal palette, we implement several clustering algorithms:
1.  **Popularity Algorithm**: Build a 3D color histogram and select the \\(k\\) most frequent colors. While computationally fast, it fails to capture rare but visually prominent colors in images with large, flat color areas.
2.  **Median Cut Algorithm**: Recursively split the color space along the longest axis of the RGB color bounding box until \\(k\\) boxes are created. The average color of each box becomes a palette entry. This algorithm distributes palette colors evenly across the image's color gamut.
3.  **K-Means Clustering**: An iterative Lloyd's algorithm where colors are clustered to the nearest centroid, and centroids are recalculated. This provides high-fidelity palettes but is computationally expensive for high-resolution images.

Once the palette is established, every pixel in the source canvas is mapped to its closest palette index, creating a indexed color grid \\(G(x, y) \\in \\{1, 2, \\dots, k\\}\\).

---

## 3. Path Extraction: Outline Walking and Contour Tracing

With the color grid quantized, the vectorization engine separates the image into distinct color layers. For each color index \\(i \\in \\{1, 2, \\dots, k\\}\\), we generate a binary mask grid:

\\[B_i(x, y) = \\begin{cases} 1 & \\text{if } G(x, y) = i \\\\ 0 & \\text{otherwise} \\end{cases}\\]

We then run contour tracing on each binary grid to extract the outline boundaries of all connected shapes.

### The Outline Walking Algorithm
To trace the borders of the binary shapes, we implement an outline-walking algorithm (similar to Moore-Neighbor Tracing). The scanner traverses the grid until it encounters a border pixel (a cell where \\(B_i(x, y) = 1\\) and at least one neighbor is 0).

The tracer then moves clockwise around the boundary of the shape by checking its 8-neighborhood cells:
Let \\(p_0\\) be the current boundary pixel and \\(d\\) be the direction from which the tracer arrived. The tracer inspects the neighboring cells starting from \\(d - 45^\\circ\\) and rotates clockwise until it finds another pixel \\(p_1\\) with value 1. The coordinate of \\(p_1\\) is appended to the current path, and the tracer continues walking.

The trace loop terminates when:
1.  The walking coordinates return to the starting pixel.
2.  The arrival direction matches the initial state.

This process yields a set of closed or open polylines \\(P = \\{v_1, v_2, \\dots, v_n\\}\\), where each vertex \\(v_j = (x_j, y_j) \\in \\mathbb{R}^2\\) is a pixel coordinate.

---

## 4. Path Simplification: Node Reduction and Douglas-Peucker

Contour tracing results in a dense set of coordinates (often containing one vertex per pixel along the boundary). Rendering such a high density of vertices makes the SVG code excessively large and causes jagged edges. We run the **Douglas-Peucker Algorithm** to simplify the path by removing redundant nodes while maintaining shape fidelity.

### The Douglas-Peucker Algorithm
The algorithm recursively simplifies a polyline by finding the vertex that is furthest from the line segment connecting the path's endpoints:

Given a polyline \\(P = (v_1, v_2, \\dots, v_n)\\) and a threshold \\(\\epsilon > 0\\):
1.  Draw a line segment \\(L\\) from \\(v_1\\) to \\(v_n\\).
2.  For each intermediate vertex \\(v_j\\) (where \\(1 < j < n\\)), calculate the perpendicular distance \\(d_j\\) from \\(v_j\\) to the line \\(L\\):
    
    \\[d_j = \\frac{|(y_n - y_1)x_j - (x_n - x_1)y_j + x_n y_1 - y_n x_1|}{\\sqrt{(y_n - y_1)^2 + (x_n - x_1)^2}}\\]

3.  Find the maximum distance \\(d_{max} = \\max_j(d_j)\\) and the corresponding vertex index \\(index\\).
4.  If \\(d_{max} > \\epsilon\\):
    - Recursively simplify the first half: \\(P_{left} = \\text{DouglasPeucker}(v_1, \\dots, v_{index}, \\epsilon)\\).
    - Recursively simplify the second half: \\(P_{right} = \\text{DouglasPeucker}(v_{index}, \\dots, v_n, \\epsilon)\\).
    - Return the combined simplified points.
5.  If \\(d_{max} \\le \\epsilon\\), discard all intermediate points and return \\([v_1, v_n]\\).

The threshold \\(\\epsilon\\) controls the shape accuracy. A smaller \\(\\epsilon\\) follows the pixel borders precisely, yielding a highly detailed SVG with more nodes. A larger \\(\\epsilon\\) removes more nodes, creating a smaller, smoother vector file.

---

## 5. Curve Fitting: From Polylines to Bézier Splines

Once the path is simplified into a lightweight polyline, it still consists of straight line segments. To achieve professional vector quality, we convert these segments into smooth curves. We do this by fitting **Bézier Curves** to the polyline vertices.

### Bézier Curve Mathematics
A cubic Bézier curve \\(B(t)\\) is defined by four points—two endpoints \\(P_0\\) and \\(P_3\\), and two control points \\(P_1\\) and \\(P_2\\):

\\[B(t) = (1-t)^3 P_0 + 3(1-t)^2 t P_1 + 3(1-t) t^2 P_2 + t^3 P_3, \\quad t \\in [0, 1]\\]

To fit a Bézier curve to a sequence of points \\(S = \\{s_0, s_1, \\dots, s_m\\}\\), we estimate a parameter \\(t_j \\in [0, 1]\\) for each point \\(s_j\\) using chord-length parameterization:

\\[t_0 = 0, \\quad t_j = t_{j-1} + \\frac{\\|s_j - s_{j-1}\\|}{\\sum_{k=1}^m \\|s_k - s_{k-1}\\|}\\]

Using least-squares fitting, we find control points \\(P_1\\) and \\(P_2\\) that minimize the sum of squared distances:

\\[\\sum_{j=0}^m \\|B(t_j) - s_j\\|^2\\]

If the fit error exceeds a user-defined threshold (smoothness tolerance), the algorithm splits the polyline at the point of maximum error and fits separate Bézier curves to each sub-segment, ensuring sharp corners are preserved where intended.

---

## 6. SVG Optimization and Minification

After tracing and curve fitting, the final stage is formatting the SVG markup. Raw SVG exports often contain bloated code, excessive precision decimals, and redundant groups. We implement several SVGO-style optimizations:
1.  **Coordinate Rounding**: Truncating floating-point numbers in path commands (e.g. converting \`d='M 12.00034 45.99981 C 14.34123 48.91024 ...'\` to \`d='M 12 46 C 14.34 48.91 ...'\`) to reduce file size.
2.  **Relative Commands**: Converting absolute coordinates (\`M\`, \`L\`, \`C\`) to relative coordinates (\`m\`, \`l\`, \`c\`) where it results in fewer characters.
3.  **Command Merging**: Combining sequential line or curve commands (e.g., merging \`L 10 20 L 30 40\` to \`L 10 20 30 40\`).
4.  **Metadata Stripping**: Eliminating XML comments, custom namespaces, empty groups, and unused styling classes.

By running these passes locally, the engine compiles a highly optimized, clean, and minified SVG payload that loads instantly on web browsers and scales beautifully in print.
`
};
