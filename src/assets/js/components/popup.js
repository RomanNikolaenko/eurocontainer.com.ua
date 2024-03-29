window.onload = function () {
  let popupLinks = document.querySelectorAll('.popup-link');
  let body = document.querySelector('body');
  let lockMargin = document.querySelectorAll('.lock-margin');

  let unlock = true;

  let timeout = 500;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      let popupLink = popupLinks[index];
      popupLink.addEventListener('click', function (e) {
        let popupName = popupLink.getAttribute('href').replace('#', '');
        let curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }

  let popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      let el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      })
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      let popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        curentPopup.classList.add('dubbleOpen');
        bodyLock();
      } else {
        bodyLock();
      }
      
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
          // удалить если используется первый метод открытия попапа
          setTimeout(function () {
            curentPopup.classList.remove('dubbleOpen');
          }, 100)
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    let lockMarginValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockMargin.length > 0) {
      for (let index = 0; index < lockMargin.length; index++) {
        let el = lockMargin[index];
        el.style.marginRight = lockMarginValue;
      }
    }

    body.style.marginRight = lockMarginValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    let dubbleActive = document.querySelector('.popup.dubbleOpen');
    if (!dubbleActive) {
      setTimeout(function () {
        if (lockMargin.length > 0) {
          for (let index = 0; index < lockMargin.length; index++) {
            let el = lockMargin[index];
            el.style.marginRight = '0px';
          }
        }
        body.style.marginRight = '0px';
        body.classList.remove('lock');
      }, timeout);

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeout);
    }
  }

  (function () {
    document.addEventListener('keydown', function (e) {
      if (e.which === 27) {
        let popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
      }
    })
  })();

  (function () {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
        let node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      }
    }
  })();

  (function () {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();

  let linkForPopup = $('.popup__main-detailsPhoto, .reviews__item');

  linkForPopup.magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading...',
    mainClass: 'blockImagePopup',
    closeOnContentClick: true
  });

  // linkForPopup.on("click", function () {
  //     $(".mfp-img").watermark({
  //         gravity: "c"
  //     })
  // })

  // stats
  function resize() {
    let statSection = $(".stats");
    let stats = $(".stats_count");
    statSection.waypoint({
      handler: function (direction) {
        if (direction === "down") {
          stats.each(function () {
            let tcount = $(this).data("count");
            let comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
            if (window.innerWidth >= 1025) {
              $(this).animateNumber({
                number: tcount,
                easing: 'easeInQuad',
                "font-size": "70px",
                numberStep: comma_separator_number_step
              },
                3000);
            } else if (window.innerWidth > 576 && window.innerWidth < 1025) {
              $(this).animateNumber({
                number: tcount,
                easing: 'easeInQuad',
                "font-size": "55px",
                numberStep: comma_separator_number_step
              },
                3000);
            } else if (window.innerWidth <= 576) {
              $(this).animateNumber({
                number: tcount,
                easing: 'easeInQuad',
                "font-size": "35px",
                numberStep: comma_separator_number_step
              },
                3000);
            }
          });
        }
        this.destroy();
      },
      offset: "100%"
    });
  }

  window.addEventListener("resize", resize);

  resize();
}