export function ucFirst(string: string): string {
  if ('string' !== typeof string) {
    return ""
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function ucWords(string: string) {
  return string
    .split(' ')
    .map(value => ucFirst(value))
    .join(' ')
}

export function formatFileSize(bytes: number, decimalPoint: number = 2): string {
  if (bytes == 0) return '0 Bytes';
  const k = 1000,
    dm = decimalPoint || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
