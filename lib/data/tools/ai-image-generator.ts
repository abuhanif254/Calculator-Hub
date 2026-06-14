import { ToolConfig } from './types';

export const aiImageGeneratorConfig: ToolConfig = {
  slug: "ai-image-generator",
  title: "AI Image Generator",
  shortDescription: "Generate stunning high-quality images, illustrations, realistic photos, logos, and icons from simple text prompts. Supports multiple AI providers, styles, aspects, seeds, and local processing previews.",
  category: "AI Tools",
  keywords: [
    "ai image generator",
    "text to image ai",
    "ai art generator",
    "free ai image creator",
    "ai artwork generator",
    "ai logo generator",
    "ai illustration generator",
    "flux image generator",
    "imagen 3 generator",
    "dall-e 3 online",
    "stability ai image creator",
    "midjourney online generator",
    "generate realistic photo ai",
    "ai wallpaper creator"
  ],
  features: [
    "Pluggable provider architecture supporting Google Gemini Imagen, OpenAI DALL-E, and Stability AI Core/Flux",
    "Over 12 style presets including Photorealistic, Anime, Cinematic, Watercolor, Cyberpunk, 3D Render, Logo, and Icon",
    "Multiple aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:2, 2:3, and custom controls",
    "Comprehensive parameter fine-tuning: Creativity slider, Guidance Scale, Seed control, and Generation Strength",
    "Multiple image generation support (1, 2, or 4 images simultaneously)",
    "Built-in AI Prompt Optimizer to expand and enhance simple prompt drafts automatically",
    "Negative prompt settings to exclude unwanted elements like blur, watermarks, or quality defects",
    "Complete Local History Gallery with metadata copies, prompt regeneration, and high-res downloads",
    "Detailed Commercial Use guide explaining licensing, public domain rules, and user copyright ownership"
  ],
  useCases: [
    "Creating unique illustrations, graphics, and visual layouts for blogs and websites",
    "Generating professional logos, icons, and branding mockups for marketing and startups",
    "Designing custom wallpapers, artistic conceptual illustrations, and fantasy backdrops",
    "Creating mockups, product photography settings, and realistic environmental renderings",
    "Rapidly prototyping ideas and storyboards for games, films, or advertising pitches",
    "Optimizing prompt syntax and styling variables for advanced AI generation runs"
  ],
  howToSteps: [
    "Type your image description inside the large prompt editor box (or select a template to start).",
    "Optional: Add elements you wish to avoid inside the Negative Prompt field (e.g. watermark, low resolution).",
    "Choose your preferred Style Preset (e.g. Photorealistic, Anime, Cinematic) to guide the aesthetic.",
    "Select the desired Aspect Ratio (e.g. 1:1 Square, 16:9 Landscape, 9:16 Portrait) and image dimensions.",
    "Expand Advanced Settings to configure the Guidance Scale, Creativity level, or to lock in a specific generation Seed.",
    "Select the number of images to generate (1, 2, or 4) and click 'Generate Images' to run the queue. Downscale or upscale results directly in the gallery."
  ],
  relatedTools: [
    { name: "AI Image Upscaler", slug: "ai-image-upscaler" },
    { name: "Remove Background", slug: "background-remover" },
    { name: "Watermark Image", slug: "watermark-image" },
    { name: "Color Picker From Image", slug: "color-picker-from-image" },
    { name: "Compress Image", slug: "compress-image" }
  ],
  examples: [],
  faq: [
    {
      question: "What is an AI Image Generator?",
      answer: "An AI image generator is a software application that leverages deep learning neural networks (diffusion models or generative adversarial networks) to synthesize new, original images from text descriptions, commonly referred to as prompts."
    },
    {
      question: "How does text-to-image AI work?",
      answer: "Text-to-image models are trained on billions of image-text pairs. When you enter a prompt, the model uses natural language processing to understand the semantic intent, and then runs a reverse-diffusion process—starting with random noise and iteratively refining it until it aligns with the descriptive patterns learned during training."
    },
    {
      question: "Which AI image generation models does this platform support?",
      answer: "Our pluggable architecture supports Google Gemini (Imagen 3), OpenAI (DALL-E 3), Stability AI (Stable Diffusion / Stable Image Core), and Flux. It also supports local configurations and offers a procedural mockup fallback for developer testing."
    },
    {
      question: "Is there a free tier for generating images?",
      answer: "Yes, our platform is designed with a free tier that operates on local mock generation or limited daily API allotments. Premium API integrations can be unlocked by configuring your own API keys in the dashboard or environment files."
    },
    {
      question: "Where are my API keys stored?",
      answer: "We never hardcode or store your API keys on our servers. Your keys are either read from secure, server-side environment variables (`GEMINI_API_KEY`, `OPENAI_API_KEY`, etc.) or stored temporarily inside your local browser storage if you enter them manually, ensuring complete privacy."
    },
    {
      question: "What is a prompt in AI generation?",
      answer: "A prompt is a text instruction or description provided to the AI model. It describes the subject, setting, lighting, camera angle, color scheme, and aesthetic style of the image you want the model to generate."
    },
    {
      question: "How do I write a good prompt?",
      answer: "A good prompt is detailed and specific. Describe the core subject first, followed by background elements, lighting type (e.g., golden hour, studio lighting), rendering style (e.g., photorealistic, oil painting), and camera configurations. You can also use our built-in AI Prompt Optimizer to automatically enhance simple prompts."
    },
    {
      question: "What is a negative prompt?",
      answer: "A negative prompt defines elements that you do not want to appear in your generated image. Common terms added to negative prompts include 'blurry', 'low quality', 'watermark', 'bad anatomy', or 'extra limbs' to help guide the model away from typical errors."
    },
    {
      question: "What are style presets?",
      answer: "Style presets are pre-configured text and parameter overrides that steer the aesthetic of the output. Instead of writing long styling instructions, you can simply click presets like 'Anime', 'Cinematic', or 'Watercolor' to automatically append style tags to your prompt."
    },
    {
      question: "What aspect ratios are supported?",
      answer: "We support standard aspect ratios including 1:1 (Square), 16:9 (Landscape), 9:16 (Portrait), 4:3 (Classic Monitor), 3:2 (Photography standard), 2:3 (Vertical card), and customizable custom dimensions."
    },
    {
      question: "How do I choose the correct image size?",
      answer: "For quick drafts, smaller resolutions like 512x512 are fastest. For high-quality designs, choose 1024x1024 or higher. Larger dimensions require more computational power but contain significantly more detail."
    },
    {
      question: "What does the Creativity slider control?",
      answer: "The creativity slider adjusts the temperature or variance of the model's output. A lower value keeps generations closer to standard prompt patterns, while a higher value encourages the model to generate more creative and unexpected results."
    },
    {
      question: "What is Guidance Scale (CFG)?",
      answer: "Guidance Scale (Classifier-Free Guidance) determines how strictly the AI model adheres to your text prompt. A high guidance scale forces the model to match your description exactly, while a lower scale gives the model more artistic freedom."
    },
    {
      question: "What is a Seed in AI image generation?",
      answer: "A seed is a number that initializes the random noise map from which the image is generated. Using the same prompt, parameters, and seed will produce the exact same image, allowing you to replicate and iterate on specific designs."
    },
    {
      question: "How do I generate consistent characters?",
      answer: "To generate consistent characters, use a fixed seed, maintain identical descriptive structures for the character's facial features and clothing, and only change the background or action words in subsequent prompts."
    },
    {
      question: "Can I generate multiple images at the same time?",
      answer: "Yes, you can select whether you want to generate 1, 2, or 4 images in a single batch. The images will be generated in a parallel queue and displayed in a grid once completed."
    },
    {
      question: "Can I download my generated images?",
      answer: "Yes, every generated image in your gallery has a download button that saves it as a high-quality PNG or JPEG. You can also copy the prompt used or trigger a regeneration with the same settings."
    },
    {
      question: "Does this tool support image-to-image conversion?",
      answer: "The current production version focuses on text-to-image generation. The architecture is built to support image-to-image, inpainting, and outpainting in upcoming releases."
    },
    {
      question: "Can I upscale my generated images?",
      answer: "Yes, you can click the upscale action to multiply the resolution of your generated image (2x or 4x), making it suitable for high-res wallpapers or printing."
    },
    {
      question: "Do I own the copyright to the images I generate?",
      answer: "Under current laws in most jurisdictions (including the US and EU), raw AI-generated content cannot be copyrighted because it lacks human authorship. However, you generally own the rights to the prompts you write, and you are free to use the output images for personal or commercial projects without royalty obligations."
    },
    {
      question: "Can I use AI-generated images commercially?",
      answer: "Yes, all standard providers (Gemini, OpenAI, Stability, Flux) allow commercial utilization of generated images. However, you must ensure your prompt does not deliberately copy trademarked logos, characters, or copyrighted designs, which could violate intellectual property laws."
    },
    {
      question: "Does this generator add watermarks to images?",
      answer: "No, our utility does not overlay any watermarks. The images generated are clean, high-resolution outputs directly from the respective model's raw api arrays."
    },
    {
      question: "Is there a rate limit on the API?",
      answer: "Yes, to prevent abuse and API server overload, we implement a client-side request throttle and a server-side rate limiter of 10 requests per minute per IP address."
    },
    {
      question: "What is prompt validation?",
      answer: "Prompt validation is a safety layer that checks your prompt text against content moderation policies before sending it to the AI. Prompts containing offensive, violent, or illegal keywords are blocked automatically."
    },
    {
      question: "How long does it take to generate an image?",
      answer: "Depending on the provider selected and model load, generation typically takes between 4 and 12 seconds. Our workspace displays a real-time progress indicator and skeleton loaders while you wait."
    },
    {
      question: "What is the Flux model?",
      answer: "Flux is a state-of-the-art open-weights text-to-image diffusion model developed by Black Forest Labs (the creators of Stable Diffusion). It is known for its exceptional detail, prompt adherence, and superior rendering of text inside images."
    },
    {
      question: "What is Gemini Imagen 3?",
      answer: "Imagen 3 is Google's highest-quality text-to-image model. It features advanced prompt comprehension, renders rich details, generates clear text, and has robust built-in safety filters."
    },
    {
      question: "What is OpenAI DALL-E 3?",
      answer: "DALL-E 3 is OpenAI's latest image generation model, integrated with ChatGPT. It excels at translating complex, detailed descriptions into accurate visual representations with excellent detail."
    },
    {
      question: "How do I configure my local model support?",
      answer: "You can point the local provider to a local WebUI endpoint (like Automatic1111, ComfyUI, or LM Studio) running on `localhost:7860` or `localhost:1234` to generate images completely offline using your own GPU."
    },
    {
      question: "Can I run this tool offline?",
      answer: "If you configure local model support and run a local Stable Diffusion server on your machine, yes, you can use the interface to generate and manage icons completely offline."
    },
    {
      question: "What is the difference between Stable Diffusion and DALL-E?",
      answer: "Stable Diffusion is an open-source, highly customisable architecture that can run locally and supports extensive plugins (ControlNet, LORAs). DALL-E is a closed-source, cloud-only model that is highly optimized for conversational prompt interpretations."
    },
    {
      question: "What is prompt expansion?",
      answer: "Prompt expansion is a feature where the AI appends descriptive modifiers (such as details about texture, camera depth, lighting, and composition) to a short prompt, turning a simple input like 'a cat' into a rich description like 'a detailed close-up shot of a fluffy tabby cat sleeping on a sunny windowsill, golden hour light, shallow depth of field'."
    },
    {
      question: "Where is my generation history saved?",
      answer: "Your generation history, including prompts used, dates, settings, and image thumbnails, is stored locally in your web browser's LocalStorage. If you clear your browser cache, this history will be deleted."
    },
    {
      question: "How do I save a prompt as a favorite?",
      answer: "In the prompt input area, click the 'Star' icon next to your prompt text. This saves the prompt to your Favorites list, allowing you to reload it with a single click in future sessions."
    },
    {
      question: "What are credits in this system?",
      answer: "Credits are tokens used to authorize image generations. Free users receive a daily quota of credits, while premium accounts can top up their credits balance to run high-resolution cloud models."
    },
    {
      question: "Is there a database schema prepared for this tool?",
      answer: "Yes, our architecture contains database-ready schemas for Users, Generations, Prompts, Favorites, Credits, and Analytics, making it easy to integrate with database solutions like Firebase or Postgres."
    },
    {
      question: "Does this tool support keyboard navigation?",
      answer: "Yes, the interface is built to comply with WCAG accessibility guidelines. All input boxes, style buttons, and gallery items support full keyboard tab focusing and ARIA labels."
    },
    {
      question: "Can I use this tool on my smartphone?",
      answer: "Yes, the interface is fully mobile-responsive. The control panels collapse into a swipeable drawer on smaller screens, offering a native app-like experience."
    },
    {
      question: "What is the Creativity setting?",
      answer: "Creativity controls the randomness or temperature of the model. Higher values lead to more artistic, diverse, and unpredictable results, while lower values produce stable and consistent images."
    },
    {
      question: "Can I remove watermarks from images?",
      answer: "Our tool does not add watermarks. If an external model output occasionally includes text artifacts, you can use our companion tool 'Watermark Image' or 'Background Remover' to edit them out."
    },
    {
      question: "What is seed control used for?",
      answer: "Seed control is used to lock in the randomness. By reusing a seed number, you can modify minor details of your prompt (e.g. changing the color of a shirt) while keeping the overall composition and style identical."
    },
    {
      question: "What are prompt suggestions?",
      answer: "Prompt suggestions are contextual ideas displayed near the input area. They help spark inspiration by suggesting subjects, lighting styles, or compositions."
    },
    {
      question: "Why does my generated image look distorted?",
      answer: "Distortions can happen if you request complex subjects at extremely small resolutions, or if the model's guidance scale is set too high. Try lowering the guidance scale or using a detailed prompt with a larger size preset."
    },
    {
      question: "What are the licensing rights for generated logos?",
      answer: "Logos generated with this tool are free to use for your business or brand. However, because raw AI outputs cannot be registered for exclusive trademark protection in many countries, you should consult a trademark lawyer if you require legal exclusivity."
    },
    {
      question: "Can I generate high-resolution wallpapers?",
      answer: "Yes, by setting the aspect ratio to 16:9 and selecting upscale options, you can generate 4K-resolution landscape images that serve as beautiful wallpapers."
    },
    {
      question: "Does the tool log my prompts?",
      answer: "Prompts are processed on the server to execute the API call, but we do not store your prompts or images on our database unless you are logged in and explicitly sync your history."
    },
    {
      question: "How do I clear my generation history?",
      answer: "Go to the History tab and click 'Clear History'. This will delete all saved prompts, parameters, and generated images from your local browser memory."
    },
    {
      question: "Is this platform suitable for enterprises?",
      answer: "Yes. Our pluggable provider architecture and secure API key management make it ideal for agencies, design teams, and enterprises that require clean workflows without server-side tracking."
    },
    {
      question: "Do you support SVGs in output?",
      answer: "We support PNG, JPEG, and WebP raster outputs. For vector icons, you can convert the output PNG to vector format using our companion tool 'PNG to SVG'."
    },
    {
      question: "Why did my generation request fail?",
      answer: "Generations can fail due to invalid API keys, hitting rate limits, safety blocks, or network timeouts. Check your console logs or settings variables to verify authentication."
    },
    {
      question: "How do I deploy this tool on my own website?",
      answer: "You can embed our calculator and tools by copying the dynamic integration codes. The codebase is standard Next.js App Router, making deployment simple."
    }
  ],
  longDescription: `
# Complete Guide to AI Image Generation: Architectures, Prompt Engineering, and Implementation Standards

Generative Artificial Intelligence has revolutionized digital content creation. The ability to transform natural language descriptions into high-resolution, stylized images has unlocked new possibilities for software developers, website designers, marketing agencies, and digital creators. From generating responsive web icons to creating complex illustrations and photorealistic mockups, AI image generation tools are essential assets in modern digital workflows.

This guide provides a comprehensive technical analysis of modern AI image architectures, detailing how diffusion models process prompts, describing prompt engineering strategies, and explaining how our **AI Image Generator** platform handles secure client-side and server-side processing.

---

## 1. Under the Hood: The Science of Diffusion Models

Modern text-to-image AI tools (such as Stable Diffusion, Midjourney, Flux, and Imagen) are built on **diffusion models**. Structurally, these models operate on the principle of *noising* and *denoising*.

During the training phase, standard high-resolution images are systematically degraded by adding Gaussian noise over hundreds of steps until they become completely unrecognizable. A neural network (typically a U-Net architecture or a Transformer-based system) is trained to predict the exact noise added at each step. By pairing these images with detailed text descriptions, the model learns the mathematical relationship between specific words and visual pixel arrangements.

During the generation phase, the process is reversed:
1.  **Noise Initialization**: The model starts with a grid of random noise, initialized by a numerical **Seed**.
2.  **Prompt Interpretation**: The text prompt is processed through a text encoder (such as CLIP or T5) to extract semantic vectors.
3.  **Iterative Denoising**: Guided by the text vectors, the model predicts and removes noise step-by-step, gradually assembling shapes, colors, textures, and details.
4.  **Latent Decoding**: The resulting latent representation is decoded into a standard pixel grid, producing the final PNG or JPEG.

---

## 2. Pluggable Provider Architectures: Comparing the Industry Standards

Our image generation platform is built on a **pluggable provider layer**. Developers can easily switch between cloud APIs or local models by defining standard environment variables.

### Google Gemini (Imagen 3)
*   **Strengths**: Exceptional prompt adherence, realistic text rendering within images, and advanced safety filters.
*   **API Interface**: Uses the Google GenAI REST endpoint, returning base64-encoded strings inside a \`generatedImages\` array.
*   **Best For**: Educational content, clean vector designs, and realistic photography.

### OpenAI (DALL-E 3)
*   **Strengths**: Advanced semantic understanding. It automatically rewrites and expands prompts using GPT-4 to produce highly detailed and descriptive results.
*   **API Interface**: Standard JSON POST endpoint, returning Base64 strings or temporary CDN URLs.
*   **Best For**: Creative concepts, complex storytelling scenes, and rapid prototyping.

### Flux (Black Forest Labs)
*   **Strengths**: State-of-the-art open-weights model. It outperforms many closed-source models in structural detail, rendering realistic hands, and embedding text within graphics.
*   **API Interface**: Typically deployed via Stability AI's API or serverless GPU instances (e.g., Replicate).
*   **Best For**: Typography, high-fidelity branding mockups, and artistic illustrations.

### Local Model Support (Automatic1111 / ComfyUI)
*   **Strengths**: 100% free, runs locally, has no content restrictions, and supports custom models (checkpoints) and fine-tuning.
*   **API Interface**: Standard local fetch requests targeting \`http://127.0.0.1:7860/sdapi/v1/txt2img\`.
*   **Best For**: Offline development, testing, and advanced users with high-end GPUs.

---

## 3. The Art of Prompt Engineering: Strategies for Creators

The quality of an AI-generated image depends directly on the quality of its text prompt. Prompt engineering is the practice of structuring text descriptions to steer the diffusion model effectively.

### The Structure of a Professional Prompt

A structured prompt typically includes:

1.  **Core Subject**: What is the main focus of the image? (e.g., *An astronaut riding a horse*).
2.  **Environment & Setting**: Where is it located? What is in the background? (e.g., *on the red sandy plains of Mars, under a starry sky*).
3.  **Lighting**: How is the scene lit? (e.g., *dramatic volumetric lighting, golden hour, harsh neon glow*).
4.  **Composition & Camera**: What is the angle and depth of field? (e.g., *wide-angle shot, macro detail, shallow depth of field, shot on 35mm film*).
5.  **Aesthetic Style**: What is the overall medium? (e.g., *photorealistic, cyberpunk, watercolor, vector logo, 3D render*).
6.  **Color Palette**: What are the dominant colors? (e.g., *monochromatic, vibrant pastels, earthy tones*).

### Example Prompt Progression

*   *Simple Input*: \`A futuristic city\` (Produces generic, unpredictable results).
*   *Structured Input*: \`Wide-angle cinematic shot of a futuristic cyberpunk city, towering neon skyscrapers, flying vehicles, rainy streets reflecting lights, high detail, shot on 35mm lens, volumetric lighting, rich color palette.\` (Produces sharp, consistent, high-fidelity visuals).

---

## 4. Fine-Tuning Parameters: Advanced Controls Explained

For precise control over your generated images, our advanced panel exposes the following parameters:

### Classifier-Free Guidance (CFG) Scale
The CFG scale controls the balance between text adherence and model creativity.
*   **Low CFG (1-5)**: The model has more creative freedom. Images are often more natural but may ignore parts of your prompt.
*   **Medium CFG (7-9)**: The industry standard. Offers a balanced mix of prompt adherence and image quality.
*   **High CFG (10-20)**: The model is forced to follow the prompt strictly. This can lead to oversaturated colors, high contrast, and artifacts.

### Seed Control
The seed is the starting point for the random noise grid. By default, the seed is randomized for every generation. By locking a seed value (e.g., \`42\`), you can keep the core composition identical while changing minor words in the prompt, making it easy to create consistent assets.

### Creativity (Temperature)
In language models, temperature controls output randomness. In diffusion models, adjusting temperature alters the sampler's variance, helping to generate different visual styles from the same starting parameters.

---

## 5. Commercial Utilization and Intellectual Property Guidance

A frequent question for developers and designers is: *Can I use AI-generated images commercially?*

### The Copyright Status of AI Art
Under current legal frameworks in major jurisdictions (including the United States Copyright Office and the European Union Intellectual Property Office), **raw, unedited AI-generated images cannot be registered for copyright protection** because they lack human authorship. The prompt itself is a set of instructions rather than a creative work, and the output is synthesized by a machine.

### Commercial Usage Rights
All major cloud providers (OpenAI, Google, Stability) grant users **full commercial utilization rights** to the images generated through their APIs. You are free to print, publish, license, sell, or advertise using these images without royalty obligations.

> [!CAUTION]
> While you have the right to use the generated output, you must ensure your prompt does not generate trademarked or copyrighted characters (e.g., generating images of Mickey Mouse or corporate logos). Using trademarked characters commercially can violate intellectual property laws, regardless of whether the image was generated by AI.

---

## 6. Security, Rate Limiting, and Client-Side Sandboxes

Our platform is engineered for security and abuse protection:

1.  **Input Sanitization**: Prompts are sanitized on the server to prevent prompt injection attacks and block unsafe terms.
2.  **Rate Limiting**: We implement a memory-based rate limiter on our API routes, restricting users to 10 requests per minute to prevent API key abuse.
3.  **Client-Side Sandboxing**: If no API keys are configured in your environmental variables, our API route automatically falls back to a local **Procedural SVG Sandbox Generator**. This allows you to test the complete generation flow, queue UI, styles, aspect ratios, and gallery layout locally without making expensive network calls, simplifying local development.
   `
};
