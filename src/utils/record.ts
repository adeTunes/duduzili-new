import { Dispatch } from "react";
import { encodeAudio } from "./encode-audio";

export async function main(setAudio: Dispatch<any>, setStart: any) {
  try {
    const buttonStop = document.querySelector("#buttonStop");
    const audio: HTMLAudioElement = document.querySelector("#audio");

    const stream = await navigator.mediaDevices.getUserMedia({
      // <1>
      video: false,
      audio: true,
    });
    const [track] = stream.getAudioTracks();
    const settings = track.getSettings(); // <2>
    
    const audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule("audio-recorder.js"); // <3>
    
    let mediaStream = stream;
    const mediaStreamSource = audioContext.createMediaStreamSource(stream); // <4>
    const audioRecorder = new AudioWorkletNode(audioContext, "audio-recorder"); // <5>
    const buffers = [];

    audioRecorder.port.addEventListener("message", (event) => {
      // <6>
      buffers.push(event.data.buffer);
    });
    audioRecorder.port.start(); // <7>

    mediaStreamSource.connect(audioRecorder); // <8>
    audioRecorder.connect(audioContext.destination);
    const parameter = audioRecorder.parameters.get("isRecording");
    parameter.setValueAtTime(1, audioContext.currentTime); // <9>

    buffers.splice(0, buffers.length);

    buttonStop.addEventListener("click", (event) => {
      const parameter = audioRecorder.parameters.get("isRecording");
      parameter.setValueAtTime(0, audioContext.currentTime); // <10>

      if (mediaStream && mediaStream.getTracks) {
        mediaStream.getTracks().forEach(track => track.stop());
      }

      const blob = encodeAudio(buffers, settings); // <11>
      const url = URL.createObjectURL(blob);
      setAudio(blob)
      setStart(false)
      audio.src = url;
    });
  } catch (err) {
    console.error(err);
  }
}
