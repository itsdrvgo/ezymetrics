import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePdf<T extends Record<string, string>>(
    title: string,
    headers: string[],
    data: T[],
    positions: number[]
) {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    page.drawText(title, {
        x: 50,
        y: 750,
        size: fontSize + 4,
        font,
        color: rgb(0, 0, 0),
    });

    const headerY = 720;
    const rowHeight = 20;
    let yOffset = headerY;

    const colXPositions = positions;

    headers.forEach((header, index) => {
        page.drawText(header, {
            x: colXPositions[index],
            y: yOffset,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
        });
    });

    yOffset -= rowHeight;

    data.forEach((row) => {
        const leadData = Object.values(row).map((value) => {
            if (typeof value === "string" && value.length > 25) {
                return `${value.slice(0, 22)}...`;
            }
            return value;
        });

        leadData.forEach((lead, dataIndex) => {
            page.drawText(lead, {
                x: colXPositions[dataIndex],
                y: yOffset,
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
            });
        });

        yOffset -= rowHeight;

        if (yOffset < 50) {
            page = pdfDoc.addPage([600, 800]);
            yOffset = 750;
        }
    });

    const pdfBytes = await pdfDoc.save();
    const buffer = Buffer.from(pdfBytes);
    const arrayBuffer = new Uint8Array(pdfBytes).buffer;

    return { buffer, arrayBuffer };
}
