import CMS from 'netlify-cms-app'

import EventInfoPreview from './preview-templates/EventInfoPreview'
import NewsArticlePreview from './preview-templates/NewsArticlePreview'
import NewsOverviewPreview from './preview-templates/NewsOverviewPreview'

import '../styling/styles.sass'
import { HomePage } from '../templates/home-page'
import { preview } from '../util/templating'

CMS.registerPreviewTemplate('home', preview(HomePage))
CMS.registerPreviewTemplate('events', EventInfoPreview)
CMS.registerPreviewTemplate('news', NewsArticlePreview)
CMS.registerPreviewTemplate('news-home', NewsOverviewPreview)
