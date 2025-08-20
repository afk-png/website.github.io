// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.querySelector('.loading-progress');
  const loadingText = document.querySelector('.loading-text');
  const letters = document.querySelectorAll('.letter');
  const mainContent = document.getElementById('mainContent');
  const youtubePlayer = document.getElementById('youtubePlayer');
  const musicStatus = document.getElementById('musicStatus');
  const musicConsent = document.getElementById('musicConsent');
  
  let isLoadingComplete = false;
  let musicEnabled = false;
  
  // Show music consent modal first
  if (musicConsent) {
    musicConsent.style.display = 'flex';
  }
  
  // Hide loading screen initially
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
  
  // Music consent handlers
  window.enableMusicAndStart = function() {
    musicEnabled = true;
    if (musicConsent) {
      musicConsent.style.display = 'none';
    }
    startLoadingSequence();
  };
  
  window.skipMusicAndStart = function() {
    musicEnabled = false;
    if (musicConsent) {
      musicConsent.style.display = 'none';
    }
    startLoadingSequence();
  };
  
  function startLoadingSequence() {
    // Show loading screen
    if (loadingScreen) {
      loadingScreen.style.display = 'flex';
      setTimeout(() => {
        loadingScreen.style.opacity = '1';
      }, 100);
    }
    
    // Animate letters appearing
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.animationDelay = `${index * 0.1}s`;
      }, 500);
    });
    
    // Start loading progress - adjusted for 5-second timing
    setTimeout(() => {
      if (loadingProgress) {
        loadingProgress.style.width = '100%';
      }
    }, 1000);
    
    // Change loading text to Complete at 4 seconds
    setTimeout(() => {
      if (loadingText) {
        loadingText.textContent = 'Complete!';
        loadingText.style.opacity = '0';
        setTimeout(() => {
          loadingText.style.opacity = '1';
        }, 100);
      }
    }, 4000);
    
    // Start fade out at 4.5 seconds
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        isLoadingComplete = true;
      }
    }, 4500);
    
    // Hide loading screen and show content at exactly 5 seconds
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
      if (mainContent) {
        mainContent.classList.add('visible');
      }
      
      // Enable music if user consented
      if (musicEnabled) {
        setTimeout(() => {
          enableMusic();
        }, 500);
      }
    }, 5000);
  }
  
  // Enable music function with specified YouTube video
  function enableMusic() {
    try {
      if (youtubePlayer) {
        // Use the specified video ID: zyXmsVwZqX4
        // Added allow attribute for better autoplay support
        youtubePlayer.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        youtubePlayer.src = 'https://www.youtube.com/embed/zyXmsVwZqX4?autoplay=1&loop=1&playlist=zyXmsVwZqX4&controls=0&modestbranding=1&mute=0&start=0&enablejsapi=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1';
        
        console.log('Background music enabled with specified song: zyXmsVwZqX4');
        console.log('YouTube URL: https://youtu.be/zyXmsVwZqX4?si=AUDdmP1vSV7uEh7Z');
        
        // Show music status
        if (musicStatus) {
          musicStatus.querySelector('span').textContent = 'Music Enabled';
          musicStatus.classList.add('visible');
          setTimeout(() => {
            musicStatus.classList.remove('visible');
          }, 3000);
        }
      }
    } catch (error) {
      console.warn('Music autoplay failed:', error);
      if (musicStatus) {
        musicStatus.querySelector('span').textContent = 'Music unavailable';
        musicStatus.classList.add('visible');
        setTimeout(() => {
          musicStatus.classList.remove('visible');
        }, 2000);
      }
    }
  }
  
  // Performance optimizations
  document.body.style.scrollBehavior = 'smooth';
  
  // Handle visibility change for performance
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Pause animations when tab is not visible
      document.body.style.animationPlayState = 'paused';
    } else {
      // Resume animations when tab becomes visible
      document.body.style.animationPlayState = 'running';
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData && perfData.loadEventEnd > 0) {
          console.log(`Page loaded in ${Math.round(perfData.loadEventEnd)} ms`);
        }
      }, 0);
    });
  }
  
  // Reduced motion support
  const preferredMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preferredMotion.matches) {
    document.body.classList.add('reduced-motion');
  }
});