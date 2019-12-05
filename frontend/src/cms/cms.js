import CMS from 'netlify-cms-app'

import HomePagePreview from './preview-templates/HomePagePreview'
import EventInfoPreview from './preview-templates/EventInfoPreview'
import NewsArticlePreview from './preview-templates/NewsArticlePreview'
import NewsOverviewPreview from './preview-templates/NewsOverviewPreview'

import '../styling/styles.sass'
import { BannerWidgetControl, BannerWidgetPreview, BannerWidgetEditor } from './BannerWidget'

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('events', EventInfoPreview)
CMS.registerPreviewTemplate('news', NewsArticlePreview)
CMS.registerPreviewTemplate('news-home', NewsOverviewPreview)

CMS.registerWidget("BannerImages", BannerWidgetControl, BannerWidgetPreview)
CMS.registerEditorComponent(BannerWidgetEditor)