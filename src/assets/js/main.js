const navToggler = document.getElementById('NavToggler');
const navMenu = document.getElementById('NavMenu');
const allMenus = navMenu.querySelectorAll('[data-menu-list]');

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
  trigger.addEventListener('click', (evt) => {
    evt.preventDefault();
    const target = trigger.nextElementSibling;

    allMenus.forEach((menu) => {
      if (menu !== target) {
        menu.classList.replace('flex', 'hidden');
      }
    });

    if (target.classList.contains('hidden')) {
      target.classList.replace('hidden', 'flex');
    } else {
      target.classList.replace('flex', 'hidden');
    }
  });
});

// Close all menus when the user clicks outside
document.addEventListener('click', function (evt) {
  if (!navMenu.contains(evt.target) && navToggler !== evt.target) {
    // Close all menus if you click outside of menu
    allMenus.forEach((menu) => {
      menu.classList.replace('flex', 'hidden');
    });
  }
});
