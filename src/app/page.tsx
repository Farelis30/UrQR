"use client";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex-grow h-screen mb-20 md:mb-0">
      <div className="w-full flex flex-col items-center gap-5 justify-center mt-28 text-slate-800">
        <h1 className="w-4/5 md:w-2/3 text-center text-3xl md:text-6xl font-bold">
          Generate QR Code with your Personal Images
        </h1>
        <p className="w-4/5 md:w-1/2 text-center text-sm md:text-base text-slate-700">
          UrQR generate your QR Code with your personal content, and it's free
          and open source to use.
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <Button href="/generate" text="Generate QR Code" />

          <Button
            href="https://github.com/Farelis30"
            text="Github Link"
            themes="secondary"
          />
        </div>
      </div>
    </div>
  );
}
