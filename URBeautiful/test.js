let stream;
let video;
let button;

// Function to turn the webcam on/off
function toggleWebcam() {
  if (!stream) {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(s => {
        stream = s;
        video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        document.body.appendChild(video);

        button.innerHTML = 'Turn Off Webcam';
      });
  } else {
    stream.getTracks().forEach(track => track.stop());
    video.style.display = 'none';
    stream = null;

    button.innerHTML = 'Turn On Webcam';
  }
}

// Create the button
button = document.createElement('button');
button.innerHTML = 'Turn On Webcam';
document.body.appendChild(button);
button.addEventListener('click', toggleWebcam);

