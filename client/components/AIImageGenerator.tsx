import { useState, useRef } from "react";
import { Upload, Loader, Download, X, Check } from "lucide-react";

interface AIImageGeneratorProps {
  category: "kanha-ji-dresses" | "sarees" | "other-products";
  description: string;
  size?: string;
  onImageGenerated: (imageUrl: string) => void;
}

export default function AIImageGenerator({
  category,
  description,
  size,
  onImageGenerated,
}: AIImageGeneratorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const generateAIImage = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Mock AI image generation
      // In production, this would call your AI API endpoint
      // For example: Stability AI, HuggingFace, or custom ML model

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Create a mock generated image using canvas
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, "#f5f1ed");
        gradient.addColorStop(1, "#e8e0d5");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 500, 600);

        // Load and draw the uploaded image
        const img = new Image();
        img.onload = () => {
          // Draw the uploaded fabric/dress image with a model effect
          ctx.globalAlpha = 0.8;
          ctx.drawImage(img, 50, 150, 400, 300);
          ctx.globalAlpha = 1;

          // Add text overlay
          ctx.fillStyle = "#8b6434";
          ctx.font = "bold 16px Cormorant Garamond";
          ctx.textAlign = "center";
          ctx.fillText("AI Generated Preview", 250, 550);

          // Generate the final image
          const generatedUrl = canvas.toDataURL("image/jpeg");
          setGeneratedImage(generatedUrl);
          onImageGenerated(generatedUrl);
        };
        img.src = uploadedImage;
      }
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `${category}-ai-generated.jpg`;
    link.click();
  };

  const resetGenerator = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900 font-semibold mb-2">
          AI Image Generator for {category === "sarees" ? "Sarees" : "Kanha Ji Dresses"}
        </p>
        <p className="text-xs text-blue-800 leading-relaxed">
          {category === "sarees"
            ? "Upload a saree fabric image. AI will generate an image of the saree on a beautiful girl."
            : "Upload a dress design. AI will generate an image of the dress on Lord Krishna."}
        </p>
      </div>

      {/* Upload Section */}
      {!generatedImage ? (
        <div className="space-y-4">
          {/* File Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {!uploadedImage ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg p-8 hover:bg-secondary transition-colors text-center"
              >
                <Upload size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="font-medium text-foreground mb-1">
                  Click to upload image
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload a clear image of the fabric/design
                </p>
              </button>
            ) : (
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => {
                    setUploadedImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Product Details for AI */}
          <div className="bg-secondary/30 rounded-lg p-4 space-y-2 text-sm">
            <p>
              <span className="font-semibold text-foreground">Category:</span>{" "}
              <span className="text-muted-foreground capitalize">
                {category.replace("-", " ")}
              </span>
            </p>
            {size && (
              <p>
                <span className="font-semibold text-foreground">Size:</span>{" "}
                <span className="text-muted-foreground">{size}</span>
              </p>
            )}
            <p>
              <span className="font-semibold text-foreground">Description:</span>{" "}
              <span className="text-muted-foreground line-clamp-2">
                {description || "No description provided"}
              </span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateAIImage}
            disabled={!uploadedImage || isGenerating}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
          >
            {isGenerating && <Loader size={18} className="animate-spin" />}
            {isGenerating ? "Generating AI Image..." : "Generate AI Image"}
          </button>
        </div>
      ) : (
        /* Generated Image Preview */
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">
              Generated Image Preview
            </p>
            <div className="bg-gray-100 rounded-lg overflow-hidden border border-border">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700 flex items-center gap-2">
              <Check size={16} />
              Image generated successfully! You can now add this product to the store.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={downloadImage}
              className="flex-1 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download
            </button>
            <button
              onClick={resetGenerator}
              className="flex-1 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
            >
              Generate Another
            </button>
          </div>
        </div>
      )}

      {/* Integration Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs text-yellow-900">
        <p className="font-semibold mb-2">📝 Integration Notes</p>
        <p className="leading-relaxed">
          <strong>Current:</strong> This is a mock AI generator for demonstration.
          <br />
          <strong>To integrate real AI:</strong> Use APIs like Stability AI, 
          HuggingFace, or Midjourney. Configure your API key in environment variables 
          and send the upload image + product details to generate realistic images 
          of the saree on a girl or dress on Lord Krishna.
        </p>
      </div>
    </div>
  );
}
