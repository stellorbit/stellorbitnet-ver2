export interface ScaleDef {
  id: string;
  nameJa: string;
  nameEn: string;
  category: 'diatonic' | 'modes' | 'pentatonic-blues' | 'bebop-symmetric' | 'exotic-world';
  intervals: number[]; // e.g. [0, 2, 4, 5, 7, 9, 11]
  degreeNames: string[]; // e.g. ['1', '2', '3', '4', '5', '6', '7']
  description: string;
  tags: string[];
}

export interface DiatonicChord {
  degreeRoman: string;
  rootNoteName: string;
  triadName: string;
  triadNotes: number[]; // pitch classes 0-11
  seventhName: string;
  seventhNotes: number[];
  quality: string; // e.g. "Major", "Minor", "Diminished", "Augmented", "Dominant 7th"
}

export interface ScaleMatchResult {
  scale: ScaleDef;
  rootNote: number; // 0-11
  rootName: string;
  matchedNotesCount: number;
  totalSelectedCount: number;
  matchPercentage: number;
  missingNotesInScale: number[]; // notes user selected that aren't in scale
  extraNotesInScale: number[]; // notes in scale user didn't select
}

export const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
export const NOTES_JA = ['ド', 'ド♯', 'レ', 'レ♯', 'ミ', 'ファ', 'ファ♯', 'ソ', 'ソ♯', 'ラ', 'ラ♯', 'シ'];

export const CATEGORY_LABELS: Record<ScaleDef['category'], string> = {
  'diatonic': '基本スケール (Major / Minor)',
  'modes': 'チャーチモード (Church Modes)',
  'pentatonic-blues': 'ペンタトニック & ブルース',
  'bebop-symmetric': 'ビバップ & シンメトリカル',
  'exotic-world': 'エキゾチック & 伝統音階'
};

export const SCALES: ScaleDef[] = [
  // --- DIATONIC & MINORS ---
  {
    id: 'major',
    nameJa: 'メジャー・スケール (長音階 / アイオニアン)',
    nameEn: 'Major Scale (Ionian)',
    category: 'diatonic',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degreeNames: ['1', '2', '3', '4', '5', '6', '7'],
    description: 'ポピュラー音楽の基本となる明るく安定した基本スケール。ドレミファソラシドそのもの。',
    tags: ['明るい', '王道', '基本', 'ポピュラー', '明るめ']
  },
  {
    id: 'natural-minor',
    nameJa: 'ナチュラル・マイナー (短音階 / エオリアン)',
    nameEn: 'Natural Minor (Aeolian)',
    category: 'diatonic',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degreeNames: ['1', '2', '♭3', '4', '5', '♭6', '♭7'],
    description: '哀愁や寂しさを表現する短音階の基本。メジャーの6度上の音を主音とした平行調の関係。',
    tags: ['切ない', '悲しい', '王道マイナー', 'ロック', 'ポップス']
  },
  {
    id: 'harmonic-minor',
    nameJa: 'ハーモニック・マイナー (和声的短音階)',
    nameEn: 'Harmonic Minor',
    category: 'diatonic',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    degreeNames: ['1', '2', '♭3', '4', '5', '♭6', '7'],
    description: '7度音を半音上げてドミナントコード(V7)の強力な導音を作ったマイナー。ネオクラシカルやアニソン、アコースティック音楽で頻出。',
    tags: ['クラシカル', 'オリエンタル', '情熱的', 'ネオクラ', 'アニソン']
  },
  {
    id: 'melodic-minor',
    nameJa: 'メロディック・マイナー (旋律的短音階 / ジャズマイナー)',
    nameEn: 'Melodic Minor (Jazz Minor)',
    category: 'diatonic',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    degreeNames: ['1', '2', '♭3', '4', '5', '6', '7'],
    description: 'ナチュラルマイナーの6度と7度を半音上げた上品なマイナー。ジャズでは上行形・下行形問わずそのまま使われる。',
    tags: ['ジャジー', '洗練', '高級感', 'ジャズ', 'モダン']
  },

  // --- CHURCH MODES ---
  {
    id: 'dorian',
    nameJa: 'ドリアン・モード (Dorian)',
    nameEn: 'Dorian Mode',
    category: 'modes',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    degreeNames: ['1', '2', '♭3', '4', '5', '6', '♭7'],
    description: 'ナチュラルマイナーより6度(長6度)が半音高く、明るさとクールさを併せ持つマイナーモード。ファンク、J-POPのサビ、フュージョンで大活躍。',
    tags: ['オシャレ', 'ファンキー', 'スタイリッシュ', 'CityPop', 'アニソン']
  },
  {
    id: 'phrygian',
    nameJa: 'フリジアン・モード (Phrygian)',
    nameEn: 'Phrygian Mode',
    category: 'modes',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    degreeNames: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7'],
    description: '2度音(短2度)が半音低く、スペインやエジプトを思わせるダークで神秘的な雰囲気を醸し出す。メタルやメタルコア、フラメンコに最適。',
    tags: ['ダーク', 'スパニッシュ', 'エスニック', 'ヘヴィメタル', '緊迫感']
  },
  {
    id: 'lydian',
    nameJa: 'リディアン・モード (Lydian)',
    nameEn: 'Lydian Mode',
    category: 'modes',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    degreeNames: ['1', '2', '3', '♯4', '5', '6', '7'],
    description: '4度音(増4度)の浮遊感が魅力。メジャー・スケールよりも幻想的で映画音楽や宇宙・夢をテーマにした楽曲に多用される。',
    tags: ['浮遊感', '幻想的', 'SF', '映画音楽', '爽やか']
  },
  {
    id: 'mixolydian',
    nameJa: 'ミクソリディアン・モード (Mixolydian)',
    nameEn: 'Mixolydian Mode',
    category: 'modes',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    degreeNames: ['1', '2', '3', '4', '5', '6', '♭7'],
    description: '7度音(短7度)が半音低いメジャースケール。ブルース感やブルージーな陽気さ、カントリーやブルースロックの定番。',
    tags: ['ブルージー', '開放的', 'ロックンロール', 'ファンク']
  },
  {
    id: 'locrian',
    nameJa: 'ロクリアン・モード (Locrian)',
    nameEn: 'Locrian Mode',
    category: 'modes',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    degreeNames: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7'],
    description: '完全5度が減5度(♭5)に変化した最も不安で緊張感のある極限マイナー。サスペンス、ホラー、プログレ等で使われる。',
    tags: ['不穏', 'ホラー', '不協和', 'プログレ', 'アヴァンギャルド']
  },

  // --- SPECIAL JAZZ MODES ---
  {
    id: 'lydian-dominant',
    nameJa: 'リディアン ♭7 (Lydian Dominant / Lydian ♭7)',
    nameEn: 'Lydian Dominant',
    category: 'modes',
    intervals: [0, 2, 4, 6, 7, 9, 10],
    degreeNames: ['1', '2', '3', '♯4', '5', '6', '♭7'],
    description: 'メロディックマイナーの第4モード。ドミナント7thコード上で♯11（浮遊感）を付加したモダンジャズの頻出スケール。',
    tags: ['ジャズ', 'モダン', '浮遊感', 'ドミナント7th']
  },
  {
    id: 'altered',
    nameJa: 'オルタード・スケール (Altered / Super Locrian)',
    nameEn: 'Altered Scale',
    category: 'modes',
    intervals: [0, 1, 3, 4, 6, 8, 10],
    degreeNames: ['1', '♭2', '♯2(♭3)', '3', '♭5', '♯5(♭6)', '♭7'],
    description: 'ルートと♭7以外のすべてのテンションがオルタード(♭9, ♯9, ♯11, ♭13)された、V7の裏コード・緊張感を最大化する最強のジャズスケール。',
    tags: ['ジャズ', 'テンション', 'スリリング', 'V7', '高度']
  },

  // --- PENTATONIC & BLUES ---
  {
    id: 'major-pentatonic',
    nameJa: 'メジャー・ペンタトニック (Major Pentatonic)',
    nameEn: 'Major Pentatonic',
    category: 'pentatonic-blues',
    intervals: [0, 2, 4, 7, 9],
    degreeNames: ['1', '2', '3', '5', '6'],
    description: 'ファとシを抜いた「ヨナ抜き長音階」。非常に歌いやすくキャッチーで、J-POPや童謡、ポップス、カントリーで超王道。',
    tags: ['キャッチー', 'ヨナ抜き', 'J-POP', '親しみやすい', '万能']
  },
  {
    id: 'minor-pentatonic',
    nameJa: 'マイナー・ペンタトニック (Minor Pentatonic)',
    nameEn: 'Minor Pentatonic',
    category: 'pentatonic-blues',
    intervals: [0, 3, 5, 7, 10],
    degreeNames: ['1', '♭3', '4', '5', '♭7'],
    description: 'ギターソロやロック・ブルースの代名詞。無骨でかっこいいフレーズが直感的に作れる5音階。',
    tags: ['ロック', 'ギターソロ', 'かっこいい', 'ブルース', '定番']
  },
  {
    id: 'minor-blues',
    nameJa: 'マイナー・ブルース・スケール (Minor Blues)',
    nameEn: 'Minor Blues Scale',
    category: 'pentatonic-blues',
    intervals: [0, 3, 5, 6, 7, 10],
    degreeNames: ['1', '♭3', '4', '♭5(ブルーノート)', '5', '♭7'],
    description: 'マイナーペンタトニックに「減5度（ブルーノート）」を加えた6音音階。泥臭く哀愁のある泥臭いソロ展開に最適。',
    tags: ['ブルース', 'ブルーノート', '泥臭い', 'ソウルフル']
  },
  {
    id: 'major-blues',
    nameJa: 'メジャー・ブルース・スケール (Major Blues)',
    nameEn: 'Major Blues Scale',
    category: 'pentatonic-blues',
    intervals: [0, 2, 3, 4, 7, 9],
    degreeNames: ['1', '2', '♭3(ブルーノート)', '3', '5', '6'],
    description: 'メジャーペンタトニックに♭3度ノートを加えた明るく跳ねるようなサウンド。フュージョンやR&B、ジャズで頻出。',
    tags: ['フュージョン', 'R&B', '軽快', 'ジャズブルース']
  },

  // --- BEBOP & SYMMETRIC ---
  {
    id: 'whole-tone',
    nameJa: 'ホールトーン・スケール (全音音階)',
    nameEn: 'Whole Tone Scale',
    category: 'bebop-symmetric',
    intervals: [0, 2, 4, 6, 8, 10],
    degreeNames: ['1', '2', '3', '♯4', '♯5', '♭7'],
    description: 'すべての音程が全音(半音2つ分)で構成される6音音階。中心感がなく、回想シーンやSF、夢の中を表現するのに使われる。',
    tags: ['全音音階', '無重力', '回想', 'ドビュッシー', '神秘']
  },
  {
    id: 'diminished-hw',
    nameJa: 'ディミニッシュ・スケール (Half-Whole / コンディミ)',
    nameEn: 'Diminished Scale (Half-Whole)',
    category: 'bebop-symmetric',
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
    degreeNames: ['1', '♭2', '♭3', '3', '♯4', '5', '6', '♭7'],
    description: '半音・全音の交互で並ぶ8音音階（コンビネーション・オブ・ディミニッシュ）。アウトフレーズやV7コードの緊張感付けに。',
    tags: ['8音音階', 'アウトフレーズ', 'ジャズ', '緊迫']
  },
  {
    id: 'diminished-wh',
    nameJa: 'ディミニッシュ・スケール (Whole-Half)',
    nameEn: 'Diminished Scale (Whole-Half)',
    category: 'bebop-symmetric',
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
    degreeNames: ['1', '2', '♭3', '4', '♭5', '♭6', '6', '7'],
    description: '全音・半音の交互で並ぶ8音音階。Diminished 7thコードそのもののトーンを拡張した対称スケール。',
    tags: ['ディミニッシュ', '対称性', '不穏', 'スリラー']
  },
  {
    id: 'bebop-dominant',
    nameJa: 'ビバップ・ドミナント・スケール (Bebop Dominant)',
    nameEn: 'Bebop Dominant',
    category: 'bebop-symmetric',
    intervals: [0, 2, 4, 5, 7, 9, 10, 11],
    degreeNames: ['1', '2', '3', '4', '5', '6', '♭7', '7'],
    description: 'ミクソリディアンに長7度Passing Noteを加えた8音音階。8分音符でランニングフレーズを弾いたときにコードトーンが拍頭に来る設計。',
    tags: ['ビバップ', 'ジャズ', '8分音符', '8音']
  },

  // --- EXOTIC & WORLD TRADITIONAL ---
  {
    id: 'hirajoshi',
    nameJa: '平調子 (Hirajoshi / 和風和声音階)',
    nameEn: 'Hirajoshi Scale',
    category: 'exotic-world',
    intervals: [0, 2, 3, 7, 8],
    degreeNames: ['1', '2', '♭3', '5', '♭6'],
    description: '日本の伝統的な箏(こと)の調歌に由来する5音階。和風、アニメの和風BGM、静寂と美意識を感じさせる情緒豊かなサウンド。',
    tags: ['和風', '日本古風', '箏', 'ゲーム音楽', '哀愁']
  },
  {
    id: 'insen',
    nameJa: '陰旋調 (Insen / 日本伝統音階)',
    nameEn: 'Insen Scale',
    category: 'exotic-world',
    intervals: [0, 1, 5, 7, 10],
    degreeNames: ['1', '♭2', '4', '5', '♭7'],
    description: '尺八や邦楽で用いられる日本の代表的陰旋律。凛とした緊張感と、和風ミステリアスな旋律を生む。',
    tags: ['和風', '尺八', '凛とした', '忍者', 'エキゾチック']
  },
  {
    id: 'ryukyu',
    nameJa: '琉球音階 (Okinawa / Ryukyu Scale)',
    nameEn: 'Ryukyu (Okinawa) Scale',
    category: 'exotic-world',
    intervals: [0, 4, 5, 7, 11],
    degreeNames: ['1', '3', '4', '5', '7'],
    description: '沖縄民謡や三線(さんしん)でお馴染みの南国感あふれる5音音階。明るく温かみのある沖縄サウンドを作る。',
    tags: ['沖縄', '南国', '三線', 'トロピカル', '開放的']
  },
  {
    id: 'hungarian-minor',
    nameJa: 'ハンガリアン・マイナー (Hungarian Minor)',
    nameEn: 'Hungarian Minor',
    category: 'exotic-world',
    intervals: [0, 2, 3, 6, 7, 8, 11],
    degreeNames: ['1', '2', '♭3', '♯4', '5', '♭6', '7'],
    description: 'ハーモニックマイナーの4度を♯させたエキゾチックなスケール。ジプシー音楽やバイオリンソロ、戦闘BGMで大活躍。',
    tags: ['ジプシー', 'バイオリン', '激しい', 'エキゾチック', 'ゲーム音楽']
  },
  {
    id: 'double-harmonic',
    nameJa: 'ダブル・ハーモニック・メジャー (Byzantine / Arabic)',
    nameEn: 'Double Harmonic Major (Byzantine)',
    category: 'exotic-world',
    intervals: [0, 1, 4, 5, 7, 8, 11],
    degreeNames: ['1', '♭2', '3', '4', '5', '♭6', '7'],
    description: '♭2と♭6の2箇所に増2度音程が含まれる強烈なアラビアン・ビザンチンスケール。中東や古代遺跡の雰囲気に最適。',
    tags: ['アラビアン', '中東', 'ビザンチン', '神秘的', 'オリエンタル']
  }
];

// --- HELPER FUNCTIONS ---

/**
 * Normalizes input note strings (English & Japanese) to pitch class 0-11
 * (0=C, 1=C#/Db, ..., 11=B)
 */
export function parseNoteInput(inputStr: string): number[] {
  if (!inputStr || !inputStr.trim()) return [];

  // Split by common delimiters
  const tokens = inputStr
    .replace(/[,\/\+]/g, ' ')
    .trim()
    .split(/\s+/);

  const matchedPitches = new Set<number>();

  for (let token of tokens) {
    token = token.trim();
    if (!token) continue;

    const pitch = parseSingleNoteToken(token);
    if (pitch !== null) {
      matchedPitches.add(pitch);
    }
  }

  return Array.from(matchedPitches).sort((a, b) => a - b);
}

function parseSingleNoteToken(token: string): number | null {
  // Normalize string: uppercase English, resolve sharp/flat symbols
  let t = token.toUpperCase();
  t = t.replace(/♯/g, '#').replace(/♭/g, 'B');

  // Japanese Solfège check
  if (t.startsWith('ド#') || t.startsWith('ド♯') || t === 'ド#') return 1;
  if (t.startsWith('ド')) return 0;
  if (t.startsWith('レ#') || t.startsWith('レ♯')) return 3;
  if (t.startsWith('レ')) return 2;
  if (t.startsWith('ミ')) return 4;
  if (t.startsWith('ファ#') || t.startsWith('ファ♯')) return 6;
  if (t.startsWith('ファ')) return 5;
  if (t.startsWith('ソ#') || t.startsWith('ソ♯')) return 8;
  if (t.startsWith('ソ')) return 7;
  if (t.startsWith('ラ#') || t.startsWith('ラ♯')) return 10;
  if (t.startsWith('ラ')) return 9;
  if (t.startsWith('シ')) return 11;

  // English pitch class check
  const noteMap: Record<string, number> = {
    'C': 0, 'C#': 1, 'DB': 1,
    'D': 2, 'D#': 3, 'EB': 3,
    'E': 4,
    'F': 5, 'F#': 6, 'GB': 6,
    'G': 7, 'G#': 8, 'AB': 8,
    'A': 9, 'A#': 10, 'BB': 10,
    'B': 11
  };

  // Match longest starting prefix in noteMap
  if (noteMap[t] !== undefined) return noteMap[t];
  
  // Try 2 chars e.g. C#, Db
  if (t.length >= 2 && noteMap[t.substring(0, 2)] !== undefined) {
    return noteMap[t.substring(0, 2)];
  }
  // Try 1 char e.g. C, D
  if (t.length >= 1 && noteMap[t.substring(0, 1)] !== undefined) {
    return noteMap[t.substring(0, 1)];
  }

  return null;
}

/**
 * Returns formatted note name for a pitch class given root and accidental mode
 */
export function getNoteName(pitchClass: number, useFlats: boolean = false): string {
  const norm = ((pitchClass % 12) + 12) % 12;
  return useFlats ? NOTES_FLAT[norm] : NOTES_SHARP[norm];
}

/**
 * Calculates absolute pitch classes contained in a given scale for a root pitch
 */
export function getScalePitches(scale: ScaleDef, rootNote: number): number[] {
  return scale.intervals.map(interval => (rootNote + interval) % 12);
}

/**
 * Perform reverse lookup calculation for user selected pitch classes across all 12 root notes & all scales
 */
export function findMatchingScales(selectedPitches: number[], useFlats: boolean = false): ScaleMatchResult[] {
  if (selectedPitches.length === 0) return [];

  const results: ScaleMatchResult[] = [];

  for (let root = 0; root < 12; root++) {
    const rootName = getNoteName(root, useFlats);

    for (const scale of SCALES) {
      const scalePitches = getScalePitches(scale, root);
      const scalePitchSet = new Set(scalePitches);
      const selectedSet = new Set(selectedPitches);

      // Count how many user selected notes match notes in this scale
      let matchedCount = 0;
      const missingNotes: number[] = []; // selected notes NOT in scale

      for (const p of selectedPitches) {
        if (scalePitchSet.has(p)) {
          matchedCount++;
        } else {
          missingNotes.push(p);
        }
      }

      // Notes in scale that user didn't select
      const extraNotes = scalePitches.filter(p => !selectedSet.has(p));

      // Calculate match percentage based on user's selected notes
      const matchPercentage = Math.round((matchedCount / selectedPitches.length) * 100);

      // We only include results that match at least 50% or at least 1 note if 1 note selected
      if (matchedCount > 0) {
        results.push({
          scale,
          rootNote: root,
          rootName,
          matchedNotesCount: matchedCount,
          totalSelectedCount: selectedPitches.length,
          matchPercentage,
          missingNotesInScale: missingNotes,
          extraNotesInScale: extraNotes
        });
      }
    }
  }

  // Sort results by match percentage (descending), then fewest missing notes, then category priority
  results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    if (a.missingNotesInScale.length !== b.missingNotesInScale.length) {
      return a.missingNotesInScale.length - b.missingNotesInScale.length;
    }
    return a.extraNotesInScale.length - b.extraNotesInScale.length;
  });

  return results;
}

/**
 * Calculates Diatonic Triad and 7th Chords for a given scale and root note
 */
export function getDiatonicChords(scale: ScaleDef, rootNote: number, useFlats: boolean = false): DiatonicChord[] {
  const pitches = getScalePitches(scale, rootNote);
  const n = pitches.length;
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  const chords: DiatonicChord[] = [];

  for (let i = 0; i < n; i++) {
    const r = pitches[i];
    const rootName = getNoteName(r, useFlats);
    const roman = romanNumerals[i] || `${i + 1}`;

    // Stack 3rds: 1st, 3rd, 5th, 7th (index i, i+2, i+4, i+6 in scale)
    const p3 = pitches[(i + 2) % n];
    const p5 = pitches[(i + 4) % n];
    const p7 = pitches[(i + 6) % n];

    // Semitone distances from chord root
    const semi3 = (p3 - r + 12) % 12;
    const semi5 = (p5 - r + 12) % 12;
    const semi7 = (p7 - r + 12) % 12;

    let triadSuffix = '';
    let seventhSuffix = '';
    let quality = 'Major';

    if (semi3 === 4 && semi5 === 7) {
      // Major triad
      triadSuffix = '';
      quality = 'Major';
      if (semi7 === 11) seventhSuffix = 'maj7';
      else if (semi7 === 10) seventhSuffix = '7';
      else seventhSuffix = 'maj7';
    } else if (semi3 === 3 && semi5 === 7) {
      // Minor triad
      triadSuffix = 'm';
      quality = 'Minor';
      if (semi7 === 10) seventhSuffix = 'm7';
      else if (semi7 === 11) seventhSuffix = 'm(maj7)';
      else seventhSuffix = 'm7';
    } else if (semi3 === 3 && semi5 === 6) {
      // Diminished triad
      triadSuffix = 'dim';
      quality = 'Diminished';
      if (semi7 === 10) seventhSuffix = 'm7♭5';
      else if (semi7 === 9) seventhSuffix = 'dim7';
      else seventhSuffix = 'm7♭5';
    } else if (semi3 === 4 && semi5 === 8) {
      // Augmented triad
      triadSuffix = 'aug';
      quality = 'Augmented';
      if (semi7 === 11) seventhSuffix = 'aug(maj7)';
      else if (semi7 === 10) seventhSuffix = '+7';
      else seventhSuffix = 'aug';
    } else if (semi3 === 2 || semi3 === 5) {
      // Sus chord
      triadSuffix = semi3 === 2 ? 'sus2' : 'sus4';
      seventhSuffix = triadSuffix + (semi7 === 10 ? '7' : '');
      quality = 'Suspended';
    } else {
      triadSuffix = '';
      seventhSuffix = '7';
    }

    chords.push({
      degreeRoman: roman,
      rootNoteName: rootName,
      triadName: `${rootName}${triadSuffix}`,
      triadNotes: [r, p3, p5],
      seventhName: `${rootName}${seventhSuffix}`,
      seventhNotes: [r, p3, p5, p7],
      quality
    });
  }

  return chords;
}
