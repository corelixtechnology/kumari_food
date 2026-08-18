// Synthetic Web Audio API BBQ Sizzle & Charcoal Crackle Sound Generator
// No external mp3 files needed - 100% reliable, zero-latency, realistic!

let audioCtx = null;
let sizzleGainNode = null;
let crackleGainNode = null;
let isPlaying = false;
let crackleInterval = null;

export const toggleBBQSizzle = (forceState) => {
  if (forceState !== undefined) {
    if (forceState && !isPlaying) {
      startSizzle();
    } else if (!forceState && isPlaying) {
      stopSizzle();
    }
    return isPlaying;
  }

  if (isPlaying) {
    stopSizzle();
  } else {
    startSizzle();
  }
  return isPlaying;
};

export const getSizzleState = () => isPlaying;

const startSizzle = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // 1. Continuous White/Pink Noise for Meat Sizzle
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter algorithm
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Highpass & Bandpass filters for juicy hiss
    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 3200;
    bandpass.Q.value = 1.2;

    const highpass = audioCtx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 1400;

    sizzleGainNode = audioCtx.createGain();
    sizzleGainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    sizzleGainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 1.2);

    whiteNoise.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(sizzleGainNode);
    sizzleGainNode.connect(audioCtx.destination);
    whiteNoise.start();

    // 2. Random Pop / Charcoal Crackle generator
    crackleGainNode = audioCtx.createGain();
    crackleGainNode.gain.value = 0.3;
    crackleGainNode.connect(audioCtx.destination);

    crackleInterval = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      playCoalPop(audioCtx, crackleGainNode);
    }, 180);

    isPlaying = true;
    return true;
  } catch (err) {
    console.warn('Web Audio error:', err);
    return false;
  }
};

const playCoalPop = (ctx, destinationGain) => {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    const baseFreq = 80 + Math.random() * 250;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.06);

    filter.type = 'lowpass';
    filter.frequency.value = 800 + Math.random() * 1200;

    const popVol = 0.05 + Math.random() * 0.15;
    gain.gain.setValueAtTime(popVol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05 + Math.random() * 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destinationGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore audio pop errors
  }
};

const stopSizzle = () => {
  if (sizzleGainNode && audioCtx) {
    try {
      sizzleGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (audioCtx && audioCtx.state !== 'closed') {
          audioCtx.suspend();
        }
      }, 550);
    } catch {
      // ignore
    }
  }
  if (crackleInterval) {
    clearInterval(crackleInterval);
    crackleInterval = null;
  }
  isPlaying = false;
};
