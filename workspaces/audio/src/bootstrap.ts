import { BehaviorSubject, combineLatest, from, fromEvent } from 'rxjs';

import main from './main';

async function setupWebAudio(): Promise<AudioContext> {
    let audioCtx;
    try {
        window.AudioContext =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContext();
    } catch (e) {
        throw new Error('Web Audio API is not supported in this browser!');
    }
    return audioCtx;
}

fromEvent(window, 'DOMContentLoaded').subscribe(() => {
    const audioCtx$ = from(setupWebAudio());

    const range = document.getElementById('range') as HTMLInputElement;
    const span = document.getElementById('param') as HTMLSpanElement;
    const button = document.getElementById('start') as HTMLButtonElement;
    const checkbox = document.getElementById('check') as HTMLInputElement;

    const param$ = new BehaviorSubject(10);
    param$.subscribe((value) => {
        span.textContent = value + '';
    });

    fromEvent(range, 'input').subscribe(() => param$.next(Number(range.value)));

    combineLatest([
        fromEvent(button, 'click'),
        audioCtx$,
    ]).subscribe(([, audioCtx]) =>
        main({ audioCtx, param: param$.getValue(), checked: checkbox.checked })
    );
});
