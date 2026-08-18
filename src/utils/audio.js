// Melodic Ambient Background Music (BGM) Generator using Web Audio API
// High quality, warm chill-out restaurant melody with polyphonic chord progressions & soothing plucks.
// No large external MP3 download needed - 100% reliable, zero network latency, beautifully looped!

let audioCtx = null;
let masterGainNode = null;
let isPlaying = false;
let sequenceTimer = null;
let currentStep = 0;

// Chord progression: Em9 -> Cmaj7 -> Gmaj7 -> Dsus4/B (Warm chill smokehouse acoustic vibe)
const CHORD_PROGRESSION = [
  { bass: 82.41, notes: [164.81, 196.00, 246.94, 293.66, 392.00] }, // E3, G3, B3, D4, G4 (Em9)
  { bass: 65.41, notes: [130.81, 164.81, 196.00, 246.94, 329.63] }, // C3, E3, G3, B3, E4 (Cmaj7)
  { bass: 98.00, notes: [146.83, 196.00, 246.94, 293.66, 369.99] }, // D3, G3, B3, D4, F#4 (Gmaj7)
  { bass: 73.42, notes: [146.83, 220.00, 246.94, 293.66, 440.00] }, // D3, A3, B3, D4, A4 (Dsus4)
];

// Pentatonic melodic lead notes (Hz)
const MELODY_NOTES = [
  329.63, 369.99, 392.00, 440.00, 493.88, 587.33, 659.25, 739.99, 783.99
];

export const toggleBBQSizzle = (forceState) => {
  return toggleMelodyBGM(forceState);
};

export const toggleMelodyBGM = (forceState) => {
  if (forceState !== undefined) {
    if (forceState && !isPlaying) {
      startMelodyBGM();
    } else if (!forceState && isPlaying) {
      stopMelodyBGM();
    }
    return isPlaying;
  }

  if (isPlaying) {
    stopMelodyBGM();
  } else {
    startMelodyBGM();
  }
  return isPlaying;
};

export const getSizzleState = () => isPlaying;
export const getMelodyState = () => isPlaying;

const initAudio = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (!masterGainNode) {
    masterGainNode = audioCtx.createGain();
    masterGainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGainNode.connect(audioCtx.destination);
  }

  return audioCtx;
};

const playPluck = (ctx, dest, freq, time, duration = 1.2, volume = 0.15, type = 'sine') => {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // Warm low-pass acoustic tone
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.1, time + duration * 0.8);

    // Gentle pluck envelope (soft attack, smooth decay)
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + duration);
  } catch (err) {
    console.warn("Audio note error:", err);
  }
};

const playPadChord = (ctx, dest, chord, time, duration = 3.2) => {
  try {
    // Warm Sub Bass
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'triangle';
    bassOsc.frequency.setValueAtTime(chord.bass, time);
    bassGain.gain.setValueAtTime(0.0001, time);
    bassGain.gain.linearRampToValueAtTime(0.2, time + 0.5);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    bassOsc.connect(bassGain);
    bassGain.connect(dest);
    bassOsc.start(time);
    bassOsc.stop(time + duration);

    // Lush polyphonic notes
    chord.notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.05, time + 0.8 + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(time);
      osc.stop(time + duration);
    });
  } catch (err) {
    console.warn("Chord pad error:", err);
  }
};

const startMelodyBGM = () => {
  try {
    const ctx = initAudio();
    if (!ctx) return false;

    // Smooth master fade in
    masterGainNode.gain.cancelScheduledValues(ctx.currentTime);
    masterGainNode.gain.setValueAtTime(masterGainNode.gain.value, ctx.currentTime);
    masterGainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1.2);

    isPlaying = true;
    currentStep = 0;

    const stepDuration = 750; // ms per 16th note beat
    const chordDuration = 3.0; // seconds

    const runMelodyLoop = () => {
      if (!isPlaying || !audioCtx) return;

      const now = audioCtx.currentTime;
      const chordIndex = Math.floor(currentStep / 4) % CHORD_PROGRESSION.length;
      const currentChord = CHORD_PROGRESSION[chordIndex];

      // Play chord pad on every bar start
      if (currentStep % 4 === 0) {
        playPadChord(audioCtx, masterGainNode, currentChord, now, chordDuration);
      }

      // Arpeggiated melody note
      const noteIdx = (currentStep * 2 + (currentStep % 3)) % currentChord.notes.length;
      const arpFreq = currentChord.notes[noteIdx];
      playPluck(audioCtx, masterGainNode, arpFreq, now, 0.9, 0.12, 'sine');

      // Lead melody embellishment
      if (Math.random() > 0.35) {
        const leadIdx = Math.floor(Math.random() * MELODY_NOTES.length);
        const leadFreq = MELODY_NOTES[leadIdx];
        playPluck(audioCtx, masterGainNode, leadFreq, now + 0.25, 1.4, 0.14, 'triangle');
      }

      currentStep++;
      sequenceTimer = setTimeout(runMelodyLoop, stepDuration);
    };

    runMelodyLoop();
    return true;
  } catch (err) {
    console.warn('Melody BGM error:', err);
    return false;
  }
};

const stopMelodyBGM = () => {
  if (masterGainNode && audioCtx) {
    try {
      masterGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGainNode.gain.setValueAtTime(masterGainNode.gain.value, audioCtx.currentTime);
      masterGainNode.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
      
      setTimeout(() => {
        if (audioCtx && audioCtx.state !== 'closed' && !isPlaying) {
          audioCtx.suspend();
        }
      }, 900);
    } catch {
      // ignore
    }
  }
  if (sequenceTimer) {
    clearTimeout(sequenceTimer);
    sequenceTimer = null;
  }
  isPlaying = false;
};
