async function fileToJpeg(
  file: File,
): Promise<{ jpegBytes: Uint8Array; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        const base64 = dataUrl.split(",")[1];
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        resolve({ jpegBytes: bytes, width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function buildPdf(
  pages: { jpegBytes: Uint8Array; w: number; h: number }[],
): Blob {
  const enc = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let pos = 0;

  function str(s: string) {
    const b = enc.encode(s);
    chunks.push(b);
    pos += b.length;
  }

  function raw(b: Uint8Array) {
    chunks.push(b);
    pos += b.length;
  }

  // Object IDs: 1=catalog, 2=pages, then per page: 3+i*3=page, 4+i*3=content, 5+i*3=image
  const n = pages.length;
  const totalObjs = 2 + n * 3;

  str("%PDF-1.4\n");

  // Catalog
  offsets[1] = pos;
  str("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  // Pages
  const pageRefs = pages.map((_, i) => `${3 + i * 3} 0 R`).join(" ");
  offsets[2] = pos;
  str(`2 0 obj\n<< /Type /Pages /Kids [${pageRefs}] /Count ${n} >>\nendobj\n`);

  for (let i = 0; i < n; i++) {
    const { jpegBytes, w, h } = pages[i];
    const pageW = 595;
    const pageH = 842;
    const scale = Math.min(pageW / w, pageH / h);
    const iw = Math.floor(w * scale);
    const ih = Math.floor(h * scale);
    const x = Math.floor((pageW - iw) / 2);
    const y = Math.floor((pageH - ih) / 2);

    const pid = 3 + i * 3;
    const cid = 4 + i * 3;
    const imgId = 5 + i * 3;

    // Page object
    offsets[pid] = pos;
    str(
      `${pid} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}]\n  /Resources << /XObject << /Im${i} ${imgId} 0 R >> >>\n  /Contents ${cid} 0 R >>\nendobj\n`,
    );

    // Content stream
    const cs = `q ${iw} 0 0 ${ih} ${x} ${y} cm /Im${i} Do Q`;
    offsets[cid] = pos;
    str(
      `${cid} 0 obj\n<< /Length ${cs.length} >>\nstream\n${cs}\nendstream\nendobj\n`,
    );

    // Image XObject
    offsets[imgId] = pos;
    str(
      `${imgId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h}\n  /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
    );
    raw(jpegBytes);
    str("\nendstream\nendobj\n");
  }

  // xref
  const xrefPos = pos;
  str(`xref\n0 ${totalObjs + 1}\n0000000000 65535 f \n`);
  for (let i = 1; i <= totalObjs; i++) {
    str(`${(offsets[i] ?? 0).toString().padStart(10, "0")} 00000 n \n`);
  }
  str(
    `trailer\n<< /Size ${totalObjs + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`,
  );

  // Combine chunks
  const total = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return new Blob([result], { type: "application/pdf" });
}

export async function imagesToPdf(
  imageFiles: File[],
  onProgress?: (pct: number) => void,
): Promise<Blob> {
  const pages: { jpegBytes: Uint8Array; w: number; h: number }[] = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const { jpegBytes, width, height } = await fileToJpeg(imageFiles[i]);
    pages.push({ jpegBytes, w: width, h: height });
    onProgress?.(((i + 1) / imageFiles.length) * 100);
  }

  return buildPdf(pages);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
