function initTabNav() {
  const tabMenu = document.querySelectorAll('.js-tabmenu li');
  const tabContent = document.querySelectorAll('.js-tabcontent section');

  if (tabMenu.length && tabContent.length) {
    tabContent[0].classList.add('ativo');

    function activeTab(index) {
      tabContent.forEach((section) => {
        section.classList.remove('ativo');
      })
      tabContent[index].classList.add('ativo');
    }

    tabMenu.forEach((item, index) => {
      item.addEventListener('click', function () {
        activeTab(index);
      })
    })
  }
}
initTabNav();

function initAccordion() {
  const accordionList = document.querySelectorAll('.js-accordion dt');
  if (accordionList.length) {
    accordionList[0].classList.add('ativo');
    accordionList[0].nextElementSibling.classList.add('ativo')


    function activeAccordion() {
      this.classList.toggle('ativo')
      this.nextElementSibling.classList.toggle('ativo');
    }

    accordionList.forEach((item) => {
      item.addEventListener('click', activeAccordion);
    })
  }
}

initAccordion();

function initScroll() {
  const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]');

  linksInternos.forEach((link) => {
    link.addEventListener('click', scrollToSection);
  })

  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    linksInternos.forEach((link) => {
      link.addEventListener('click', scrollToSection);
    })
  }
}
initScroll();

function initAnimacao() {
  const sections = document.querySelectorAll('.js-scroll');
  const windowMetade = window.innerHeight * 0.6;
  function animarScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top - windowMetade;
      if (sectionTop < 0) {
        section.classList.add('ativo');
      }
    })
  }
  animarScroll();

  window.addEventListener('scroll', animarScroll);
}

initAnimacao();

function initModal() {
  const botaoAbrir = document.querySelector('[data-modal="abrir"]');
  const botaoFechar = document.querySelector('[data-modal="fechar"]');
  const containerModal = document.querySelector('[data-modal="container"]');

  function abrirModal(event) {
    event.preventDefault();
    containerModal.classList.add('ativo');
  }
  function fecharModal(event) {
    event.preventDefault();
    containerModal.classList.remove('ativo');
  }
  function cliqueForaModal(event) {
    if (event.target === this) {
      fecharModal(event);
    }
  }

  botaoAbrir.addEventListener('click', abrirModal);
  botaoFechar.addEventListener('click', fecharModal);
  containerModal.addEventListener('click', cliqueForaModal);
}
initModal();

function initTooltip() {
  const tooltips = document.querySelectorAll('[data-tooltip]');

  tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseOver);
  })

  function onMouseOver(event) {
    const tooltipBox = criarTooltip(this);
    tooltipBox.style.top = event.pageY + 'px';
    tooltipBox.style.right = event.pageX + 'px';
    onMouseLeave.element = this;
    onMouseLeave.tooltipBox = tooltipBox;
    onMouseMove.tooltipBox = tooltipBox;
    this.addEventListener('mouseleave', onMouseLeave);
    this.addEventListener('mousemove', onMouseMove);

  }
  const onMouseMove = {
    handleEvent(event) {
      this.tooltipBox.style.top = event.pageY + 20 + 'px';
      this.tooltipBox.style.left = event.pageX + 20 + 'px';

    }
  }
  const onMouseLeave = {
    tooltipBox: '',
    element: '',
    handleEvent() {
      this.tooltipBox.remove();
      this.element.removeEventListener('mouseleave', onMouseLeave);
      this.element.removeEventListener('mousemove', onMouseMove);

    }
  }

  function criarTooltip(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    return tooltipBox;
  }
}

initTooltip();

function initDropDownMenu() {

}
const dropDownMenus = document.querySelectorAll('[data-dropdown]');

dropDownMenus.forEach(menu => {
  ['touchstart', 'click'].forEach(userEvent => {
    menu.addEventListener(userEvent, handleClick);
  })
})
function handleClick(event) {
  event.preventDefault();
  this.classList.add('active');
  outsideClick(this, () => {
    this.classList.remove('active')
  });
};

function outsideClick(element, callback) {
  const html = document.documentElement;
  setTimeout(() => {
    html.addEventListener('click', handleOutsideClick)
  });

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      html.removeEventListener('click', handleOutsideClick);
      callback();
    }
  }
}

function initMenuMobile() {
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="list"]');
  const eventos = ['click', 'touchstart'];

  function openMenu(event) {
    menuList.classList.toggle('active');
    menuButton.classList.toggle('active');
    outsideClick(menuList, eventos, () => {
      menuList.classList.toggle('active');
      menuButton.classList.toggle('active');
    })
  }

  eventos.forEach((evento) => {
    menuButton.addEventListener(evento, openMenu);
  });
}
initMenuMobile();

function initAnimaNumeros() {
  const numeros = document.querySelectorAll('[data-numero]');

  numeros.forEach((numero) => {
    const total = numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start = start + incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 60 * Math.random());
  })
}
initAnimaNumeros();
