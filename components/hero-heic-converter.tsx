"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { ArrowDownToLine, CheckCircle2, FileImage, LoaderCircle, LockKeyhole, ShieldCheck, Upload, X } from "lucide-react";

const MAX_FILE_SIZE = 40 * 1024 * 1024;

type Stage = "empty" | "selected" | "converting" | "ready" | "error";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function HeroHeicConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("empty");
  const [outputUrl, setOutputUrl] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  function resetOutput() {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputUrl("");
    setError("");
  }

  function selectFile(next?: File) {
    if (!next) return;
    resetOutput();
    const looksHeic = /\.(heic|heif)$/i.test(next.name) || next.type === "image/heic" || next.type === "image/heif";
    if (!looksHeic) {
      setFile(null);
      setStage("error");
      setError("Choose a .heic or .heif photo to convert it to JPG.");
      return;
    }
    if (next.size > MAX_FILE_SIZE) {
      setFile(null);
      setStage("error");
      setError("This early version supports photos up to 40 MB. Choose a smaller file and try again.");
      return;
    }
    setFile(next);
    setStage("selected");
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    selectFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  }

  async function convert() {
    if (!file) return;
    setStage("converting");
    setError("");
    try {
      const module = await import("heic2any");
      const converted = await module.default({ blob: file, toType: "image/jpeg", quality: 0.92 });
      const blob = Array.isArray(converted) ? converted[0] : converted;
      if (!(blob instanceof Blob)) throw new Error("The converter did not return a JPG image. Please try another HEIC photo.");
      const url = URL.createObjectURL(blob);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(url);
      setStage("ready");
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "This photo could not be converted.";
      setError(message.includes("heic2any") ? "The conversion library could not load. Check your connection and try again." : message);
      setStage("error");
    }
  }

  function download() {
    if (!outputUrl || !file) return;
    const link = document.createElement("a");
    link.href = outputUrl;
    link.download = `${file.name.replace(/\.(heic|heif)$/i, "") || "photo"}.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function removeFile() {
    resetOutput();
    setFile(null);
    setStage("empty");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={`hero-converter-card${dragging ? " is-dragging" : ""}`}>
      <div className="hero-converter-heading">
        <div className="hero-converter-file-icon"><FileImage size={22} /></div>
        <div>
          <span className="hero-converter-eyebrow">FREE IMAGE CONVERTER</span>
          <h2>HEIC <span>to</span> JPG</h2>
        </div>
        <span className="hero-format-pill">.HEIC → .JPG</span>
      </div>

      {!file ? (
        <div
          className="hero-dropzone"
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <input ref={inputRef} type="file" accept=".heic,.heif,image/heic,image/heif" onChange={onInput} className="visually-hidden-input" aria-label="Choose a HEIC photo" />
          <div className="hero-upload-symbol"><Upload size={25} /></div>
          <strong>Drop your HEIC photo here</strong>
          <span>or choose a file from your device</span>
          <button type="button" className="hero-choose-button" onClick={() => inputRef.current?.click()}>
            Choose HEIC photo
          </button>
          <small>HEIC / HEIF · Up to 40 MB</small>
        </div>
      ) : (
        <div className="hero-selected-file">
          <div className="hero-selected-file-icon"><FileImage size={21} /></div>
          <div className="hero-selected-file-info">
            <strong title={file.name}>{file.name}</strong>
            <span>{formatSize(file.size)} · HEIC photo</span>
            {stage === "ready" && <small><CheckCircle2 size={13} /> JPG is ready to download</small>}
          </div>
          {stage !== "converting" && <button type="button" className="hero-clear-button" onClick={removeFile} aria-label="Remove selected photo"><X size={17} /></button>}
          {stage === "converting" && <LoaderCircle size={20} className="hero-spinner" />}
        </div>
      )}

      {error && <p className="hero-converter-error" role="alert">{error}</p>}

      {file && stage !== "ready" && (
        <button type="button" className="hero-convert-button" onClick={convert} disabled={stage === "converting"}>
          {stage === "converting" ? <><LoaderCircle size={17} className="hero-spinner" /> Converting your photo…</> : <>Convert to JPG <ArrowDownToLine size={17} /></>}
        </button>
      )}
      {stage === "ready" && (
        <div className="hero-ready-actions">
          <button type="button" className="hero-convert-button" onClick={download}><ArrowDownToLine size={17} /> Download JPG</button>
          <button type="button" className="hero-convert-again" onClick={removeFile}>Convert another photo</button>
        </div>
      )}

      <div className="hero-converter-trust">
        <span><CheckCircle2 size={14} /> Free forever</span>
        <span><LockKeyhole size={14} /> No sign-up</span>
        <span><ShieldCheck size={14} /> Stays on your device</span>
      </div>
      <p className="hero-converter-note">Your photo is processed in your browser. It is not uploaded to our server.</p>
    </div>
  );
}
