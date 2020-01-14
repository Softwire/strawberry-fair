import CMS from 'netlify-cms-app'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import { youtubeEditorComponent } from './youtubeEditorComponent'

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
import { Footer } from '../components/Footer'

import { MultiImageControl } from './MultiImageWidget'
import { HeroControl } from './HeroWidget'
import { MultiCollectionRelationControl, MultiCollectionRelationPreview } from './MultiCollectionRelationWidget'
import { LinkControl, LinkPreview } from './LinkWidget'
import { DateTimeRangeControl } from './DateTimeRangeWidget'
 


const placeholderArticle = {
    node: {
      fields: {
        slug: '/'
      },
      frontmatter: {
        image: {
          alt: 'Placeholder',
          src: '/img/strawberry.jpg'
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
    image: {
      alt: 'Placeholder',
      src: '/img/strawberry-64x64.png'
    },
    dateTimeRange: {
      startDateTime: new Date(today.getFullYear(), today.getMonth(), dayNumber),
      endDateTime: new Date(today.getFullYear(), today.getMonth(), dayNumber + 1),
      provideEnd: true
    },
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

CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('home', preview(HomePage, {
  placeholderProps: {
    newsArticles: placeholderArticles,
    events: placeholderEvents
  }, 
  additionalPropsExtractor: homePageAdditionalPropsExtractor
}))
CMS.registerPreviewTemplate('about', preview(AboutPage))
CMS.registerPreviewTemplate('privacy-page', preview(AboutPage))
CMS.registerPreviewTemplate('events', preview(EventInfo))
CMS.registerPreviewTemplate('news', preview(NewsArticle))
CMS.registerPreviewTemplate('news-home', preview(NewsOverview, {placeholderProps: {newsArticles: placeholderArticles}}))
CMS.registerPreviewTemplate('upcoming-events', preview(UpcomingEvents, {placeholderProps: {events: placeholderEvents}}))
CMS.registerPreviewTemplate('calendar-page', preview(CalendarPage, {placeholderProps: {events: placeholderEvents}}))
CMS.registerPreviewTemplate('contact-page', preview(ContactPage))
CMS.registerPreviewTemplate('forms', preview(FormPage))
CMS.registerPreviewTemplate('footer', preview(Footer, {previewWithLayout: false}))

CMS.registerWidget("multiImage", MultiImageControl)
CMS.registerWidget("hero", HeroControl)
CMS.registerWidget('multi-collection-relation', MultiCollectionRelationControl, MultiCollectionRelationPreview)
CMS.registerWidget('link', LinkControl, LinkPreview)
CMS.registerWidget("dateTimeRange", DateTimeRangeControl)

CMS.registerEditorComponent(youtubeEditorComponent)


