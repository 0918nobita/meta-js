interface Prop {
    audioCtx: AudioContext;
    param: number;
    checked: boolean;
}

export default function main({ audioCtx, param, checked }: Prop): void {
    const source = audioCtx.createBufferSource();
    const { sampleRate, destination } = audioCtx;
    const frameCount = sampleRate * 1.0;
    const buffer = audioCtx.createBuffer(2, frameCount, sampleRate);

    for (let i = 0; i < frameCount; i++) {
        const progress = checked ? i / frameCount : 1.0; // 0.0 ~ 1.0
        const value = Math.sin((i / param) * progress);
        buffer.getChannelData(0)[i] = value;
        buffer.getChannelData(1)[i] = value;
    }

    source.buffer = buffer;
    source.connect(destination);
    source.start();
}
