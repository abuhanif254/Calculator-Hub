import { ToolConfig } from './types';

export const blurFacesInImageConfig: ToolConfig = {
  slug: 'blur-faces-in-image',
  title: 'Blur Faces in Image | Free AI Privacy Tool',
  shortDescription: 'Automatically detect and blur faces in photos to protect your privacy. Fast, secure, and 100% on-device image anonymization without cloud uploads.',
  category: 'Image Tools',
  features: [
    "Automatic Face Detection: Uses advanced machine learning to detect faces instantly.",
    "Adjustable Blur Intensity: Control the exact amount of blur applied.",
    "Multiple Anonymization Methods: Choose between Blur or Pixelate effects.",
    "100% Client-Side Processing: Images are processed in your browser for total privacy.",
    "Batch Processing: Detect and blur faces across multiple images simultaneously."
  ],
  useCases: [
    "Anonymizing people in background photos before publishing online.",
    "Protecting the privacy of minors or students in educational photos.",
    "Hiding identities in documentary or journalistic photography.",
    "Obscuring faces in corporate event pictures prior to social media sharing."
  ],
  howToSteps: [
    "Upload the photo containing the faces you want to blur.",
    "Wait a moment while the AI detects the faces automatically.",
    "Adjust the blur intensity or switch to a pixelation effect.",
    "Review the blurred areas and download the anonymized image securely."
  ],
  examples: [],
  relatedTools: [
    { name: "Image Metadata Remover", slug: "image-metadata-remover" },
    { name: "Background Remover", slug: "background-remover" },
    { name: "Watermark Image", slug: "watermark-image" },
    { name: "AI Image Upscaler", slug: "ai-image-upscaler" },
    { name: "Compress Image", slug: "compress-image" },
    { name: "Crop Image", slug: "crop-image" },
    { name: "Resize Image", slug: "resize-image" }
  ],
  keywords: [
    'Blur Faces in Image', 'Face Blur Tool', 'Hide Faces Online', 'Anonymize Photo', 
    'Face Censor Tool', 'Blur Faces in Photos', 'Protect Privacy in Images', 
    'Blur People in Pictures', 'Pixelate Faces', 'Online Privacy Tool',
    'Auto Face Blur', 'AI Face Blur', 'Censor Faces'
  ],
  longDescription: `
## Why You Need to Blur Faces in Images

In today's highly interconnected, profoundly digital world, visual data is ubiquitous. Every single day, billions of photographs are captured, uploaded, shared, and perpetually stored across social media platforms, messaging applications, corporate intranets, and public websites. While this unprecedented ease of sharing has connected humanity in novel ways, it has simultaneously triggered a massive, global crisis regarding personal privacy, data sovereignty, and biometric security.

Every photograph of a human face is no longer just a memory; it is a highly structured biometric data point. With the rapid, unchecked advancement of artificial intelligence and facial recognition algorithms (such as those employed by controversial companies like Clearview AI or integrated into state-level surveillance networks), any public photo can theoretically be scraped, analyzed, and permanently tied to an individual's real-world identity, location history, and personal life. 

This is exactly why the **Blur Faces in Image Tool** is not merely a novelty utility—it is a critical, essential instrument for digital self-defense. By programmatically anonymizing the faces within your photographs before you upload them to the internet, you actively disrupt facial recognition scraping algorithms, protect the consent of bystanders, and ensure that your digital footprint remains entirely under your control.

### The Critical Importance of Consent in Photography

Consider the ethics of modern street photography, photojournalism, or even casual vacation snaps. When you take a picture in a crowded public square, you invariably capture the faces of dozens of strangers—people who never explicitly consented to have their biometric data uploaded to your public Instagram, Facebook, or Twitter feed. 

In many jurisdictions, particularly within the European Union under the strict guidelines of the General Data Protection Regulation (GDPR), publishing identifiable photographs of individuals without their explicit, informed consent can actually constitute a severe legal violation resulting in catastrophic fines. Even outside of strict legal frameworks, there is a profound moral obligation to respect the privacy of others.

The AI-powered **Face Blur Tool** provides an instantaneous, effortless solution to this ethical dilemma. Whether you are a journalist protecting the identity of a confidential whistleblower or sensitive source, an activist obscuring the faces of peaceful protesters to protect them from political retaliation, a teacher sharing classroom activities without violating strict child privacy laws (like FERPA in the United States), or simply a considerate citizen who doesn't want to broadcast a stranger's face to the world—anonymization is your primary ethical duty.

### Understanding Facial Recognition Scraping

To fully grasp why face blurring is so vital, you must understand how modern facial recognition scraping operates. Companies deploy automated web crawlers (bots) that systematically scour the public internet—downloading every publicly accessible image from social media profiles, news articles, forums, and blogs. 

Once downloaded, advanced machine learning models (specifically, deep Convolutional Neural Networks) scan these images to detect human faces. The AI then extracts a mathematical "facial signature" based on the exact geometric distances between the subject's eyes, nose, mouth, and jawline. This signature is unique to each individual, much like a fingerprint. This biometric signature is then cross-referenced against massive databases containing billions of faces linked to names, addresses, and social media accounts.

When you use our **Online Face Censor Tool** to apply a Gaussian blur or severe pixelation mosaic over a face, you are fundamentally destroying that precise geometric data. The mathematical distance between the eyes is obscured; the shape of the jawline is mathematically averaged out. When a web crawler inevitably scrapes your protected photo, the AI cannot extract a facial signature. The individual remains completely anonymous, and the biometric chain is broken.

### Use Cases for the Image Anonymization Studio

The versatility of our privacy tool extends across a multitude of professional and personal domains. Let’s explore the primary use cases where face blurring is absolutely essential:

1. **Law Enforcement and Legal Documentation:** Police departments and legal professionals frequently release CCTV footage, evidence photos, or public safety bulletins. It is standard operating procedure—and often legally mandated—to heavily blur the faces of innocent bystanders, minors, and uncharged suspects to protect their presumption of innocence and personal safety.
2. **Journalism and Documentary Filmmaking:** Protecting sources is the bedrock of journalistic integrity. If a journalist conducts an interview with a vulnerable individual in a dangerous environment, failing to adequately blur their face could result in severe, life-threatening consequences for the subject.
3. **Education and Childcare:** Schools, daycares, and summer camps love to share photos of children engaging in activities to keep parents updated. However, strict child protection laws globally require that the faces of children (especially those whose parents have not signed media release waivers) be completely unidentifiable in any publicly distributed material.
4. **Medical and Healthcare:** Medical professionals publishing case studies, research papers, or clinical photographs must adhere to HIPAA regulations (or equivalent global healthcare privacy laws). Any identifying features of a patient, particularly their face, must be thoroughly redacted and anonymized before publication to prevent catastrophic breaches of medical confidentiality.
5. **Corporate Compliance:** When companies publish office tour videos, team-building photos, or recruitment marketing materials, they often inadvertently capture employees who prefer not to have their likeness used in corporate marketing. Blurring ensures corporate compliance with internal HR privacy policies.

## How the AI Face Detection Engine Works

Historically, blurring faces in a photo was a highly tedious, manual process. You would have to open heavy, expensive desktop software like Adobe Photoshop, manually select the Elliptical Marquee tool, carefully draw an exact circle over a person's face, apply a blur filter, and repeat this painstaking process for every single person in the background of a crowd shot.

Our **Hide Faces in Photo Tool** revolutionizes this workflow by integrating a state-of-the-art Artificial Intelligence Face Detection engine directly into your web browser. 

### Stage 1: Browser-Based Machine Learning
When you upload an image to our tool, the image is passed into a highly optimized, lightweight neural network (specifically, a Single Shot Multibox Detector or SSD architecture). This AI model has been extensively trained on millions of diverse images to recognize the fundamental visual patterns that constitute a human face—regardless of skin color, lighting conditions, facial hair, glasses, or camera angle.

### Stage 2: Bounding Box Generation
In milliseconds, the AI scans the entire pixel grid of your uploaded image. When it detects a cluster of pixels that mathematically resemble a face, it calculates a tight "bounding box" (a rectangular coordinate system) precisely around the facial features. The tool can flawlessly identify a single portrait subject, or it can simultaneously generate bounding boxes for dozens of distinct faces in a dense group photo or crowded stadium shot.

### Stage 3: The Canvas Rendering Engine
Once the bounding boxes are established by the AI, our advanced HTML5 Canvas rendering engine takes over. The engine programmatically applies your chosen anonymization filter (such as a Gaussian blur, a pixelated mosaic, or a solid black redaction box) explicitly within the exact coordinates of those bounding boxes. The rest of the image remains completely untouched, retaining its original high-resolution sharpness and contextual background.

## The Absolute Guarantee of Local Processing and Privacy

It is a profound, hypocritical irony that many "Privacy and Face Blurring" tools on the internet actually violate your privacy to function. The vast majority of competing face blur websites require you to upload your sensitive, un-anonymized photo to their remote cloud servers. Their cloud servers then run the AI detection, apply the blur, and send the file back to you.

**Think about the sheer danger of this process.** You are taking a highly sensitive photo that you want to anonymize, and you are literally giving the original, unprotected, high-resolution copy to a random, anonymous server on the internet. You have zero guarantee that the server isn't secretly saving the original photo, running its own facial recognition scraping on it, or suffering a massive data breach that leaks your un-redacted files to the dark web.

**Our tool fundamentally rejects this dangerous architecture.**

We have engineered our Face Blur tool utilizing cutting-edge **Client-Side AI Execution**. When you use our tool, the AI face detection model is downloaded to your browser, and the image is processed 100% locally on your device's own CPU or GPU. 

1. **Zero Cloud Uploads:** Your image never leaves your computer, your phone, or your tablet. No network request containing your image data is ever made to our servers.
2. **True Anonymity:** Because we never see, process, or store your images, it is mathematically and physically impossible for us to leak, sell, or view your sensitive, unprotected files.
3. **Instantaneous Security:** Without the severe bottleneck of uploading a massive 15MB photo over a slow Wi-Fi connection, waiting in a server queue, and downloading the result, our local AI processes the image in milliseconds.

## Exploring the Anonymization Blur Modes

Different privacy scenarios require different visual aesthetics and levels of redaction. We offer a comprehensive suite of anonymization modes to perfectly suit your specific needs:

### 1. Gaussian Blur (The Professional Standard)
Gaussian Blur is the most common and aesthetically pleasing method for anonymization. The algorithm calculates the mathematical average of the pixels within the facial bounding box and applies a smooth, low-pass filter. This creates a soft, out-of-focus effect. It is highly favored in television news broadcasts and documentary filmmaking because it successfully hides the identity while remaining visually unobtrusive to the viewer. You can manually adjust the intensity slider—a light blur might obscure details while keeping the head shape, while a maximum blur completely obliterates all facial geometry.

### 2. Pixelation / Mosaic (The Classic Censor)
Pixelation operates by grouping blocks of adjacent pixels together and forcing them all to display a single, average color. This creates the classic "blocky" mosaic censor effect highly associated with police videos and internet anonymity. Pixelation is mathematically irreversible if the pixel blocks are large enough, making it an exceptionally secure method of anonymization. Adjusting the intensity slider controls the size of the pixel blocks; larger blocks mean higher security but a more visually disruptive image.

### 3. Solid Color Mask / Black Box Redaction
For maximum, undeniable, military-grade security, nothing beats the Solid Mask. This mode completely overwrites the facial pixels with a solid color (typically pitch black, though you can customize it). Because the original pixel data is completely destroyed and replaced with a flat hex code, there is literally zero chance of a highly advanced AI attempting to "un-blur" or reverse-engineer the face. This method is heavily utilized in legal documents, classified military declassification, and hardcore privacy activism where absolute certainty is required.

## Advanced Manual Controls and Fine-Tuning

While our AI detection engine is incredibly powerful, no AI is 100% perfect. A face might be heavily obscured by a shadow, turned away from the camera, or covered by a scarf, causing the AI to miss it. Alternatively, you might want to blur something that isn't a face at all—like a sensitive license plate, a visible credit card number on a desk, a proprietary computer screen in the background of an office photo, or a street sign that reveals your home address.

This is why our studio provides robust **Manual Override Controls**. At any time, you can click and drag directly on the image canvas to manually draw a custom blur box over any sensitive data. You can freely resize, reposition, or delete these manual boxes. You have absolute, granular control over exactly what is shown and what is hidden in your final export.

Furthermore, if the AI detects a face that you actually *want* to remain visible (for example, you want to blur the crowd but keep yourself and your friends in focus), you can simply click the 'remove' icon on that specific bounding box to instantly clear the blur from that individual.

## Best Practices for Irreversible Anonymization

It is critical to understand that not all blurring is created equal. In recent years, security researchers and AI academics have developed sophisticated neural networks capable of "de-blurring" or attempting to reconstruct faces that were only lightly obscured. To guarantee your privacy remains uncompromised, follow these best practices:

1. **Do Not Skimp on Intensity:** A light blur that makes a person look slightly out of focus is completely useless against modern AI. You must increase the blur intensity or pixelation block size until the distinct geometric shapes of the eyes, nose, and mouth are entirely indistinguishable to the human eye. If you can guess who the person is, an AI can identify them perfectly.
2. **Beware of Contextual Clues:** Blurring a face is often not enough to anonymize a subject if the rest of the image gives them away. If the subject has highly distinctive, identifiable tattoos, a completely unique item of clothing, a visible nametag, or is standing in front of their deeply unique personal vehicle, they can still be identified through contextual deduction. Use the manual blur tool to redact distinctive tattoos and name badges alongside the face.
3. **Wipe the EXIF Metadata:** It is completely pointless to painstakingly blur the faces in an image if you leave the hidden GPS location coordinates embedded in the file's EXIF data. Before or after blurring your image, we highly recommend utilizing our **Image Metadata Remover Tool** to strip out all hidden GPS, camera, and timestamp data from your file.
4. **Export in a Destructive Format:** When exporting your anonymized image, saving it as a standard JPG or PNG permanently "bakes" the black boxes or blurred pixels directly into the core image data. Our tool never uses reversible CSS filters or hidden layers in the final export—the anonymization is permanent and irreversible at the binary level.

Take back control of your digital identity. Protect the consent of the public. Defend against mass facial recognition scraping. Use the AI Face Blur Studio to securely, locally, and effortlessly anonymize your photographs today.
  `,
  faq: [
    {
      question: "How do I blur a face in a photo?",
      answer: "Simply drag and drop your image into our tool. Our built-in Artificial Intelligence will instantly scan the photo, detect all human faces, and automatically apply a secure blur to them. You can then use the slider to increase the blur intensity, or manually draw boxes over any areas the AI missed, before downloading the safe image."
    },
    {
      question: "Is this tool completely free?",
      answer: "Yes, our Face Blur Studio is 100% free to use. There are no paywalls, no subscriptions, no premium 'pro' features, and no restrictive watermarks placed on your exported images."
    },
    {
      question: "Are my photos uploaded to a cloud server?",
      answer: "Absolutely not. This is a privacy-first utility. The AI face detection model is downloaded to your browser, and all image processing happens locally on your own device's CPU/GPU. Your photos never leave your computer, ensuring zero risk of data leaks or server scraping."
    },
    {
      question: "Can anyone 'unblur' or reverse the anonymization?",
      answer: "If you apply a sufficiently strong blur, a heavy pixelation, or a solid black box, the original pixel data is mathematically destroyed and permanently overwritten. It is completely impossible to reverse or 'unblur' a solidly redacted box, as the data simply no longer exists in the file."
    },
    {
      question: "What is the difference between blur and pixelation?",
      answer: "Gaussian Blur averages the pixels to create a smooth, soft, out-of-focus effect. Pixelation groups pixels into large, chunky, monochromatic squares, creating a mosaic effect. Both are highly effective for privacy, but pixelation is often considered slightly more secure against advanced AI reconstruction attempts."
    },
    {
      question: "Why did the AI fail to detect a face in my photo?",
      answer: "While our AI is highly advanced, it relies on recognizing specific facial geometry (the distance between eyes, nose, and mouth). If a face is completely turned away from the camera, heavily obscured by shadows or sunglasses, or extremely blurry/tiny in the background, the AI may miss it. You can always use the manual draw tool to cover these missed faces."
    },
    {
      question: "Can I blur multiple faces at the same time?",
      answer: "Yes! The AI engine is capable of detecting dozens, or even hundreds, of faces within a single high-resolution crowd photograph simultaneously, applying the privacy blur to every single detected face instantly."
    },
    {
      question: "How do I blur a license plate or a document?",
      answer: "While the AI specifically targets human faces, you can easily use the Manual Selection Tool. Simply click and drag your mouse (or swipe your finger on mobile) over the license plate, street sign, credit card number, or sensitive text document to apply a permanent redaction block."
    },
    {
      question: "Does this tool work on mobile phones?",
      answer: "Yes, the interface is completely responsive and designed for mobile browsers. However, please note that AI face detection requires significant processing power. Older smartphones may take a few extra seconds to run the detection algorithms compared to a modern desktop computer."
    },
    {
      question: "Can I un-blur a specific face that the AI blurred?",
      answer: "Yes. Once the AI detects the faces and applies the blur boxes, you will see a small 'X' or 'Remove' icon next to each box. Simply click that icon to remove the privacy filter from that specific individual, keeping them visible while the rest of the crowd remains anonymous."
    },
    {
      question: "Will exporting the image reduce its quality?",
      answer: "No. The tool utilizes an HTML5 Canvas rendering engine that matches the exact resolution of your original upload. The areas outside of the blur boxes will remain exactly as sharp and high-quality as your original file, provided you select the maximum export quality setting."
    },
    {
      question: "What export format should I use?",
      answer: "Export as JPG if you want a standard, highly compatible photo file with a smaller storage footprint. Export as PNG if you want absolute lossless quality or if your original image contains transparent backgrounds (which JPG does not support)."
    },
    {
      question: "Why is a Solid Black Box the most secure option?",
      answer: "A solid black box replaces all the complex geometric color data of a face with a single, uniform hexadecimal color code (#000000). Because there is absolutely no variance in the pixels, there is literally zero data for a forensic algorithm to attempt to analyze or reconstruct."
    },
    {
      question: "Does blurring a face remove the EXIF metadata?",
      answer: "No. Blurring only alters the visual pixel data. The hidden EXIF metadata (which often contains exact GPS coordinates of where the photo was taken, timestamps, and camera models) remains in the file. To completely sanitize the photo, you must run it through our dedicated 'Image Metadata Remover' tool."
    },
    {
      question: "Can I blur a video file using this tool?",
      answer: "No. This specific utility is engineered exclusively for static raster image files (JPG, PNG, WEBP). Blurring moving faces in a video file requires complex temporal tracking algorithms and massive processing power that is currently beyond the scope of this instant web tool."
    },
    {
      question: "Is this tool GDPR compliant?",
      answer: "Yes, our tool is fundamentally GDPR compliant by design. Because we utilize 100% local, client-side processing, we do not collect, transfer, process, or store any of your personal biometric data on our servers. You remain in complete control of your data."
    },
    {
      question: "Why does the tool need to download a 'model' file?",
      answer: "In order for the AI to detect faces locally on your device without using the cloud, it must download a lightweight 'weights' file (the trained neural network model) into your browser's memory. This is a one-time download (usually around 2-5MB) that enables the secure, offline processing."
    },
    {
      question: "Can this tool detect animal faces?",
      answer: "No. The AI model was trained specifically and exclusively on human facial datasets. It will not automatically detect the faces of dogs, cats, or other animals. However, you can easily use the manual draw tool to blur your pet if you wish."
    },
    {
      question: "Can I adjust the intensity of the pixelation?",
      answer: "Yes. Once the pixelation mode is selected, an intensity slider will appear. Moving the slider to the right increases the size of the pixel blocks, making the face more heavily distorted and secure, while moving it to the left uses smaller blocks for a more subtle effect."
    },
    {
      question: "What happens if I upload an extremely large image?",
      answer: "The tool can handle very high-resolution images, but the HTML5 Canvas API has fundamental memory limits depending on your browser and device RAM. If you upload a massive 50-megapixel RAW file, the browser tab may crash. We recommend scaling massive files down to a reasonable web size first."
    },
    {
      question: "Can I use the anonymized images commercially?",
      answer: "Yes. You retain full copyright and ownership of the original image, and you are free to use the redacted, exported version for commercial publication, journalism, stock photography, or any legal enterprise."
    },
    {
      question: "How does the tool handle profile (side) faces?",
      answer: "Modern SSD-based AI models are generally highly capable of detecting faces in profile (from the side). However, if the angle is too extreme and the AI cannot see both the nose and at least one eye clearly, confidence drops and it may miss the face. Use the manual tool as a backup."
    },
    {
      question: "Does the blur extend past the face?",
      answer: "The AI calculates a tight bounding box around the core facial features. Sometimes, this box might slightly clip the edges of hair, hats, or ears. If you need to cover the entire head, you can manually resize the generated blur box by dragging its corners."
    },
    {
      question: "Why do some blur tools leave a 'halo' effect?",
      answer: "A halo effect occurs when the blurring algorithm bleeds the colors of the background into the face, or vice versa, creating a messy edge. Our tool applies the blur strictly within the defined canvas coordinates, minimizing messy halo artifacts and maintaining clean redaction lines."
    },
    {
      question: "Is this safe to use for legal evidence redaction?",
      answer: "While our solid black box redaction mathematically destroys pixel data securely, legal professionals must always adhere to their specific jurisdictional guidelines for digital redaction. Always ensure the original unredacted file is securely archived and that EXIF metadata is stripped from the public copy."
    },
    {
      question: "Can I draw a circular blur instead of a rectangle?",
      answer: "Currently, our tool generates rectangular bounding boxes as this provides the most secure, comprehensive coverage of the facial geometry and matches the standard output of AI detection models. Future updates may include elliptical masking options."
    },
    {
      question: "Why did my browser ask for permission to use the GPU?",
      answer: "Advanced AI models run significantly faster when they can utilize your device's Graphics Processing Unit (WebGL/WebGPU) rather than just the central CPU. Allowing this hardware acceleration ensures the face detection happens almost instantly."
    },
    {
      question: "Can I undo a manual blur box I accidentally drew?",
      answer: "Yes. Every manual box you draw will have a 'Delete' or 'X' icon attached to it. Simply click that icon to remove the specific mistake without having to reload the entire image and start over."
    },
    {
      question: "Does the tool work offline?",
      answer: "While the processing happens locally, you must have an internet connection to initially navigate to the website and allow the browser to download the JavaScript files and the lightweight AI model weights. Once the page is fully loaded, the processing itself does not require the internet."
    },
    {
      question: "What is 'Clearview AI' and why does face blurring matter?",
      answer: "Clearview AI is a controversial company that scraped billions of un-blurred, public images from the internet to create a massive, searchable facial recognition database used by law enforcement and corporations. Blurring your face breaks the biometric signature, preventing these systems from indexing you."
    },
    {
      question: "Will the AI detect faces in a drawing or painting?",
      answer: "It can! The AI is trained to look for patterns of light and shadow that represent eyes, noses, and mouths. Highly realistic digital paintings, anime, or classical portraits often trigger the AI detection perfectly, allowing you to redact artwork just as easily as photographs."
    },
    {
      question: "Can I save my blur preferences for next time?",
      answer: "For maximum privacy and security, our tool is completely stateless. We do not use tracking cookies to save your settings or image history. Every time you refresh the page, you start with a completely clean, secure slate."
    },
    {
      question: "How do I know the image processing is actually local?",
      answer: "You can verify this yourself! If you open your browser's Developer Tools (Network Tab), you will see that once the website loads, absolutely no image files are ever transmitted via POST requests to any external server when you click 'Blur' or 'Export'."
    },
    {
      question: "Does blurring an image prevent deepfakes?",
      answer: "Yes, it is highly effective defense. Deepfake generation AI requires clear, high-resolution source imagery of a specific face to map its movements. By heavily blurring or redacting your face in public photos, you deny malicious actors the clean biometric data required to synthesize your likeness."
    },
    {
      question: "Can I apply a custom image (like a smiley face) over the blur?",
      answer: "Our current privacy studio focuses strictly on cryptographic redaction methods (Blur, Pixelation, Solid Masks) as these are the universally accepted standards for professional and legal anonymization. Overlaying custom stickers or emojis is not currently supported."
    },
    {
      question: "What is the 'Confidence Threshold' setting?",
      answer: "The AI calculates a percentage of certainty that a cluster of pixels is a face. If the Confidence Threshold is set to 50%, it will blur anything it is at least half-sure is a face. Lowering the threshold detects more obscure faces but may cause 'false positives' (blurring things that aren't faces). Raising it ensures only perfectly clear faces are blurred."
    },
    {
      question: "Why does the exported image look slightly different in color?",
      answer: "When an image is drawn onto an HTML5 Canvas and re-exported, the browser must re-encode the file. Depending on the color profile embedded in your original image (like Adobe RGB vs sRGB), the browser's native compression engine might slightly shift the color saturation during the JPG export process."
    },
    {
      question: "Are there any limits on how many photos I can blur per day?",
      answer: "No! Because we don't pay for expensive cloud computing to process your images, we don't have to impose any daily limits or paywalls on our users. You can blur ten photos or ten thousand photos; it is entirely unlimited and free forever."
    }
  ]
};
