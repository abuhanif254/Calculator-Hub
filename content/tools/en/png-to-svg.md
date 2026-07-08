---
metaTitle: "Convert PNG to SVG Online | Free Raster to Vector Converter"
metaDescription: "Convert PNG, JPG, and WEBP to SVG online for free. Vectorize images, logos, and line art into scalable vector graphics with advanced path smoothing."
metaKeywords: "png to svg, convert png to svg, image to svg, raster to vector, vectorize image, png vectorizer, logo to svg, online vector converter, svg generator, bitmap to vector"
title: "PNG to SVG Converter"
shortDescription: "Convert PNG, JPG, JPEG, and WEBP images into scalable, high-quality SVG vector graphics. Clean paths, shape smoothing, background removal, and client-side processing."
---

## The Comprehensive Engineering Manual to Image Vectorization: Tracing, Quantization, and Bézier Curve Fitting

### 1. Introduction: The Raster-to-Vector Paradigm Shift

Digital images are broadly divided into two structural categories: **raster** (bitmap) and **vector**. A raster image, such as a PNG, JPG, or WEBP, is defined by a static coordinate grid of pixels. Each pixel holds a specific color value. While raster formats are excellent for capturing complex, continuous-tone variations in photographs, they suffer from a fundamental limitation: scalability. When a raster image is enlarged beyond its native dimensions, the pixel grid becomes visible, resulting in pixelation, blur, and aliasing.

Conversely, vector graphics, most commonly represented by the **Scalable Vector Graphics (SVG)** format, describe images using geometric primitives—points, lines, paths, curves, polygons, and circles. These elements are written mathematically. For example, a line is defined by its start and end coordinates, a circle by its center and radius, and a complex outline by a sequence of path commands. 

Because vectors are defined by mathematical formulas rather than static pixels, they are resolution-independent. When you scale an SVG, the rendering engine recalculates the coordinates and renders the shapes perfectly sharp at any resolution, from tiny favicon icons to massive print billboards. If you need to convert an SVG back into a PNG, utilize our [SVG to PNG](/en/tools/svg-to-png) tool. To generate a multi-resolution ICO file from your new vector, use our [Favicon Generator](/en/tools/favicon-generator).

Image vectorization, also known as **raster to vector** conversion or image tracing, is the computational process of translating a pixel-based raster image into mathematically defined vector paths. This manual details the engineering pipelines, mathematical formulas, and optimization models required to perform accurate client-side vectorization inside web browsers.

---

### 2. Color Quantization: Dimensionality Reduction of the Pixel Space

The first step in any vectorization pipeline is reducing the color space of the input image. A standard 24-bit RGB raster image can contain up to 16.7 million unique colors. Tracing distinct paths for each of these colors is computationally impractical and would yield a bloated SVG file with millions of tiny, overlapping shapes. **Color Quantization** is the process of reducing the number of distinct colors in an image to a manageable palette (typically between 2 and 64 colors) while minimizing visual distortion.

#### The Mathematics of Quantization
Let \\(I\\) represent the original image, which is a set of pixels \\(p = (r, g, b) \\in \\mathbb{R}^3\\). The goal of color quantization is to find a palette \\(K = \\{c_1, c_2, \\dots, c_k\\}\\) of \\(k\\) colors that minimizes the total quantization error, typically measured as the sum of squared Euclidean distances:

\\[E = \\sum_{p \\in I} \\min_{c_i \\in K} \\|p - c_i\\|^2\\]

Where \\(\\|p - c_i\\| = \\sqrt{(r_p - r_{c_i})^2 + (g_p - g_{c_i})^2 + (b_p - b_{c_i})^2}\\).

#### Clustering Algorithms
To partition the color space and find the optimal palette, we implement several clustering algorithms in our **png vectorizer**:
1.  **Popularity Algorithm**: Build a 3D color histogram and select the \\(k\\) most frequent colors. While computationally fast, it fails to capture rare but visually prominent colors in images with large, flat color areas.
2.  **Median Cut Algorithm**: Recursively split the color space along the longest axis of the RGB color bounding box until \\(k\\) boxes are created. The average color of each box becomes a palette entry. This algorithm distributes palette colors evenly across the image's color gamut.
3.  **K-Means Clustering**: An iterative Lloyd's algorithm where colors are clustered to the nearest centroid, and centroids are recalculated. This provides high-fidelity palettes but is computationally expensive for high-resolution images.

Once the palette is established, every pixel in the source canvas is mapped to its closest palette index, creating an indexed color grid.

---

### 3. Path Extraction: Outline Walking and Contour Tracing

With the color grid quantized, the vectorization engine separates the image into distinct color layers. For each color index, we generate a binary mask grid:

\\[B_i(x, y) = \\begin{cases} 1 & \\text{if } G(x, y) = i \\\\ 0 & \\text{otherwise} \\end{cases}\\]

We then run contour tracing on each binary grid to extract the outline boundaries of all connected shapes. If you need to remove a complex background before tracing, try our AI-powered [Background Remover](/en/tools/background-remover).

#### The Outline Walking Algorithm
To trace the borders of the binary shapes, we implement an outline-walking algorithm (similar to Moore-Neighbor Tracing). The scanner traverses the grid until it encounters a border pixel (a cell where \\(B_i(x, y) = 1\\) and at least one neighbor is 0).

The tracer then moves clockwise around the boundary of the shape by checking its 8-neighborhood cells:
Let \\(p_0\\) be the current boundary pixel and \\(d\\) be the direction from which the tracer arrived. The tracer inspects the neighboring cells starting from \\(d - 45^\\circ\\) and rotates clockwise until it finds another pixel \\(p_1\\) with value 1. The coordinate of \\(p_1\\) is appended to the current path, and the tracer continues walking.

The trace loop terminates when:
1.  The walking coordinates return to the starting pixel.
2.  The arrival direction matches the initial state.

This process yields a set of closed or open polylines \\(P = \\{v_1, v_2, \\dots, v_n\\}\\), where each vertex \\(v_j = (x_j, y_j) \\in \\mathbb{R}^2\\) is a pixel coordinate.

---

### 4. Path Simplification: Node Reduction and Douglas-Peucker

Contour tracing results in a dense set of coordinates (often containing one vertex per pixel along the boundary). Rendering such a high density of vertices makes the SVG code excessively large and causes jagged edges. We run the **Douglas-Peucker Algorithm** to simplify the path by removing redundant nodes while maintaining shape fidelity.

#### The Douglas-Peucker Algorithm
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

The threshold \\(\\epsilon\\) controls the shape accuracy. A smaller \\(\\epsilon\\) follows the pixel borders precisely, yielding a highly detailed SVG with more nodes. A larger \\(\\epsilon\\) removes more nodes, creating a smaller, smoother vector file. If your source raster image is too low-quality to trace properly, run it through our [AI Image Upscaler](/en/tools/ai-image-upscaler) first.

---

### 5. Curve Fitting: From Polylines to Bézier Splines

Once the path is simplified into a lightweight polyline, it still consists of straight line segments. To achieve professional vector quality when converting a **logo to svg**, we convert these segments into smooth curves. We do this by fitting **Bézier Curves** to the polyline vertices.

#### Bézier Curve Mathematics
A cubic Bézier curve \\(B(t)\\) is defined by four points—two endpoints \\(P_0\\) and \\(P_3\\), and two control points \\(P_1\\) and \\(P_2\\):

\\[B(t) = (1-t)^3 P_0 + 3(1-t)^2 t P_1 + 3(1-t) t^2 P_2 + t^3 P_3, \\quad t \\in [0, 1]\\]

To fit a Bézier curve to a sequence of points \\(S = \\{s_0, s_1, \\dots, s_m\\}\\), we estimate a parameter \\(t_j \\in [0, 1]\\) for each point \\(s_j\\) using chord-length parameterization:

\\[t_0 = 0, \\quad t_j = t_{j-1} + \\frac{\\|s_j - s_{j-1}\\|}{\\sum_{k=1}^m \\|s_k - s_{k-1}\\|}\\]

Using least-squares fitting, we find control points \\(P_1\\) and \\(P_2\\) that minimize the sum of squared distances:

\\[\\sum_{j=0}^m \\|B(t_j) - s_j\\|^2\\]

If the fit error exceeds a user-defined threshold (smoothness tolerance), the algorithm splits the polyline at the point of maximum error and fits separate Bézier curves to each sub-segment, ensuring sharp corners are preserved where intended.

---

### 6. SVG Optimization and Minification

After tracing and curve fitting, the final stage of our **online vector converter** is formatting the SVG markup. Raw SVG exports often contain bloated code, excessive precision decimals, and redundant groups. We implement several SVGO-style optimizations:
1.  **Coordinate Rounding**: Truncating floating-point numbers in path commands (e.g. converting `d='M 12.00034 45.99981 C 14.34123 48.91024 ...'` to `d='M 12 46 C 14.34 48.91 ...'`) to reduce file size.
2.  **Relative Commands**: Converting absolute coordinates (`M`, `L`, `C`) to relative coordinates (`m`, `l`, `c`) where it results in fewer characters.
3.  **Command Merging**: Combining sequential line or curve commands (e.g., merging `L 10 20 L 30 40` to `L 10 20 30 40`).
4.  **Metadata Stripping**: Eliminating XML comments, custom namespaces, empty groups, and unused styling classes.

By running these passes locally, the engine compiles a highly optimized, clean, and minified SVG payload that loads instantly on web browsers and scales beautifully in print. Need to compress other formats? Check out our [Image Converter](/en/tools/image-converter) or [Compress Image](/en/tools/compress-image) tools.
