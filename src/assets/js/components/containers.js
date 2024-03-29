let containers = document.querySelector('.containers .containers__inner');

async function Containers() {
  let response = await fetch('assets/json/containers.json');
  let result = await response.json();

  for (let key in result) {
    let item = result[key];
    let cont = filterProperty(item, "cont", null);
    let htmlBlocks = "";
    let i = 1;
    if (cont != null && cont.length > 0) {
      for (let c of cont) {
        i++
        let idx = i + 1;
        // Цвет
        let colors = filterProperty(c, "colors", null);
        let colorsBlocks = "";
        if (colors != null && colors.length > 0) {
          // картинки для переключения цветов
          let imgsForColors = filterProperty(c, "imgsForColors", null);
          let imgsForColorsBlocks = "";
          if (imgsForColors != null && imgsForColors.length > 0) {
            for (let imgForColor of imgsForColors) {
              imgsForColorsBlocks += `
                                  data-color="assets/img/containers/${imgForColor.img}"
                              `;
            }
          }
          for (let color of colors) {
            colorsBlocks += `
                <a class="containers__card-colors-item" data-color="assets/img/containers/${color.img}">
                    <img src="assets/img/colors/${color.color}.svg" width="20" height="20" alt="">
                </a>
            `;
          }
        }
        // Комерческое предложение
        let download = filterProperty(c, "download", null);
        let downloads = "";
        if (download != false) {
          downloads += `
              <div class="containers__card-download">
                  <a href="img/download/${c.download}" download>
                      <svg class="download__svg">
                          <use xlink:href="assets/sprite/SVG.svg#download"></use>
                      </svg>
                      Комерційна пропозиція
                  </a>
              </div>
          `;
        }
        // Характеристика в хедере попапа
        let characteristics = filterProperty(c, "characteristics", null);
        let characteristicsBlocks = "";
        if (characteristics != null && characteristics.length > 0) {
          for (let characteristic of characteristics) {
            characteristicsBlocks += `
                <li><b>${characteristic.type}</b>: ${characteristic.value}</li>
            `;
          }
        }
        // Преимущества
        let benefits = filterProperty(c, "benefits", null);
        let benefitsBlock = "";
        if (benefits != false && benefits != null) {
          let list = filterProperty(c, "benefits", null);
          let listBlocks = "";
          if (list != null && list.length > 0) {
            for (let l of list) {
              listBlocks += `
                  <li>${l.item}</li>
              `;
            }
          }
          let benefitsSubTitle = filterProperty(c, "benefitsSubTitle", null);
          let benefitsSubTitleBlock = "";
          if (benefitsSubTitle != false) {
            if (benefitsSubTitle != null && benefitsSubTitle.length > 0) {
              benefitsSubTitleBlock += `
                  <b>${c.benefitsSubTitle}</b>
              `;
            }
          }
          benefitsBlock += `
              <div class="popup__main-benefits">
                  <h3>Переваги</h3>
                  ${benefitsSubTitleBlock}
                  <ul>${listBlocks}</ul>           
              </div>
          `;
        }
        // Описание
        let descriptions = filterProperty(c, "descriptions", null);
        let descriptionsBlocks = "";
        if (descriptions != false && descriptions != null) {
          let listDesc = filterProperty(c, "descriptions", null);
          let listDescBlocks = "";
          if (listDesc != null && listDesc.length > 0) {
            for (let l of listDesc) {
              listDescBlocks += `
                  <li>${l.item}</li>
              `;
            }
          }
          descriptionsBlocks += `
              <div class="popup__main-description">
                  <h3>Опис</h3>
                  <ul>${listDescBlocks}</ul>            
              </div>
          `;
        }
        // Таблица характеристика
        let characteristicsAll = filterProperty(c, "characteristicsAll", null);
        let characteristicsAllBlocks = "";
        if (characteristicsAll != false && characteristicsAll != null) {
          let table = filterProperty(c, "characteristicsAll", null);
          let tableBlocks = "";
          if (table != null && table.length > 0) {
            for (let t of table) {
              tableBlocks += `
                  <div><span>${t.type}</span><span>${t.value}</span></div>
              `;
            }
          }
          characteristicsAllBlocks += `
              <div class="popup__main-characteristics">
                  <h3>Характеристики</h3>
                  <div class="popup__main-table">${tableBlocks}</div>            
              </div>
          `;
        }
        // Подробные фотографии
        ///// Выводим видео
        let detailedVideo = filterProperty(c, "detailedVideo", null);
        let detailedVideoBlocks = "";
        if (detailedVideo != false && detailedVideo != null) {
          let video = filterProperty(c, "detailedVideo", null);
          let videoBlocks = "";
          if (video != null && video.length > 0) {
            for (let i of video) {
              videoBlocks += `
                  <video controls="controls">
                      <source src="assets/videos/containers/${i.video}" type="video/mp4">
                  </video>
              `;
            }
          }
          detailedVideoBlocks += `
                          ${videoBlocks}
                      `;
        }
        ///// Выводим фото
        let detailedPhotos = filterProperty(c, "detailedPhotos", null);
        let detailedPhotosBlocks = "";
        if (detailedPhotos != false && detailedPhotos != null) {
          let img = filterProperty(c, "detailedPhotos", null);
          let imgBlocks = "";
          if (img != null && img.length > 0) {
            for (let i of img) {
              imgBlocks += `
                  <a href="assets/img/containers/${i.img}.jpg">
                      <picture>
                          <source class="watermark" srcset="assets/img/containers/${i.img}.webp" type="image/webp">
                          <img class="watermark" src="assets/img/containers/${i.img}.jpg" width="338" height="330" alt="">
                      </picture>
                  </a>
              `;
            }
          }
          detailedPhotosBlocks += `
              <div class="popup__main-characteristics">
                  <h3>Детальні світлини</h3>
                  <div class="popup__main-detailsPhoto">${imgBlocks} ${detailedVideoBlocks}</div>            
              </div>
          `;
        }
        // Краткое описание
        let briefDescription = filterProperty(c, "briefDescription", null);
        let briefDescriptionBlock = "";
        if (briefDescription != false && briefDescription != null) {
          if (briefDescription != null && briefDescription.length > 0) {
            briefDescriptionBlock += `
                <div class="popup__main-briefDescription">${c.briefDescription}</div>
            `;
          }
        }
        // Сертификаты
        let sertificates = filterProperty(c, "sertificates", null);
        let sertificatesBlocks = "";
        if (sertificates != false && sertificates != null) {
          let img = filterProperty(c, "sertificates", null);
          let imgBlocks = "";
          if (img != null && img.length > 0) {
            for (let i of img) {
              imgBlocks += `
                  <a href="assets/img/sertificates/${i.img}">
                      <img class="watermark" src="assets/img/sertificates/${i.img}" width="338" height="330" alt="">
                  </a>
              `;
            }
          }
          sertificatesBlocks += `
              <div class="popup__main-sertificates">
                  <h3>Сертифікати</h3>
                  <div class="popup__main-detailsPhoto">${imgBlocks}</div>            
              </div>
          `;
        }
        htmlBlocks += `
            <div class="containers__card">
                <div class="containers__card-title">${c.title}</div>
                <div class="containers__card-img">
                    <a href="#details_popup${c.popupId}" class="popup-link">
                        card
                        <picture>
                            <source class="watermark" srcset="assets/img/containers/${c.img}.webp" type="image/webp">
                            <img class="watermark" src="assets/img/containers/${c.img}.jpg" width="338" height="330" alt="">
                        </picture>
                    </a>
                </div>
                <div class="containers__card-colors">
                    ${colorsBlocks}
                </div>
                <div class="containers__card-country">
                    <p><b>Країна виробник:</b> ${c.country}</p>
                </div>
                <div class="containers__card-price">
                    <p>${c.price} грн</p>
                </div>
                <div class="containers__card-details">
                    <a href="#details_popup${c.popupId}" class="popup-link btn btn__blue">Детальніше</a>
                    <div class="popup" id="details_popup${c.popupId}">
                        <div class="popup__body">
                            <div class="popup__content popup__content-details">
                                <a href="" class="popup__close close-popup">
                                    <svg class="popup__svg">
                                        <use xlink:href="assets/sprite/SVG.svg#popup__close"></use>
                                    </svg>
                                </a>
                                <div class="popup__title">
                                    <span>${c.title}</span>
                                </div>
                                <div class="popup__main popup__main-containers">
                                    <div class="popup__main-header">
                                        <div class="popup__main-header-left">
                                            <div class="containers__card-img">
                                                <picture>
                                                    <source class="watermark" srcset="assets/img/containers/${c.img}.webp" type="image/webp">
                                                    <img class="watermark" src="assets/img/containers/${c.img}.jpg" width="338" height="330" alt="">
                                                </picture>
                                            </div>
                                        </div>
                                        <div class="popup__main-header-center">
                                            <div class="containers__card-colors">
                                            ${colorsBlocks}
                                            </div>
                                            <div class="containers__card-pricePopup">
                                                <div>Ціна</div>
                                                <span>${c.price} грн з ПДВ</span>
                                            </div>
                                            ${downloads}
                                            <div class="containers__card-buy">
                                                <a href="#popup${c.popupId}" class="popup-link btn">Купити</a>
                                            </div>
                                        </div>
                                        <div class="popup__main-header-right">
                                            <p>Характеристики</p>
                                            <ul>
                                                ${characteristicsBlocks}
                                            </ul>
                                        </div>
                                    </div>
                                    ${briefDescriptionBlock}
                                    ${detailedPhotosBlocks}
                                    ${characteristicsAllBlocks}
                                    ${descriptionsBlocks}
                                    ${benefitsBlock}
                                    ${sertificatesBlocks}
                                    <div class="popup__main-footer">
                                        <h2>EUROCONTAINER.com.ua</h2>
                                        <div class="popup__main-footer-left">
                                            <p>ТОВ «КИЇВ-СПЕЦТЕХ»</p>
                                            <p>01054, вул. Ярославів Вал, буд. 13/1, м. Київ</p>
                                            <p>Код ЄДРПОУ 42623361. Р/р 26 003000003717</p>
                                            <p>в АТ «АБ «Південний». МФО 328209.</p>
                                        </div>
                                        <div class="popup__main-footer-right">
                                            <p>Телефони:</p>
                                            <p><a class="binct-phone-number-1" href="tel:+380671804460">+38 (067) 180-44-60</a></p>
                                            <p><a class="binct-phone-number-2" href="tel:+380503956520">+38 (050) 395-65-20</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ${downloads}
                <div class="containers__card-buy">
                    <a href="#popup${c.popupId}" class="popup-link btn">Купити</a>
                    <div class="popup" id="popup${c.popupId}">
                        <div class="popup__body">
                            <div class="popup__content popup__content-form">
                                <a href="" class="popup__close close-popup">
                                    <svg class="popup__svg">
                                        <use xlink:href="assets/sprite/SVG.svg#popup__close"></use>
                                    </svg>
                                </a>
                                <div class="popup__title">
                                    <span>Замовити контейнер</span>
                                </div>
                                <div class="popup__main popup__form">
                                    <form class="ajax" action="https://api.zina.com.ua/send_form" method="post">
                                        <input type="text" name="field_first-name" placeholder="Ім'я" required="">
                                        <input class="mask" type="text" name="field_phone" placeholder="+38(_ _ _) _ _ _ _ _ _ _" required="">
                                        <textarea name="field_site_description" cols="20" rows="8" placeholder="Напишіть, будь-ласка, коментар"></textarea>
                                        <button type="submit" class="btn">Надіслати</button>
                                        <input type="hidden" name="mail_to" value="eurocontainerua@gmail.com,info@kievspecteh.com">
                                        <input type="hidden" name="label_field_first-name" value="Ваше имя">
                                        <input type="hidden" name="label_field_phone" value="Номер телефона">
                                        <input type="hidden" name="label_field_site_description" value="Ваше сообщение">
                                        <input type="hidden" name="form_title" value="СДЕЛАН ЗАКАЗ на ${c.title}">
                                        <input type="text" name="username">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
      }
    }
    containers.insertAdjacentHTML(
      "beforeend",
      `
        <div class="containers__header" id="${item.id}">
            <div class="containers__title">
                <h2>${item.title}</h2>
            </div>
            <div class="containers__value">
                <div class="containers__value-title">
                    <h3>${item.titleValue}</h3>
                </div>
                <p class="containers__value-text">${item.valueText}</p>
            </div>
        </div>
        <div class="containers__cards">${htmlBlocks}</div>
      `
    );
  }

  $(function () {
    // mask-phone
    $(".mask").mask("+38(999) 999-99-99");

    // водный знак
    // $(".watermark").watermark({
    //     gravity: "c"
    // })
  });

  let imgForColors = document.querySelectorAll('.containers__card-colors-item');

  if (imgForColors.length > 0) {
    for (let index = 0; index < imgForColors.length; index++) {
      let imgForColor = imgForColors[index];
      imgForColor.addEventListener('click', function (e) {
        let img = imgForColor.getAttribute('data-color');
        let parent = imgForColor.closest('.containers__card');
        let parentPopup = imgForColor.closest('.popup__main-header');
        function changePictures() {
          parent.querySelector(".containers__card-img a picture source").remove();
          parent.querySelector(".containers__card-img a picture img").remove();
          parent.querySelector(".containers__card-img a").classList.add("transitions");
          parent.querySelector(".containers__card-img a picture").insertAdjacentHTML(
            "beforeend",
            `
              <source class="watermark" srcset="${img}.webp" type="image/webp">
              <img class="watermark" src="${img}.jpg" alt="">
            `
          );
          parentPopup.querySelector(".containers__card-img picture source").remove();
          parentPopup.querySelector(".containers__card-img picture img").remove();
          parentPopup.querySelector(".containers__card-img").classList.add("transitions");
          parentPopup.querySelector(".containers__card-img picture").insertAdjacentHTML(
            "beforeend",
            `
                              <source class="watermark" srcset="${img}.webp" type="image/webp">
                              <img class="watermark" src="${img}.jpg" alt="">
                      `
          );
          // $(".watermark").watermark({
          //     gravity: "c"
          // })
        }
        if (parentPopup) {
          changePictures();
        } else {
          parentPopup = parent.querySelector('.popup__main-header');
          changePictures();
        }
        e.preventDefault();
      })
    }
  }
}

Containers();