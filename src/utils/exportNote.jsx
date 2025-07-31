import html2pdf from 'html2pdf.js';

export const exportNote = (note, format = 'txt') => {
  const { title, content, tags, createdAt } = note;

  if (format === 'pdf') {
    const htmlContent = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>${title}</h2>
        <p><strong>Tags:</strong> ${tags?.join(', ') ?? 'None'}</p>
        <p>${content.replace(/\n/g, '<br/>')}</p>
        <p style="margin-top: 30px; font-size: 12px; color: gray;">
          Created: ${new Date(createdAt).toLocaleString()}
        </p>
      </div>
    `;

    const options = {
      margin:       0.5,
      filename:     `${title || 'note'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(htmlContent).set(options).save();
    return;
  }

  const fileContent =
    format === 'md'
      ? `# ${title}\n\n${content}\n\n**Tags:** ${tags?.join(', ') ?? ''}`
      : `Title: ${title}\nTags: ${tags?.join(', ') ?? ''}\n\n${content}`;

  const blob = new Blob([fileContent], {
    type: format === 'md' ? 'text/markdown' : 'text/plain',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${title || 'note'}.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

  
  