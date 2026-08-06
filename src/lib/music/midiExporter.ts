import type { DiatonicChord } from './scaleData';

/**
 * Encodes an integer into Variable-Length Quantity (VLQ) bytes for Standard MIDI Files.
 */
function encodeVLQ(value: number): number[] {
  const bytes: number[] = [];
  let v = value;
  bytes.push(v & 0x7f);
  while ((v >>= 7) > 0) {
    bytes.push((v & 0x7f) | 0x80);
  }
  return bytes.reverse();
}

/**
 * Converts a pitch class and chord root pitch to absolute MIDI note number (ascending root position).
 */
function getMidiNoteNumber(pitchClass: number, rootPitch: number): number {
  const offset = (pitchClass - rootPitch + 12) % 12;
  const absoluteSemitones = 4 * 12 + rootPitch + offset;
  return absoluteSemitones + 12; // MIDI C4 = 60
}

/**
 * Generates a Standard MIDI File (SMF Format 0) byte array for a list of diatonic chords.
 */
export function generateDiatonicMidi(
  chords: DiatonicChord[],
  chordType: 'triad' | 'seventh',
  bpm: number = 120
): Uint8Array {
  const ticksPerBeat = 480;
  const ticksPerBar = ticksPerBeat * 4; // 1920 ticks for 4/4 1 measure per chord
  const microsecondsPerBeat = Math.round(60000000 / bpm);

  const trackEvents: number[] = [];

  // 1. Meta Event: Set Tempo
  trackEvents.push(0x00, 0xff, 0x51, 0x03);
  trackEvents.push((microsecondsPerBeat >> 16) & 0xff);
  trackEvents.push((microsecondsPerBeat >> 8) & 0xff);
  trackEvents.push(microsecondsPerBeat & 0xff);

  // 2. Meta Event: Time Signature 4/4
  trackEvents.push(0x00, 0xff, 0x58, 0x04, 0x04, 0x02, 0x18, 0x08);

  // 3. For each chord, generate Note On & Note Off events
  chords.forEach((chord) => {
    const pitchClasses = chordType === 'triad' ? chord.triadNotes : chord.seventhNotes;
    if (pitchClasses.length === 0) return;

    const rootPitch = pitchClasses[0];
    const midiNotes = pitchClasses.map(p => getMidiNoteNumber(p, rootPitch));

    // Note On for all notes at delta-time 0
    midiNotes.forEach((midiNote, idx) => {
      const deltaTime = idx === 0 ? 0 : 0;
      trackEvents.push(...encodeVLQ(deltaTime));
      trackEvents.push(0x90, midiNote, 96); // Note On velocity 96
    });

    // Note Off for all notes after 1 measure (1920 ticks)
    midiNotes.forEach((midiNote, idx) => {
      const deltaTime = idx === 0 ? ticksPerBar : 0;
      trackEvents.push(...encodeVLQ(deltaTime));
      trackEvents.push(0x80, midiNote, 0); // Note Off
    });
  });

  // 4. Meta Event: End of Track
  trackEvents.push(0x00, 0xff, 0x2f, 0x00);

  // Construct Track Chunk (MTrk)
  const trackHeader = [0x4d, 0x54, 0x72, 0x6b]; // "MTrk"
  const trackLength = trackEvents.length;
  const trackLenBytes = [
    (trackLength >> 24) & 0xff,
    (trackLength >> 16) & 0xff,
    (trackLength >> 8) & 0xff,
    trackLength & 0xff
  ];

  // Construct SMF Header Chunk (MThd)
  const headerChunk = [
    0x4d, 0x54, 0x68, 0x64, // "MThd"
    0x00, 0x00, 0x00, 0x06, // Chunk size 6
    0x00, 0x00,             // Format 0
    0x00, 0x01,             // 1 Track
    (ticksPerBeat >> 8) & 0xff,
    ticksPerBeat & 0xff
  ];

  return new Uint8Array([
    ...headerChunk,
    ...trackHeader,
    ...trackLenBytes,
    ...trackEvents
  ]);
}

/**
 * Triggers a browser download of a generated MIDI file.
 */
export function downloadMidiFile(midiBytes: Uint8Array, filename: string) {
  const blob = new Blob([midiBytes.buffer as ArrayBuffer], { type: 'audio/midi' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
