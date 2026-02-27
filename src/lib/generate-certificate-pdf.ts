import { jsPDF } from "jspdf";

interface CertificateData {
    certificateId: string;
    studentName: string;
    courseName: string;
    startDate: string;
    endDate: string;
}

function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    try {
        // Handle YYYY-MM-DD format explicitly to avoid timezone issues
        const parts = dateStr.split("-");
        if (parts.length === 3) {
            const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            if (!isNaN(d.getTime())) {
                return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
            }
        }
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    } catch {
        return dateStr;
    }
}

function calculateDays(start: string, end: string): number {
    try {
        // Parse YYYY-MM-DD explicitly to avoid timezone issues
        const parseDateStr = (s: string) => {
            const p = s.split("-");
            if (p.length === 3) return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
            return new Date(s);
        };
        const s = parseDateStr(start);
        const e = parseDateStr(end);
        if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0;
        const diff = Math.abs(e.getTime() - s.getTime());
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    } catch {
        return 0;
    }
}

async function loadFontAsBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export async function generateCertificatePDF(data: CertificateData): Promise<Blob> {
    // Page dimensions (from original PDF: 1102.47 x 782.362 pts = 389.0 x 276.0 mm)
    const pageW = 389.0;
    const pageH = 276.0;

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pageH, pageW], // jsPDF expects [short, long] for landscape
    });

    // Load and register custom fonts (exact fonts from demo.pdf)
    const [playfairBoldBase64, notoSansBase64] = await Promise.all([
        loadFontAsBase64("/fonts/PlayfairDisplay-Bold.ttf"),
        loadFontAsBase64("/fonts/NotoSansDisplay-Regular.ttf"),
    ]);

    doc.addFileToVFS("PlayfairDisplay-Bold.ttf", playfairBoldBase64);
    doc.addFont("PlayfairDisplay-Bold.ttf", "PlayfairDisplay", "bold");

    doc.addFileToVFS("NotoSansDisplay-Regular.ttf", notoSansBase64);
    doc.addFont("NotoSansDisplay-Regular.ttf", "NotoSansDisplay", "normal");

    // Load background template image
    const img = await loadImage("/certificate-template.jpg");

    // Add background image (full page)
    doc.addImage(img, "JPEG", 0, 0, pageW, pageH);

    // === Overlay dynamic text ===
    // All positions extracted from demo.pdf using pdfminer (exact match)
    // Font color: rgb(69, 70, 73) — dark charcoal used for all text
    const days = calculateDays(data.startDate, data.endDate);
    const startFormatted = formatDate(data.startDate);
    const endFormatted = formatDate(data.endDate);

    // Certificate No — left-aligned, right after "Certificate No:" label
    // Font: NotoSansDisplay-Regular, 15pt
    doc.setFont("NotoSansDisplay", "normal");
    doc.setFontSize(15);
    doc.setTextColor(69, 70, 73);
    doc.text(data.certificateId, 165.1, 94.3);

    // Student Name — centered horizontally in content area
    // Font: PlayfairDisplay-Bold, 22.8pt
    doc.setFont("PlayfairDisplay", "bold");
    doc.setFontSize(22.8);
    doc.setTextColor(69, 70, 73);
    doc.text(data.studentName.toUpperCase(), 247.0, 137.0, { align: "center" });

    // Course Name — centered on the dotted line after "Course On"
    // Font: PlayfairDisplay-Bold, 15pt
    doc.setFont("PlayfairDisplay", "bold");
    doc.setFontSize(15);
    doc.setTextColor(69, 70, 73);
    doc.text(data.courseName.toUpperCase(), 244.5, 149.0, { align: "center" });

    // Duration days — on same line, after "for"
    doc.setFont("PlayfairDisplay", "bold");
    doc.setFontSize(15);
    doc.text(String(days), 310.5, 151.0, { align: "center" });

    // Start Date — centered after "During"
    // Font: PlayfairDisplay-Bold, 12.8pt
    doc.setFont("PlayfairDisplay", "bold");
    doc.setFontSize(12.8);
    doc.setTextColor(69, 70, 73);
    doc.text(startFormatted, 174.4, 161.6, { align: "center" });

    // End Date — centered after "to"
    doc.text(endFormatted, 234.2, 161.6, { align: "center" });

    return doc.output("blob");
}

export function downloadCertificatePDF(data: CertificateData) {
    generateCertificatePDF(data).then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Certificate-${data.certificateId}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
    });
}

function loadImage(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Failed to get canvas context"));
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg", 0.92));
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = src;
    });
}
