import CMS from 'netlify-cms-app'

import '../styling/styles.scss'
import { HomePage } from '../templates/home-page'
import { NewsOverview } from '../templates/news-overview'
import { preview } from '../util/templating'
import { NewsArticle } from '../templates/news-article'
import { EventInfo } from '../templates/event-info'
import { AboutPage } from '../templates/about-page'
import { AccessibleImageControl, AccessibleImagePreview } from './AccessibleImageWidget'
import { FixedHeroControl, FixedHeroPreview } from './FixedHeroWidget'
import { RevolvingHeroControl, RevolvingHeroPreview } from './RevolvingHeroWidget'
import { HeroControl, HeroPreview } from './HeroWidget'
import { UpcomingEvents } from '../templates/upcoming-events'
import { CalendarPage } from '../templates/calendar-page'

const placeholderArticle = {
    node: {
      fields: {
        slug: '/'
      },
      frontmatter: {
        image: {
          image: '/img/strawberry.jpg'
        },
        title: 'Placeholder'
      }
    }
}

const placeholderArticles = new Array(3).fill(placeholderArticle)

const placeholderEvent = {
  node: {
    frontmatter: {
      title: 'Event',
      image: '/img/strawberry-64x64.png',
      dateTime: new Date(),
      eventTypes: []
    },
    html: '<h2>This is a sample event.</h2>\n<p>This is a sample event.</p>',
    fields: {
      slug: 'test'
    }
  }
}

const placeholderEvents = new Array(3).fill(placeholderEvent)

const calendarPlaceholderEvent = (date) => ({
  node: {
    frontmatter: {
      title: 'Event',
      image: '/img/strawberry_fair.jpg',
      dateTime: date,
      eventTypes: []
    },
    html: '<h2>This is a sample event.</h2>\n<p>This is a sample event.</p>',
    fields: {
      slug: 'test'
    }
  }
})

const calendarPlaceholderEvents = [1, 4, 19, 23].map(n => calendarPlaceholderEvent(new Date(2019, 12, n)))  // Picked random days

const homePageAdditionalPropsExtractor = (dataProps, { widgetsFor }) => {
  const contentBlocksMarkdown = widgetsFor('contentBlocks')
    .map(blk => blk.getIn(['widgets', '_markdown_contentBody']))
    .toObject()

  return { 
    contentBlocksHtml: contentBlocksMarkdown,
  }
}

CMS.registerPreviewTemplate('home', preview(HomePage, {newsArticles: placeholderArticles}, homePageAdditionalPropsExtractor))
CMS.registerPreviewTemplate('about', preview(AboutPage))
CMS.registerPreviewTemplate('events', preview(EventInfo))
CMS.registerPreviewTemplate('news', preview(NewsArticle))
CMS.registerPreviewTemplate('news-home', preview(NewsOverview, {newsArticles: placeholderArticles}))

CMS.registerWidget("accessible-image", AccessibleImageControl, AccessibleImagePreview)
CMS.registerWidget("revolving-hero", RevolvingHeroControl, RevolvingHeroPreview)
CMS.registerWidget("fixed-hero", FixedHeroControl, FixedHeroPreview)
CMS.registerWidget("hero", HeroControl, HeroPreview)
CMS.registerPreviewTemplate('upcoming-events', preview(UpcomingEvents, {events: placeholderEvents}))
CMS.registerPreviewTemplate('calendar-page', preview(CalendarPage, {events: calendarPlaceholderEvents}))
