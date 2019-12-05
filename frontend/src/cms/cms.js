import CMS from 'netlify-cms-app'

import EventInfoPreview from './preview-templates/EventInfoPreview'
import NewsArticlePreview from './preview-templates/NewsArticlePreview'

import '../styling/styles.sass'
import { HomePage } from '../templates/home-page'
import { NewsOverview } from '../templates/news-overview'
import { preview } from '../util/templating'

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

CMS.registerPreviewTemplate('home', preview(HomePage))
CMS.registerPreviewTemplate('events', EventInfoPreview)
CMS.registerPreviewTemplate('news', preview(NewsArticle))
CMS.registerPreviewTemplate('news-home', preview(NewsOverview, {newsArticles: placeholderArticles}))
