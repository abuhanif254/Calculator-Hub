// lib/audio/ambientSynth.ts
// In-browser Web Audio ambient soundscape engine for background audio mixing.
// 100% client-side, zero external assets, zero latency, royalty-free.

export type AmbientTrackId = "none" | "lofi" | "cinematic" | "corporate" | "meditation";

export interface AmbientTrackOption {
  id: AmbientTrackId;
  name: string;
  desc: string;
  icon: string;
}

export const AMBIENT_TRACKS: AmbientTrackOption[] = [
  { id: "none", name: "No Music (Voice Only)", desc: "Clean, unmixed studio voiceover", icon: "🔇" },
  { id: "lofi", name: "Lo-Fi Study Beats", desc: "Warm analog chords with soft low-pass tone", icon: "☕" },
  { id: "cinematic", name: "Cinematic Ambient", desc: "Expansive atmospheric pad with gentle motion", icon: "🎬" },
  { id: "corporate", name: "Modern Tech Pulse", desc: "Clean, rhythmic presentation acoustic cadence", icon: "💼" },
  { id: "meditation", name: "432Hz Zen Acoustic", desc: "Soothing harmonic drone for mindfulness and stories", icon: "🌿" },
];

export class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: any = null;
  private lfoTimerId: any = null;
  private activeNodes: Array<{ stop?: () => void; disconnect: () => void }> = [];
  private currentTrack: AmbientTrackId = "none";
  private currentVolume: number = 0.15;
  private isSuspended: boolean = false;

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } else if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public start(track: AmbientTrackId, volume = 0.15) {
    this.stop();
    this.currentTrack = track;
    this.currentVolume = Math.max(0, Math.min(0.5, volume));

    if (track === "none" || typeof window === "undefined") return;

    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);

    switch (track) {
      case "lofi":
        this.startLofi();
        break;
      case "cinematic":
        this.startCinematic();
        break;
      case "corporate":
        this.startCorporate();
        break;
      case "meditation":
        this.startMeditation();
        break;
    }
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(0.5, volume));
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
      } catch {}
    }
  }

  public pause() {
    if (this.ctx && this.ctx.state === "running") {
      this.ctx.suspend().catch(() => {});
      this.isSuspended = true;
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === "suspended" && this.currentTrack !== "none") {
      this.ctx.resume().catch(() => {});
      this.isSuspended = false;
    }
  }

  public stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.lfoTimerId) {
      clearInterval(this.lfoTimerId);
      this.lfoTimerId = null;
    }

    for (const node of this.activeNodes) {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch {}
    }
    this.activeNodes = [];

    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
      this.masterGain = null;
    }
    this.currentTrack = "none";
    this.isSuspended = false;
  }

  // --- LO-FI CHORD ENGINE ---
  private startLofi() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(420, ctx.currentTime);
    filter.connect(this.masterGain);
    this.activeNodes.push(filter);

    const chords = [
      [174.61, 220.0, 261.63, 329.63], // F3, A3, C4, E4
      [130.81, 196.0, 246.94, 261.63], // C3, G3, B3, C4
      [146.83, 174.61, 220.0, 261.63], // D3, F3, A3, C4
      [110.0, 164.81, 220.0, 261.63],  // A2, E3, A3, C4
    ];

    let chordIdx = 0;

    const playNextChord = () => {
      if (!this.ctx || this.currentTrack !== "lofi") return;
      const now = ctx.currentTime;
      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const chordGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.8 - 0.4), now);

        chordGain.gain.setValueAtTime(0.001, now);
        chordGain.gain.exponentialRampToValueAtTime(0.06, now + 1.2);
        chordGain.gain.exponentialRampToValueAtTime(0.001, now + 3.9);

        osc.connect(chordGain);
        chordGain.connect(filter);

        osc.start(now);
        osc.stop(now + 4.0);

        this.activeNodes.push(osc, chordGain);
      });
    };

    playNextChord();
    this.timerId = setInterval(playNextChord, 4000);
  }

  // --- CINEMATIC AMBIENT ENGINE ---
  private startCinematic() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(350, ctx.currentTime);
    filter.connect(this.masterGain);
    this.activeNodes.push(filter);

    const freqs = [73.42, 110.0, 146.83, 185.0, 220.0];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq + (i * 0.2), ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05 / freqs.length, ctx.currentTime + 3.0);

      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      this.activeNodes.push(osc, gain);
    });

    let sweepUp = true;
    this.lfoTimerId = setInterval(() => {
      if (!this.ctx || this.currentTrack !== "cinematic") return;
      const targetFreq = sweepUp ? 750 : 320;
      sweepUp = !sweepUp;
      filter.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 3.5);
    }, 4500);
  }

  // --- CORPORATE TECH PULSE ENGINE ---
  private startCorporate() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    filter.connect(this.masterGain);
    this.activeNodes.push(filter);

    const notes = [220.0, 277.18, 329.63, 440.0, 329.63, 277.18];
    let noteIdx = 0;

    const playPluck = () => {
      if (!this.ctx || this.currentTrack !== "corporate") return;
      const now = ctx.currentTime;
      const freq = notes[noteIdx % notes.length];
      noteIdx++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(now);
      osc.stop(now + 0.6);

      this.activeNodes.push(osc, gain);
    };

    playPluck();
    this.timerId = setInterval(playPluck, 600);
  }

  // --- ZEN 432HZ MEDITATION ENGINE ---
  private startMeditation() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    const freqs = [108.0, 216.0, 432.0];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04 / (idx + 1), ctx.currentTime + 4.0);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start();
      this.activeNodes.push(osc, gain);
    });
  }
}
