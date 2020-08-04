import {createProfileTemplate} from "./view/profile.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createMainContentTemplete} from "./view/main-content.js";
import {createFilmListTemplate} from "./view/film-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createTopRatedSectionTemplate} from "./view/top-rated-section.js";
import {createTopCommentedSectionTemplate} from "./view/top-commented-section.js";
import {createFilmsNumTemplate} from "./view/film-num.js";
import {createFilmDetailsPopupTemplate} from "./view/film-details-popup.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createFilmDetailsControlTemplate} from "./view/film-details-control.js";
import {createFilmDetailsCommentsSectionTemplate} from "./view/film-details-comments-section.js";
import {createFilmDetailsCommentTemplate} from "./view/film-details-comment.js";
import {createFilmDetailsNewCommentTemplate} from "./view/film-details-new-comment.js";
import {createStatsTemplate} from "./view/stats.js";
import {createStatsRankTemplate} from "./view/stats-rank.js";
import {createStatsFiltersTemplate} from "./view/stats-filters.js";
import {createStatsTextTemplate} from "./view/stats-text.js";
import {createStatsChartTemplate} from "./view/stats-chart.js";


const FILM_MAIN_NUM = 5; // кол=во фильмов на главной странице
const TOP_NUM = 2; // кол-во фильмов в TOP рубриках
const COMMENTS_NUM = 4; // кол-во комментов к фильму


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createMenuTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createMainContentTemplete());

const filmsElement = siteMainElement.querySelector(`.films`);
render(filmsElement, createFilmListTemplate());

const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILM_MAIN_NUM; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

const filmsListElement = filmsElement.querySelector(`.films-list`);
render(filmsListElement, createLoadMoreButtonTemplate());

render(filmsElement, createTopRatedSectionTemplate());
render(filmsElement, createTopCommentedSectionTemplate());

const filmsListExtraElement = filmsElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElement.forEach((entry) => {
  const filmsListExtraContainerElement = entry.querySelector(`.films-list__container`);
  for (let i = 0; i < TOP_NUM; i++) {
    render(filmsListExtraContainerElement, createFilmCardTemplate());
  }
});

const footerStatsElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatsElement, createFilmsNumTemplate());

// Начало отрисовки Popup
render(siteFooterElement, createFilmDetailsPopupTemplate(), `afterend`);

const filmDetailsElement = document.querySelector(`.film-details`); // Временное скрытие Popup
filmDetailsElement.classList.add(`visually-hidden`); //

const popupFilmDetailsForm = document.querySelector(`.film-details__inner`);
render(popupFilmDetailsForm, createFilmDetailsTemplate());

const filmDetailsTopContainer = popupFilmDetailsForm.querySelector(`.form-details__top-container`);
render(filmDetailsTopContainer, createFilmDetailsControlTemplate());

render(popupFilmDetailsForm, createFilmDetailsCommentsSectionTemplate());

const filmDetailsCommentsListElement = popupFilmDetailsForm.querySelector(`.film-details__comments-list`);
for (let i = 0; i < COMMENTS_NUM; i++) {
  render(filmDetailsCommentsListElement, createFilmDetailsCommentTemplate());
}
render(filmDetailsCommentsListElement, createFilmDetailsNewCommentTemplate(), `afterend`);
// Конец отрисовки Popup

// Начало отрисовка Статистики
render(siteMainElement, createStatsTemplate());

const statsElement = siteMainElement.querySelector(`.statistic`);

statsElement.classList.add(`visually-hidden`); // Временное скрытие Статистики

render(statsElement, createStatsRankTemplate());
render(statsElement, createStatsFiltersTemplate());
render(statsElement, createStatsTextTemplate());
render(statsElement, createStatsChartTemplate());
// Конец отрисовки Статистики
