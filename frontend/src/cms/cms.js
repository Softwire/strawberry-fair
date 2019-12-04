import CMS from 'netlify-cms-app'

import HomePagePreview from './preview-templates/HomePagePreview'
import EventInfoPreview from './preview-templates/EventInfoPreview'

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('events', EventInfoPreview)
