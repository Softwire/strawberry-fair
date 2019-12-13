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

import { AccessibleImageControl } from './AccessibleImageWidget'
import { MultiImageControl } from './MultiImageWidget'
import { HeroControl } from './HeroWidget'
import { MultiCollectionRelationControl, MultiCollectionRelationPreview } from './MultiCollectionRelationWidget'

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
CMS.registerPreviewTemplate('upcoming-events', preview(UpcomingEvents, {events: placeholderEvents}))
CMS.registerPreviewTemplate('calendar-page', preview(CalendarPage, {events: []}))

CMS.registerWidget("accessible-image", AccessibleImageControl)
CMS.registerWidget("multi-image", MultiImageControl)
CMS.registerWidget("hero", HeroControl)
CMS.registerWidget('multi-collection-relation', MultiCollectionRelationControl, MultiCollectionRelationPreview)
