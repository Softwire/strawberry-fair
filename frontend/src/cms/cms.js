import CMS from 'netlify-cms-app'

import '../styling/styles.sass'
<<<<<<< HEAD
import { HomePage } from '../templates/home-page'
import { NewsOverview } from '../templates/news-overview'
import { preview } from '../util/templating'
import { NewsArticle } from '../templates/news-article'
import { EventInfo } from '../templates/event-info'

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
CMS.registerPreviewTemplate('events', preview(EventInfo))
CMS.registerPreviewTemplate('news', preview(NewsArticle))
CMS.registerPreviewTemplate('news-home', preview(NewsOverview, {newsArticles: placeholderArticles}))
=======

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('events', EventInfoPreview)
CMS.registerPreviewTemplate('news', NewsArticlePreview)
CMS.registerPreviewTemplate('news-home', NewsOverviewPreview)
>>>>>>> sf-17: added hero CMS widget and accessible image widget template
