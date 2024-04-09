const navToggler = document.getElementById('NavToggler');
const navMenu = document.getElementById('NavMenu');

/* TODO: Not accessible */
navToggler.addEventListener('click', () => {
  const siteMain = document.getElementById('SiteMain');
  const siteFooter = document.getElementById('SiteFooter');

  if (navMenu.classList.contains('flex')) {
    navMenu.classList.replace('flex', 'hidden');
  } else {
    navMenu.classList.replace('hidden', 'flex');
  }

  /*
    Hide the main content and footer when the mobile menu is open.
    This allows the menu to be scrollable and limits the DOM for screen readrs.
  */
  siteMain.classList.toggle('hidden');
  siteFooter.classList.toggle('hidden');
});



const navMenuTriggers = document.querySelectorAll('[data-menu-trigger]');

navMenuTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const target = trigger.nextElementSibling;

    if (target.classList.contains('hidden')) {
      target.classList.replace('hidden', 'flex');
    } else {
      target.classList.replace('flex', 'hidden');
    }
  });
});

document.addEventListener('click', (event) => {
  // Check if the click was outside the navMenu and if the navMenu is currently visible
  if (!navMenu.contains(event.target) && navMenu.classList.contains('flex')) {
    navMenu.classList.replace('flex', 'hidden');

    // Close all submenus
    const submenus = navMenu.querySelectorAll('ul');
    submenus.forEach(submenu => {
      if (submenu.classList.contains('flex')) {
        submenu.classList.replace('flex', 'hidden');
      }
    });
  }
});
