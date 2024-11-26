document.addEventListener('DOMContentLoaded', () => {
    // Get elements with type annotations
    const darkModeButton = document.getElementById('toggle') as HTMLInputElement | null;
    const container = document.body; // `document.body` is always non-null
    const hamburger = document.getElementById('hamburger') as HTMLElement | null;
  
    // Early exit if critical elements are not found
    if (!darkModeButton || !hamburger) {
      console.error('Required elements not found in the DOM.');
      return;
    }
  
    // Get the current mode from localStorage
    const mode = localStorage.getItem('dark_mode');
  
    // Apply dark mode based on the saved state
    if (mode === 'dark') {
      container.classList.add('dark');
      hamburger.classList.add('navbar-dark');
      hamburger.classList.remove('navbar-light');
      darkModeButton.checked = true; // Ensure the checkbox is checked
    } else {
      container.classList.remove('dark');
      hamburger.classList.add('navbar-light');
      hamburger.classList.remove('navbar-dark');
      darkModeButton.checked = false; // Ensure the checkbox is unchecked
    }
  
    // Attach event listener for Bootstrap Toggle checkbox
    darkModeButton.addEventListener('change', () => {
      console.log('Event triggered, checked:', darkModeButton.checked);
  
      if (darkModeButton.checked) {
        container.classList.add('dark');
        hamburger.classList.add('navbar-dark');
        hamburger.classList.remove('navbar-light');
        localStorage.setItem('dark_mode', 'dark');
      } else {
        container.classList.remove('dark');
        hamburger.classList.add('navbar-light');
        hamburger.classList.remove('navbar-dark');
        localStorage.setItem('dark_mode', 'light');
      }
    });
  });
  