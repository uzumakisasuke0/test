const button = document.getElementById('playButton');
const video = document.getElementById('surpriseVideo');

button.addEventListener('click', async () => {
  video.style.display = 'block';
  
  // Remove any residual controls just in case
  video.removeAttribute('controls');
  video.controls = false;
  video.disablePictureInPicture = true;
  video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback');

  try {
    await video.play();
  } catch (err) {
    console.error('Autoplay failed:', err);
  }

  // Fullscreen
  if (video.requestFullscreen) {
    await video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    await video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    await video.msRequestFullscreen();
  }

  // Lock to landscape if possible
  if (screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock('landscape');
    } catch (e) {
      console.warn('Orientation lock not supported:', e);
    }
  }
});
