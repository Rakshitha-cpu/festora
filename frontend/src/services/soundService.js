// Web Audio API Soundscape & Procedural Harmonic Generator
class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentTrack = null;
    this.masterGain = null;
    this.volume = 0.35;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stopAll() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentTrack = null;
  }

  playTempleBell(freq = 432) {
    this.init();
    const now = this.ctx.currentTime;
    const harmonics = [1, 2.01, 3.02, 4.2, 5.4];
    const gains = [0.6, 0.3, 0.15, 0.08, 0.04];
    
    harmonics.forEach((h, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq * h, now);
      
      gain.gain.setValueAtTime(gains[i] * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(now);
      osc.stop(now + 4.6);
    });
  }

  playBinauralTheta() {
    this.init();
    this.stopAll();
    const now = this.ctx.currentTime;

    const leftOsc = this.ctx.createOscillator();
    const rightOsc = this.ctx.createOscillator();
    const merger = this.ctx.createChannelMerger(2);
    const gain = this.ctx.createGain();

    leftOsc.type = 'sine';
    leftOsc.frequency.setValueAtTime(196, now); // G3 Carrier

    rightOsc.type = 'sine';
    rightOsc.frequency.setValueAtTime(202, now); // 6 Hz Theta Offset

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 3);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    leftOsc.connect(merger, 0, 0);
    rightOsc.connect(merger, 0, 1);
    merger.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    leftOsc.start(now);
    rightOsc.start(now);

    this.activeNodes.push(leftOsc, rightOsc, gain, filter);
    this.isPlaying = true;
    this.currentTrack = 'theta';
  }

  playTanpuraDrone() {
    this.init();
    this.stopAll();
    const now = this.ctx.currentTime;
    const freqs = [146.83, 110.0, 110.2, 55.0];
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 2);

    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(f, now);
      
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12 + idx * 0.04, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.04, now);
      lfo.connect(lfoGain.gain);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(gain);

      osc.start(now);
      lfo.start(now);
      this.activeNodes.push(osc, lfo, noteGain, filter);
    });

    gain.connect(this.masterGain);
    this.activeNodes.push(gain);
    this.isPlaying = true;
    this.currentTrack = 'tanpura';
  }

  playMonsoonRain() {
    this.init();
    this.stopAll();
    const now = this.ctx.currentTime;
    
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.09;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 3);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(now);
    this.activeNodes.push(whiteNoise, filter, gain);
    this.isPlaying = true;
    this.currentTrack = 'rain';
  }

  playSacredFire() {
    this.init();
    this.stopAll();
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const crackle = Math.random() > 0.993 ? (Math.random() - 0.5) * 2.0 : 0;
      output[i] = (Math.random() * 0.035) + crackle;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(850, now);
    filter.Q.setValueAtTime(1.8, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    this.activeNodes.push(noise, filter, gain);
    this.isPlaying = true;
    this.currentTrack = 'fire';
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}

export const soundscape = new SoundscapeEngine();
