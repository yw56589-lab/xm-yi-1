const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), 'docs', 'ui-sketches');
fs.mkdirSync(outputDir, { recursive: true });

const pages = [
  {
    key: 'home',
    title: 'Home',
    subtitle: 'Value + Q avatar + CTA',
    bullets: [
      'Hero: See fit + size advice in 3s',
      'Main CTA: btn_start_tryon',
      'Hint: only a few body fields needed',
    ],
    buttons: ['btn_start_tryon'],
  },
  {
    key: 'profile',
    title: 'Profile Input (1/4)',
    subtitle: 'Template / Manual / Import',
    bullets: [
      'Template button: btn_use_template',
      'Import button: btn_import_profile',
      'Fields: height, shoulder, bust, waist, hip, arm',
      'Save: btn_save_profile',
      'Next: btn_next_select_garment',
    ],
    buttons: ['btn_use_template', 'btn_import_profile', 'btn_save_profile', 'btn_next_select_garment'],
  },
  {
    key: 'garment',
    title: 'Garment Select (2/4)',
    subtitle: 'Filter + SKU grid + size',
    bullets: [
      'Filters: category, color, size',
      'Cards: Q avatar + garment thumbnail',
      'Primary action: btn_start_generate',
    ],
    buttons: ['btn_start_generate'],
  },
  {
    key: 'generating',
    title: 'Generating (3/4)',
    subtitle: 'Aligning -> Refining -> Scoring',
    bullets: [
      'Progress stages and ETA 3-5s',
      'Cancel action: btn_cancel_job',
    ],
    buttons: ['btn_cancel_job'],
  },
  {
    key: 'result',
    title: 'Result (4/4)',
    subtitle: 'Top result + size explanation',
    bullets: [
      'Candidate switch: btn_switch_candidate_1 / 2',
      'Explain panel: btn_view_size_explain',
      'Actions: btn_regenerate, btn_save_result, btn_share_card',
    ],
    buttons: [
      'btn_switch_candidate_1',
      'btn_switch_candidate_2',
      'btn_view_size_explain',
      'btn_regenerate',
      'btn_save_result',
      'btn_share_card',
    ],
  },
];

const styles = [
  {
    key: 'style-a-candy',
    label: 'Style A - Candy Playful',
    palette: {
      bg: '#fff7f4',
      panel: '#ffffff',
      frame: '#f3d9d3',
      text: '#2f2d33',
      muted: '#7a7280',
      accent: '#ff6b6b',
      accent2: '#ffd166',
      accent3: '#4ecdc4',
    },
    corner: 26,
    buttonCorner: 22,
    pattern: 'bubble',
  },
  {
    key: 'style-b-tech',
    label: 'Style B - Utility Minimal',
    palette: {
      bg: '#f2f6fb',
      panel: '#ffffff',
      frame: '#d7e0ea',
      text: '#131a23',
      muted: '#627183',
      accent: '#00c2ff',
      accent2: '#111111',
      accent3: '#7ed6ff',
    },
    corner: 10,
    buttonCorner: 6,
    pattern: 'grid',
  },
  {
    key: 'style-c-journal',
    label: 'Style C - Journal Guochao',
    palette: {
      bg: '#fff8eb',
      panel: '#fffdf8',
      frame: '#ead9b5',
      text: '#2f2117',
      muted: '#7d5f47',
      accent: '#f97316',
      accent2: '#1d4ed8',
      accent3: '#f7c35f',
    },
    corner: 20,
    buttonCorner: 14,
    pattern: 'paper',
  },
];

const panelPositions = [
  { x: 40, y: 120 },
  { x: 420, y: 120 },
  { x: 800, y: 120 },
  { x: 230, y: 700 },
  { x: 610, y: 700 },
];

function esc(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function drawBackgroundPattern(style) {
  const { pattern, palette } = style;
  if (pattern === 'bubble') {
    return `
      <circle cx="90" cy="90" r="44" fill="${palette.accent2}" opacity="0.45" />
      <circle cx="1130" cy="150" r="56" fill="${palette.accent3}" opacity="0.35" />
      <circle cx="1030" cy="1220" r="70" fill="${palette.accent}" opacity="0.16" />
      <circle cx="150" cy="1200" r="64" fill="${palette.accent3}" opacity="0.2" />
    `;
  }
  if (pattern === 'grid') {
    let lines = '';
    for (let i = 0; i <= 12; i += 1) {
      const y = 60 + i * 100;
      lines += `<line x1="20" y1="${y}" x2="1180" y2="${y}" stroke="${palette.accent3}" opacity="0.22" stroke-width="1" />`;
    }
    for (let i = 0; i <= 11; i += 1) {
      const x = 20 + i * 105;
      lines += `<line x1="${x}" y1="40" x2="${x}" y2="1280" stroke="${palette.accent3}" opacity="0.22" stroke-width="1" />`;
    }
    return lines;
  }
  return `
    <rect x="20" y="70" width="1160" height="1180" rx="24" fill="none" stroke="${palette.accent3}" opacity="0.2" stroke-dasharray="8 8" />
    <path d="M60 220 C220 170, 320 260, 470 220" stroke="${palette.accent}" opacity="0.28" fill="none" stroke-width="3" />
    <path d="M730 210 C900 150, 970 270, 1130 220" stroke="${palette.accent2}" opacity="0.24" fill="none" stroke-width="3" />
    <path d="M100 1170 C250 1110, 370 1210, 520 1160" stroke="${palette.accent2}" opacity="0.18" fill="none" stroke-width="3" />
  `;
}

function drawAvatar(x, y, style) {
  const { accent, accent2, accent3, text } = style.palette;
  return `
    <g transform="translate(${x}, ${y})">
      <circle cx="48" cy="34" r="24" fill="${accent2}" opacity="0.85" />
      <circle cx="48" cy="33" r="19" fill="#fff" stroke="${text}" stroke-width="1.2" />
      <circle cx="42" cy="30" r="2.5" fill="${text}" />
      <circle cx="54" cy="30" r="2.5" fill="${text}" />
      <path d="M40 38 Q48 45 56 38" stroke="${text}" stroke-width="1.4" fill="none" />
      <rect x="31" y="56" width="34" height="40" rx="12" fill="${accent}" opacity="0.9" />
      <line x1="31" y1="68" x2="18" y2="79" stroke="${accent3}" stroke-width="5" stroke-linecap="round" />
      <line x1="65" y1="68" x2="78" y2="79" stroke="${accent3}" stroke-width="5" stroke-linecap="round" />
      <line x1="40" y1="96" x2="34" y2="116" stroke="${text}" stroke-width="4" stroke-linecap="round" />
      <line x1="56" y1="96" x2="62" y2="116" stroke="${text}" stroke-width="4" stroke-linecap="round" />
    </g>
  `;
}

function drawButtons(buttons, style, x, startY, width) {
  const { accent, text } = style.palette;
  const h = 24;
  const gap = 8;
  return buttons
    .slice(0, 4)
    .map((btn, idx) => {
      const y = startY + idx * (h + gap);
      return `
        <rect x="${x}" y="${y}" width="${width}" height="${h}" rx="${style.buttonCorner}" fill="${accent}" opacity="0.9" />
        <text x="${x + 10}" y="${y + 16}" fill="#ffffff" font-family="Arial, sans-serif" font-size="11" font-weight="700">${esc(btn)}</text>
      `;
    })
    .join('');
}

function drawPanel(page, style, pos) {
  const { palette } = style;
  const x = pos.x;
  const y = pos.y;
  const panelW = 340;
  const panelH = 520;
  const innerX = x + 16;
  const innerY = y + 16;

  const bulletSvg = page.bullets
    .map((line, idx) => {
      const yy = innerY + 188 + idx * 22;
      return `
        <circle cx="${innerX + 8}" cy="${yy - 3}" r="2.5" fill="${palette.accent2}" />
        <text x="${innerX + 18}" y="${yy}" fill="${palette.text}" font-family="Arial, sans-serif" font-size="11">${esc(line)}</text>
      `;
    })
    .join('');

  const progressBar =
    page.key === 'generating'
      ? `
        <rect x="${innerX}" y="${innerY + 340}" width="308" height="8" rx="4" fill="${palette.frame}" />
        <rect x="${innerX}" y="${innerY + 340}" width="200" height="8" rx="4" fill="${palette.accent}" />
      `
      : '';

  const candidateGroup =
    page.key === 'result'
      ? `
        <rect x="${innerX}" y="${innerY + 120}" width="148" height="24" rx="8" fill="${palette.accent2}" opacity="0.12" />
        <text x="${innerX + 8}" y="${innerY + 136}" fill="${palette.text}" font-family="Arial, sans-serif" font-size="10">btn_switch_candidate_1</text>
        <rect x="${innerX + 160}" y="${innerY + 120}" width="148" height="24" rx="8" fill="${palette.accent2}" opacity="0.12" />
        <text x="${innerX + 168}" y="${innerY + 136}" fill="${palette.text}" font-family="Arial, sans-serif" font-size="10">btn_switch_candidate_2</text>
      `
      : '';

  return `
    <g>
      <rect x="${x}" y="${y}" width="${panelW}" height="${panelH}" rx="${style.corner}" fill="${palette.panel}" stroke="${palette.frame}" stroke-width="3" />
      <rect x="${innerX}" y="${innerY}" width="308" height="58" rx="12" fill="${palette.accent}" opacity="0.12" />
      <text x="${innerX + 10}" y="${innerY + 24}" fill="${palette.text}" font-family="Arial, sans-serif" font-size="16" font-weight="700">${esc(page.title)}</text>
      <text x="${innerX + 10}" y="${innerY + 44}" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="12">${esc(page.subtitle)}</text>

      <rect x="${innerX}" y="${innerY + 70}" width="308" height="92" rx="14" fill="${palette.accent3}" opacity="0.16" />
      ${drawAvatar(innerX + 102, innerY + 76, style)}
      <text x="${innerX + 224}" y="${innerY + 124}" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="10">Q-avatar</text>
      <text x="${innerX + 224}" y="${innerY + 142}" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="10">placeholder</text>

      ${candidateGroup}
      ${bulletSvg}
      ${progressBar}
      ${drawButtons(page.buttons, style, innerX, innerY + 360, 308)}

      <rect x="${innerX}" y="${innerY + 470}" width="308" height="20" rx="10" fill="${palette.accent2}" opacity="0.08" />
      <text x="${innerX + 10}" y="${innerY + 484}" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="10">Low-fi wireframe board</text>
    </g>
  `;
}

function buildSvg(style) {
  const panels = pages
    .map((page, idx) => drawPanel(page, style, panelPositions[idx]))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="1280" viewBox="0 0 1200 1280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(style.label)} try-on low-fi wireframes">
  <rect x="0" y="0" width="1200" height="1280" fill="${style.palette.bg}" />
  ${drawBackgroundPattern(style)}

  <text x="40" y="52" fill="${style.palette.text}" font-family="Arial, sans-serif" font-size="30" font-weight="700">${esc(style.label)}</text>
  <text x="40" y="84" fill="${style.palette.muted}" font-family="Arial, sans-serif" font-size="14">Core 5 screens: Home, Profile, Garment, Generating, Result</text>

  ${panels}
</svg>
`;
}

for (const style of styles) {
  const filePath = path.join(outputDir, `${style.key}.svg`);
  fs.writeFileSync(filePath, buildSvg(style), 'utf8');
}

console.log(`Generated ${styles.length} svg files in ${outputDir}`);
