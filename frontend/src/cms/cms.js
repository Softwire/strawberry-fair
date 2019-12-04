import CMS from 'netlify-cms-app'

import HomePagePreview from './preview-templates/HomePagePreview'
import NewsArticlePreview from './preview-templates/NewsArticlePreview'
import NewsOverviewPreview from './preview-templates/NewsOverviewPreview'

import '../styling/styles.sass'

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('news', NewsArticlePreview)
CMS.registerPreviewTemplate('news-home', NewsOverviewPreview)
