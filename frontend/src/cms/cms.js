import CMS from 'netlify-cms-app'

import '../styling/styles.scss'
import { HomePage } from '../templates/home-page'
import { NewsOverview } from '../templates/news-overview'
import { preview } from '../util/templating'
import { NewsArticle } from '../templates/news-article'
import { EventInfo } from '../templates/event-info'
import { AboutPage } from '../templates/about-page'
import { UpcomingEvents } from '../templates/upcoming-events'
import { CalendarPage } from '../templates/calendar-page'
import { ContactPage } from '../templates/contact-page'
import { FormPage } from '../templates/form'

import { AccessibleImageControl } from './AccessibleImageWidget'
import { MultiImageControl } from './MultiImageWidget'
import { HeroControl } from './HeroWidget'
import { MultiCollectionRelationControl, MultiCollectionRelationPreview } from './MultiCollectionRelationWidget'
import { FormControl } from './FormWidget'
import { StrawberryTilesControl } from './StrawberryTilesWidget'
import { LinkControl, LinkPreview } from './LinkWidget'

const placeholderArticle = {
    node: {
      fields: {
        slug: '/'
      },
      frontmatter: {
        image: {
          image: '/img/strawberry.jpg'
        },
        title: 'Placeholder',
        date: '2017-12-04'
      }
    }
}

const placeholderArticles = new Array(3).fill(placeholderArticle)

// Which days of the current month should we put placeholder events on?
const placeholderEventDays = [1, 3, 7, 7, 10, 19, 21, 21, 25, 30, 31, 40, 41, 49, 50, 50]  // Leaks into the next month, this is fine
const today = new Date()

const placeholderEvents = placeholderEventDays.map(dayNumber => ({
  frontmatter: {
    title: 'Event',
    image: '/img/strawberry-64x64.png',
    dateTime: new Date(today.getFullYear(), today.getMonth(), dayNumber),
    eventTypes: []
  },
  html: '<h2>This is a sample event.</h2>\n<p>This is a sample event.</p>',
  fields: {
    slug: 'test'
  }
}))

const homePageAdditionalPropsExtractor = (dataProps, { widgetsFor }) => {
  const contentBlocksMarkdown = widgetsFor('contentBlocks')
    .map(blk => blk.getIn(['widgets', '_markdown_contentBody']))
    .toObject()

  return { 
    contentBlocksHtml: contentBlocksMarkdown,
  }
}

CMS.registerPreviewTemplate('home', preview(HomePage, {newsArticles: placeholderArticles, events: placeholderEvents}, homePageAdditionalPropsExtractor))
CMS.registerPreviewTemplate('about', preview(AboutPage))
CMS.registerPreviewTemplate('privacy-page', preview(AboutPage))
CMS.registerPreviewTemplate('events', preview(EventInfo))
CMS.registerPreviewTemplate('news', preview(NewsArticle))
CMS.registerPreviewTemplate('news-home', preview(NewsOverview, {newsArticles: placeholderArticles}))
CMS.registerPreviewTemplate('upcoming-events', preview(UpcomingEvents, {events: placeholderEvents}))
CMS.registerPreviewTemplate('calendar-page', preview(CalendarPage, {events: placeholderEvents}))
CMS.registerPreviewTemplate('contact-page', preview(ContactPage))
CMS.registerPreviewTemplate('forms', preview(FormPage))

CMS.registerWidget("accessibleImage", AccessibleImageControl)
CMS.registerWidget("multiImage", MultiImageControl)
CMS.registerWidget("hero", HeroControl)
CMS.registerWidget('multi-collection-relation', MultiCollectionRelationControl, MultiCollectionRelationPreview)
CMS.registerWidget("form", FormControl)
CMS.registerWidget("strawberryTiles", StrawberryTilesControl)
CMS.registerWidget('link', LinkControl, LinkPreview)
