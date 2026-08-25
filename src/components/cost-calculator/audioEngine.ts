/**
 * audioEngine.ts
 * Luxury Swiss-Crown Web Audio Acoustic Engine for Protron Precision Dial
 * Synthesizes mechanical haptic clicks with zero external audio assets.
 */

export class AppleAcousticEngine {
  private audioCtx: AudioContext | null = null
  private masterFilter: BiquadFilterNode | null = null
  private masterGain: GainNode | null = null
  private targetVolume: number
  private isMuted: boolean = false

  constructor(volume: number = 0.22) {
    this.targetVolume = volume
  }

  public unlockAudio(): void {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      this.audioCtx = new AudioCtx({ latencyHint: 'interactive' })

      // Warm 3.8kHz Low-Pass Master Filter to eliminate harsh digital edges
      this.masterFilter = this.audioCtx.createBiquadFilter()
      this.masterFilter.type = 'lowpass'
      this.masterFilter.frequency.setValueAtTime(3800, this.audioCtx.currentTime)
      this.masterFilter.Q.setValueAtTime(0.7, this.audioCtx.currentTime)

      // Master Gain Node set to target volume
      this.masterGain = this.audioCtx.createGain()
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.targetVolume, this.audioCtx.currentTime)

      this.masterFilter.connect(this.masterGain)
      this.masterGain.connect(this.audioCtx.destination)
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume()
    }
  }

  public playTick(isMajor: boolean = false, velocity: number = 1.0): void {
    if (this.isMuted) return
    this.unlockAudio()
    if (!this.audioCtx || !this.masterFilter) return

    const now = this.audioCtx.currentTime
    const normVel = Math.min(3.0, Math.max(0.4, velocity))

    // Anti-fatigue dynamic pitch jitter
    const pitchJitter = 0.985 + Math.random() * 0.03
    const velPitchMod = 1.0 + (normVel - 1.0) * 0.08
    const totalPitch = pitchJitter * velPitchMod

    // Layer 1: Sub-Body Tactile Impulse (155Hz warm body thump)
    const bodyOsc = this.audioCtx.createOscillator()
    const bodyGain = this.audioCtx.createGain()

    bodyOsc.type = 'triangle'
    const baseFreq = (isMajor ? 175 : 155) * totalPitch
    bodyOsc.frequency.setValueAtTime(baseFreq, now)
    bodyOsc.frequency.exponentialRampToValueAtTime(Math.max(45, baseFreq * 0.4), now + 0.018)

    bodyGain.gain.setValueAtTime(0, now)
    bodyGain.gain.linearRampToValueAtTime(0.85, now + 0.001)
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + (isMajor ? 0.022 : 0.016))

    bodyOsc.connect(bodyGain)
    bodyGain.connect(this.masterFilter)
    bodyOsc.start(now)
    bodyOsc.stop(now + 0.025)

    // Layer 2: Mechanical Swiss Snap (2.4kHz crisp pop)
    const snapOsc = this.audioCtx.createOscillator()
    const snapGain = this.audioCtx.createGain()

    snapOsc.type = isMajor ? 'square' : 'sine'
    const snapFreq = (isMajor ? 2800 : 2300) * totalPitch
    snapOsc.frequency.setValueAtTime(snapFreq, now)
    snapOsc.frequency.exponentialRampToValueAtTime(700, now + 0.005)

    snapGain.gain.setValueAtTime(isMajor ? 0.35 : 0.22, now)
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.006)

    snapOsc.connect(snapGain)
    snapGain.connect(this.masterFilter)
    snapOsc.start(now)
    snapOsc.stop(now + 0.008)

    // Layer 3: Major Detent Accent (Multiples of 5 or 10)
    if (isMajor) {
      const bellOsc = this.audioCtx.createOscillator()
      const bellGain = this.audioCtx.createGain()
      bellOsc.type = 'sine'
      bellOsc.frequency.setValueAtTime(1180 * totalPitch, now)
      bellGain.gain.setValueAtTime(0.18, now)
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

      bellOsc.connect(bellGain)
      bellGain.connect(this.masterFilter)
      bellOsc.start(now)
      bellOsc.stop(now + 0.035)
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.targetVolume, this.audioCtx.currentTime)
    }
    return this.isMuted
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public setVolume(val: number): void {
    this.targetVolume = Math.max(0, Math.min(1, val))
    if (this.masterGain && this.audioCtx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.targetVolume, this.audioCtx.currentTime)
    }
  }
}
