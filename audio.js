// audio.js

class TypistAudio {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.enabled = false;
    }

    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        return this.enabled;
    }

    playClick() {
        if (!this.enabled) return;
        
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.audioCtx.currentTime); // Low thud start
        osc.frequency.exponentialRampToValueAtTime(1200, this.audioCtx.currentTime + 0.02); // high click end
        
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, this.audioCtx.currentTime + 0.005);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.03);
        
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        
        osc.start(this.audioCtx.currentTime);
        osc.stop(this.audioCtx.currentTime + 0.04);
    }

    playError() {
        if (!this.enabled) return;
        
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.audioCtx.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.15);
        
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        
        osc.start(this.audioCtx.currentTime);
        osc.stop(this.audioCtx.currentTime + 0.15);
    }
}

const audio = new TypistAudio();
