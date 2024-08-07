"use client";
import Button from "@/components/Button";
import React, { useState, useRef } from "react";
import { QRCode, Segmented, Space } from "antd";
import type { QRCodeProps } from "antd";

const GeneratePage = () => {
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string>("#000000");
  const [bgColor, setBGColor] = useState<string>("#ffffff");
  const [error, setError] = useState<string | null>(null);
  const [renderType, setRenderType] =
    React.useState<QRCodeProps["type"]>("canvas");

  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  function doDownload(url: string, fileName: string) {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const downloadCanvasQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      doDownload(url, "QRCode.png");
    }
  };

  const downloadSvgQRCode = () => {
    const svg = document
      .getElementById("myqrcode")
      ?.querySelector<SVGElement>("svg");
    const svgData = new XMLSerializer().serializeToString(svg!);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    doDownload(url, "QRCode.svg");
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size should be less than 5MB.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      setError(null);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImageUrl(undefined);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
  };

  const handleBGColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setBGColor(selectedColor);
  };

  const handleGenerate = () => {
    if (!link) {
      setError("Link is required.");
      return;
    }
    try {
      setError(null);
      setQrCode(link);
    } catch (_) {
      setError("Please enter a valid URL.");
    }
  };

  return (
    <div className="flex-grow mb-20 px-12 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5">
      <div>
        <h1 className="text-2xl font-bold text-center md:text-left">
          Generate your QR Code
        </h1>
        <hr className="border my-5 md:hidden" />
        <div className="mt-10 text-sm">
          <div>
            <p>Link</p>
            <input
              type="text"
              value={link}
              onChange={handleLinkChange}
              className="border border-slate-200 w-full mt-2 p-3 outline-none rounded text-sm"
              placeholder="urqr.vercel.app"
            />
          </div>
          <div className="mt-3">
            <p>Images</p>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-slate-200 w-full mt-2 p-3 outline-none rounded text-sm"
            />
          </div>
          <div className="mt-3 flex gap-4">
            <div>
              <p>Color</p>
              <div className="flex gap-2 mt-2">
                <div className="p-1 bg-slate-100 w-fit cursor-pointer">
                  <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div>
              <p>Background Color</p>
              <div className="flex gap-2 mt-2">
                <div className="p-1 bg-slate-100 w-fit cursor-pointer">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={handleBGColorChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="mt-10">
          <Button text="Generate" className="w-full" onClick={handleGenerate} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative border max-w-96 aspect-square p-4 rounded flex flex-col items-center justify-center">
          {qrCode ? (
            <Space id="myqrcode" direction="vertical">
              <Segmented
                options={["canvas", "svg"]}
                onChange={(val) => setRenderType(val as QRCodeProps["type"])}
              />
              <div className="flex justify-center flex-col gap-2">
                <QRCode
                  type={renderType}
                  color={color}
                  value={link}
                  bgColor={bgColor}
                  className="mb-7"
                  size={300}
                  iconSize={80}
                  icon={imageUrl}
                />
                <Button
                  text="Download Here"
                  onClick={
                    renderType === "canvas"
                      ? downloadCanvasQRCode
                      : downloadSvgQRCode
                  }
                />
              </div>
            </Space>
          ) : (
            <p className="text-sm text-center text-slate-500">
              Your QR Code will be here after generate
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
