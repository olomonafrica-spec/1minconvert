"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowDownToLine, ArrowLeft, CheckCircle2, FileImage, FileType, FileUp, Gauge, Image as ImageIcon, LoaderCircle, LockKeyhole, Maximize2, RefreshCw, Settings2, Sparkles, X } from "lucide-react";
import Link from "next/link";
import type { ToolDefinition, ToolSlug } from "@/lib/tools";

type Status = "idle" | "processing" | "success" | "error";
type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

const formatLabels: Record<OutputFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function safeBaseName(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "") || "image";
}

async function decodeFile(file: File, forceHeic = false): Promise<{ blob: Blob; width: number; height: number }> {
  let source: Blob = file;
  if (forceHeic || /\.(heic|heif)$/i.test(file.name) || file.type === "image/heic" || file.type === "image/heif") {
    const heicModule = await import("heic2any");
    const converter = heicModule.default;
    const converted = await converter({ blob: file, toType: "image/jpeg", quality: 0.94 });
    source = Array.isArray(converted) ? converted[0] : converted;
  }
  const bitmap = await createImageBitmap(source);
  const width = bitmap.width;
  const height = bitmap.height;
  bitmap.close();
  return { blob: source, width, height };
}

async function canvasBlob(file: File, format: OutputFormat, quality: number, targetWidth?: number, targetHeight?: number, forceHeic = false, predecoded?: { blob: Blob; width: number; height: number }) {
  // Reuse the decoded input so HEIC files are not converted twice in one operation.
  const decoded = predecoded ?? await decodeFile(file, forceHeic);
  const keepRatio = !targetWidth || !targetHeight;
  let width = targetWidth || decoded.width;
  let height = targetHeight || decoded.height;
  if (keepRatio) {
    if (targetWidth) height = Math.max(1, Math.round(decoded.height * (targetWidth / decoded.width)));
    else if (targetHeight) width = Math.max(1, Math.round(decoded.width * (targetHeight / decoded.height)));
  }
  width = Math.max(1, Math.min(12000, Math.round(width)));
  height = Math.max(1, Math.min(12000, Math.round(height)));

  const bitmap = await createImageBitmap(decoded.blob);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: format !== "image/jpeg" });
  if (!context) throw new Error("Your browser could not create an image canvas. Try another browser.");
  if (format === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const result = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The image could not be exported. Try another format.")), format, quality);
  });
  return { blob: result, width, height };
}

export function ToolWorkbench({ tool }: { tool: ToolDefinition }) {
  const iconMap = { "file-image": FileImage, "file-type": FileType, gauge: Gauge, maximize: Maximize2 } as const;
  const ToolIcon = iconMap[tool.iconKey];
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [quality, setQuality] = useState(82);
  const [format, setFormat] = useState<OutputFormat>(tool.slug === "heic-to-jpg" ? "image/jpeg" : tool.slug === "webp-converter" ? "image/webp" : "image/webp");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [keepRatio, setKeepRatio] = useState(true);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const accept = tool.slug === "heic-to-jpg" ? ".heic,.heif,image/heic,image/heif" : "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
  }, [previewUrl, resultUrl]);

  function clearResult() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultBlob(null);
    setStatus("idle");
    setError("");
  }

  function loadFile(next: File | undefined) {
    if (!next) return;
    setError("");
    setStatus("idle");
    if (next.size > 40 * 1024 * 1024) {
      setError("For this early version, please choose an image smaller than 40 MB. Large-file support will be improved later.");
      return;
    }
    const isHeic = /\.(heic|heif)$/i.test(next.name) || next.type === "image/heic" || next.type === "image/heif";
    const supported = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(next.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(next.name);
    if (!supported) {
      setError("That file type isn't supported by this tool. Choose a supported image file.");
      return;
    }
    if (tool.slug === "heic-to-jpg" && !isHeic) {
      setError("Please choose a HEIC or HEIF file for this tool.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultBlob(null);
    setFile(next);
    setPreviewUrl(isHeic ? "" : URL.createObjectURL(next));
    setDimensions(null);
    setStatus("idle");
    setWidth(1200);
    setHeight(800);
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    loadFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    loadFile(event.dataTransfer.files?.[0]);
  }

  function changeWidth(next: number) {
    setWidth(next);
    if (keepRatio && dimensions) setHeight(Math.max(1, Math.round(dimensions.height * (next / dimensions.width))));
  }

  function changeHeight(next: number) {
    setHeight(next);
    if (keepRatio && dimensions) setWidth(Math.max(1, Math.round(dimensions.width * (next / dimensions.height))));
  }

  async function processFile() {
    if (!file) {
      setError("Choose an image first.");
      return;
    }
    setStatus("processing");
    setError("");
    try {
      const heic = tool.slug === "heic-to-jpg";
      const outputFormat: OutputFormat = heic ? "image/jpeg" : format;
      const requestedWidth = tool.slug === "image-resizer" ? Math.max(1, width) : undefined;
      const requestedHeight = tool.slug === "image-resizer" && !keepRatio ? Math.max(1, height) : undefined;
      const initial = await decodeFile(file, heic);
      setDimensions({ width: initial.width, height: initial.height });
      let converted: { blob: Blob; width: number; height: number };
      if (tool.slug === "image-resizer") {
        if (keepRatio) {
          const ratio = initial.width / initial.height;
          const maxWidth = Math.max(1, Math.min(12000, width));
          const maxHeight = Math.max(1, Math.min(12000, height));
          let finalWidth = maxWidth;
          let finalHeight = Math.round(finalWidth / ratio);
          if (finalHeight > maxHeight) {
            finalHeight = maxHeight;
            finalWidth = Math.round(finalHeight * ratio);
          }
          converted = await canvasBlob(file, outputFormat, quality / 100, finalWidth, finalHeight, heic, initial);
        } else {
          converted = await canvasBlob(file, outputFormat, quality / 100, requestedWidth, requestedHeight, heic, initial);
        }
      } else {
        converted = await canvasBlob(file, outputFormat, quality / 100, undefined, undefined, heic, initial);
      }
      const url = URL.createObjectURL(converted.blob);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(url);
      setResultBlob(converted.blob);
      setDimensions({ width: converted.width, height: converted.height });
      setStatus("success");
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Something went wrong while processing this image.";
      setError(message.includes("heic2any") || message.includes("HEIC")
        ? "This HEIC file could not be decoded. Try a different photo or export it as JPG from your device first."
        : message);
      setStatus("error");
    }
  }

  function download() {
    if (!resultUrl || !resultBlob || !file) return;
    const extension = formatLabels[tool.slug === "heic-to-jpg" ? "image/jpeg" : format].toLowerCase();
    const suffix = tool.slug === "image-compressor" ? "-compressed" : tool.slug === "image-resizer" ? "-resized" : `.${extension}`;
    const filename = tool.slug === "image-compressor" || tool.slug === "image-resizer"
      ? `${safeBaseName(file.name)}${suffix}.${extension}`
      : `${safeBaseName(file.name)}-${extension === "jpeg" ? "jpg" : extension}.${extension}`;
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const resultSize = resultBlob ? formatBytes(resultBlob.size) : "—";
  const savings = resultBlob && file ? Math.round((1 - resultBlob.size / file.size) * 100) : 0;
  const outputLabel = formatLabels[tool.slug === "heic-to-jpg" ? "image/jpeg" : format];

  return (
    <div className="tool-page">
      <div className="container tool-container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/#tools">Image tools</Link><span>/</span><span>{tool.shortTitle}</span></div>
        <div className="tool-heading">
          <div className="tool-title-side">
            <Link className="back-link" href="/#tools"><ArrowLeft size={15}/> All tools</Link>
            <div className="eyebrow"><span className="eyebrow-dot"/>{tool.eyebrow}</div>
            <h1>{tool.title}</h1>
            <p>{tool.description}</p>
            <div className="trust-pills"><span><LockKeyhole size={14}/> Files stay on your device</span><span><Sparkles size={14}/> Free to use</span></div>
          </div>
          <div className="tool-mark-large"><ToolIcon size={34} strokeWidth={1.8}/><span className="tool-mark-spark"><Sparkles size={14}/></span></div>
        </div>

        <div className="workbench">
          <section className="upload-column" aria-label="Upload and convert image">
            {!file ? (
              <div className={`dropzone ${dragging ? "is-dragging" : ""}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
                <input ref={inputRef} type="file" accept={accept} onChange={onInput} className="visually-hidden" aria-label="Choose image file" />
                <div className="drop-icon"><FileUp size={30}/></div>
                <h2>Drop your image here</h2>
                <p>or browse files on your device</p>
                <button className="button button-primary" onClick={() => inputRef.current?.click()}>Choose image <ArrowDownToLine size={16}/></button>
                <div className="drop-meta"><span>Max 40 MB</span><span className="meta-divider"/><span>{tool.slug === "heic-to-jpg" ? "HEIC, HEIF" : "JPG, PNG, WebP"}</span></div>
              </div>
            ) : (
              <div className="file-panel">
                <div className="file-panel-header"><div><span className="panel-overline">YOUR IMAGE</span><h2>Ready to process</h2></div><button className="icon-button" onClick={() => { setFile(null); if (previewUrl) URL.revokeObjectURL(previewUrl); if (resultUrl) URL.revokeObjectURL(resultUrl); setPreviewUrl(""); setResultUrl(""); setResultBlob(null); setStatus("idle"); setError(""); }} aria-label="Remove image"><X size={18}/></button></div>
                <div className="image-preview-frame">{resultUrl ? <img src={resultUrl} alt="Converted image preview"/> : previewUrl ? <img src={previewUrl} alt="Original image preview"/> : <div className="preview-placeholder"><ImageIcon size={38}/><span>HEIC preview appears after conversion</span></div>}</div>
                <div className="selected-file"><span className="selected-file-icon"><FileImage size={20}/></span><div className="selected-file-info"><strong>{file.name}</strong><span>{formatBytes(file.size)} {dimensions ? `· ${dimensions.width} × ${dimensions.height}px` : "· Original file"}</span></div><CheckCircle2 className="selected-check" size={18}/></div>
                {status === "success" && resultBlob && <div className="result-summary"><div><span>New file size</span><strong>{resultSize}</strong></div><div><span>Size change</span><strong className={savings > 0 ? "success-text" : ""}>{savings > 0 ? `${savings}% smaller` : savings < 0 ? `${Math.abs(savings)}% larger` : "Same size"}</strong></div></div>}
                <button className="button button-secondary button-full" onClick={() => inputRef.current?.click()}><RefreshCw size={15}/> Replace image</button>
                <input ref={inputRef} type="file" accept={accept} onChange={onInput} className="visually-hidden" aria-label="Replace image file" />
              </div>
            )}
            <div className="privacy-note"><LockKeyhole size={16}/><p><strong>Privacy first.</strong> {tool.outputNote}</p></div>
            {error && <div className="error-message" role="alert"><AlertCircle size={17}/><span>{error}</span></div>}
          </section>

          <aside className="settings-column">
            <div className="settings-heading"><div className="settings-icon"><Settings2 size={18}/></div><div><h2>Settings</h2><p>Fine-tune your output</p></div></div>
            {tool.slug === "heic-to-jpg" ? (
              <div className="setting-block"><label>Output format</label><div className="format-lock"><span className="format-badge jpg-badge">JPG</span><div><strong>JPEG image</strong><small>Works across most devices and apps</small></div><CheckCircle2 size={17}/></div></div>
            ) : tool.slug === "webp-converter" ? (
              <div className="setting-block"><label htmlFor="output-format">Convert to</label><select id="output-format" className="select-control" value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)}><option value="image/webp">WebP — modern web format</option><option value="image/jpeg">JPG — widely compatible</option><option value="image/png">PNG — supports transparency</option></select></div>
            ) : (
              <div className="setting-block"><label htmlFor="output-format">Output format</label><select id="output-format" className="select-control" value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)}><option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></div>
            )}

            {tool.slug === "image-compressor" && <div className="setting-block"><div className="setting-label-row"><label htmlFor="quality">Image quality</label><span className="value-chip">{quality}%</span></div><input id="quality" type="range" min="35" max="95" step="1" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="range-control"/><div className="range-labels"><span>Smaller file</span><span>Higher quality</span></div></div>}

            {tool.slug === "image-resizer" && <div className="setting-block"><label>Dimensions (pixels)</label><div className="dimension-inputs"><div><label htmlFor="width">Width</label><input id="width" className="number-control" type="number" min="1" max="12000" value={width} onChange={(e) => changeWidth(Number(e.target.value))}/></div><span className="dimension-x">×</span><div><label htmlFor="height">Height</label><input id="height" className="number-control" type="number" min="1" max="12000" value={height} onChange={(e) => changeHeight(Number(e.target.value))}/></div></div><label className="checkbox-row"><input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)}/><span>Keep aspect ratio</span></label><p className="setting-help">The image is scaled to fit within these dimensions when the ratio is locked.</p><div className="setting-block nested-setting"><div className="setting-label-row"><label htmlFor="resize-quality">Quality</label><span className="value-chip">{quality}%</span></div><input id="resize-quality" type="range" min="35" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="range-control"/></div></div>}

            {tool.slug !== "image-compressor" && tool.slug !== "image-resizer" && <div className="setting-block"><div className="setting-label-row"><label htmlFor="quality">Output quality</label><span className="value-chip">{quality}%</span></div><input id="quality" type="range" min="55" max="100" step="1" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="range-control"/><div className="range-labels"><span>Smaller file</span><span>Higher quality</span></div></div>}

            {tool.slug === "webp-converter" && <div className="tip-card"><Sparkles size={17}/><div><strong>Quick tip</strong><p>WebP can reduce file size for websites. JPG does not preserve transparency; use PNG or WebP when transparency matters.</p></div></div>}
            {tool.slug === "heic-to-jpg" && <div className="tip-card"><Sparkles size={17}/><div><strong>Why convert HEIC?</strong><p>JPG is widely supported by websites, older apps and devices that may not open HEIC photos.</p></div></div>}
            <div className="settings-spacer"/>
            <button className="button button-primary button-full process-button" onClick={processFile} disabled={!file || status === "processing"}>{status === "processing" ? <><LoaderCircle size={17} className="spin"/> Processing…</> : <>{tool.action} <ArrowDownToLine size={16}/></>}</button>
            {status === "success" && <><div className="success-message"><CheckCircle2 size={17}/><span>Your image is ready to download.</span></div><button className="button button-download button-full" onClick={download}><ArrowDownToLine size={17}/> Download {outputLabel}</button></>}
            <p className="settings-footnote">No account needed · No file upload to our server</p>
          </aside>
        </div>

        <section className="tool-explainer"><div><span className="section-kicker">HOW IT WORKS</span><h2>Simple tools. No extra steps.</h2></div><div className="explainer-grid"><div><span className="explainer-number">01</span><strong>Choose your file</strong><p>Select an image stored on your device. Supported processing runs locally.</p></div><div><span className="explainer-number">02</span><strong>Choose your settings</strong><p>Pick a format or adjust dimensions and quality to suit your needs.</p></div><div><span className="explainer-number">03</span><strong>Download the result</strong><p>Review the output, then save the converted image to your device.</p></div></div></section>
      </div>
    </div>
  );
}
