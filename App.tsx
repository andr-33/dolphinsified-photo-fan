import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Loader } from './components/Loader';
import { editImageWithDolphinsTheme } from './services/geminiService';
import { FinsUpButton } from './components/FinsUpButton';
import { DownloadButton } from './components/DownloadButton';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImageUrl(null);
    setError(null);
  };
  
  const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const [mimeTypePart, base64String] = result.split(',');
        if (!base64String) {
          reject(new Error("Could not read file as Base64"));
          return;
        }
        const mimeType = mimeTypePart.split(':')[1].split(';')[0];
        resolve({ base64: base64String, mimeType });
      };
      reader.onerror = (error) => reject(error);
    });

  const handleEditRequest = useCallback(async () => {
    if (!originalImageFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setEditedImageUrl(null);
    setError(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImageFile);
      const editedImageBase64 = await editImageWithDolphinsTheme(base64, mimeType);
      
      if(editedImageBase64) {
         setEditedImageUrl(`data:image/png;base64,${editedImageBase64}`);
      } else {
        throw new Error("The AI model did not return an image. Please try again with a different photo.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image editing.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile]);
  
  const handleReset = () => {
    setOriginalImageFile(null);
    setOriginalImageUrl(null);
    setEditedImageUrl(null);
    setError(null);
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen bg-[#003349] text-white flex flex-col font-sans p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center container mx-auto text-center py-10">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 border border-white/20">
          {!originalImageUrl && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">Upload Your Photo</h2>
              <p className="text-lg text-gray-300 mb-6">Let's see your Dolphins spirit!</p>
              <ImageUploader onImageSelect={handleImageSelect} />
            </>
          )}

          {originalImageUrl && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <ImageDisplay label="Original Photo" imageUrl={originalImageUrl} />
                <ImageDisplay label="Dolphins-ified!" imageUrl={editedImageUrl} isLoading={isLoading}/>
              </div>

              {error && (
                <div className="mt-6 bg-red-500/80 text-white font-bold p-4 rounded-lg">
                  <p>Oops! Something went wrong.</p>
                  <p className="text-sm font-normal">{error}</p>
                </div>
              )}
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                {!isLoading && !editedImageUrl && (
                    <FinsUpButton onClick={handleEditRequest} disabled={isLoading} />
                )}
                {!isLoading && editedImageUrl && (
                  <DownloadButton imageUrl={editedImageUrl} />
                )}
                <button 
                  onClick={handleReset} 
                  className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;