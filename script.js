const showPlayBtn = document.getElementById('showPlayBtn');
const playVideoBtn = document.getElementById('playVideoBtn');
const video = document.getElementById('surpriseVideo');

showPlayBtn.addEventListener('click', () => {
  showPlayBtn.style.display = 'none';
  playVideoBtn.style.display = 'inline-block';
});

playVideoBtn.addEventListener('click', async () => {
  playVideoBtn.style.display = 'none';
  video.style.display = 'block';

  // Setup video
  video.controls = false;
  video.muted = false;
  video.disablePictureInPicture = true;
  video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback');

  try {
    await video.play();

    // Fullscreen (best effort)
    if (video.requestFullscreen) {
      await video.requestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen(); // iOS Safari
    }
  } catch (err) {
    console.error('Video play or fullscreen failed:', err);
  }

  // Try landscape lock
  if (screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock('landscape');
    } catch (e) {
      console.warn('Orientation lock failed:', e);
    }
  }
});
