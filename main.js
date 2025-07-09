if (window.matchMedia("(min-width: 769px)").matches) {
  // Scroll-Synced Video 1
  const section = document.querySelector('section.vid');
  const vid = section?.querySelector('video');

  if (section && vid) {
    vid.pause();

    const scroll = () => {
      const distance = window.scrollY - section.offsetTop;
      const total = section.clientHeight - window.innerHeight;

      let percentage = distance / total;
      percentage = Math.max(0, Math.min(1, percentage));

      if (vid.duration > 0) {
        vid.currentTime = vid.duration * percentage;
      }
    };

    vid.addEventListener('loadedmetadata', scroll);
    window.addEventListener('scroll', scroll);
    scroll(); // initial call
  }

  // Scroll-Synced Video 2 (if exists)
  const section2 = document.querySelector('section.vid2');
  if (section2) {
    const vid2 = section2.querySelector('video');
    vid2.pause();

    const scroll2 = () => {
      const distance = window.scrollY - section2.offsetTop;
      const total = section2.clientHeight - window.innerHeight;

      let percentage = distance / total;
      percentage = Math.max(0, Math.min(1, percentage));

      if (vid2.duration > 0) {
        vid2.currentTime = vid2.duration * percentage;
      }
    };

    vid2.addEventListener('loadedmetadata', scroll2);
    window.addEventListener('scroll', scroll2);
    scroll2(); // initial call
  }

  // Navbar Hide/Reveal Logic
  const navbar = document.querySelector('.navbar');

  const checkNavbarVisibility = () => {
    const scrollY = window.scrollY;

    const isInSection = (section) => {
      const top = section.offsetTop;
      const bottom = top + section.clientHeight;
      return scrollY >= top && scrollY <= bottom;
    };

    const inVid1 = section && isInSection(section);
    const inVid2 = section2 && isInSection(section2);

    if ((inVid1 || inVid2) && !mouseNearTop) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
  };

  let mouseNearTop = false;

  document.addEventListener('mousemove', (e) => {
    if (e.clientY < 50) {
      mouseNearTop = true;
      navbar.classList.add('reveal-navbar');
    } else {
      mouseNearTop = false;
      navbar.classList.remove('reveal-navbar');
    }
  });

  // Run once on load
  checkNavbarVisibility();
  window.addEventListener('scroll', checkNavbarVisibility);
}

// hamburger menu (always needed)
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    links.classList.toggle("active");
  });
});
