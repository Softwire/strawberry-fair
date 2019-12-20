import React from 'react'
import { HTMLContent } from '../components/Content'
import '../styling/styles.scss'
import { Layout } from '../components/Layout'
import { site } from '../util/templating'

// This is used by the websitesite and for CMS previews
export const FooterPreview = () => (
      <Layout/>
)


export default site(FooterPreview)