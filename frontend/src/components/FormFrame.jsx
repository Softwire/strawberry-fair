import React from 'react'
import { formValidator } from './validators'
import isUrl from 'is-url'

const IFRAMEHEIGHT = 1427 //default value for the height of the form

export const FormFrame = ({form: {isPublic, link}}) => {
    if (isPublic && link) {
        // Link as url
        if (isUrl(link) && link.includes("docs.google.com/forms/")) {
            return (
                <iframe src={link} width="100%" height={IFRAMEHEIGHT} />
            )
        }
      
        // Link as iFrame
        const urlSearch = link.match(/src="(\S*)"/)
  
        if (urlSearch && urlSearch[1]) {
            const url = urlSearch[1]
  
            if (isUrl(url) && url.includes("docs.google.com/forms/")) {
                const heightSearch = link.match(/\sheight="([0-9]+)?"\s/)
                const height = (heightSearch && heightSearch[1]) ? heightSearch[1] : IFRAMEHEIGHT
  
                return (
                    <iframe src={url} width="100%" height={height}>Loading…</iframe>
                )
            }
        }
    }

    return null
}
  
FormFrame.propTypes = { form: formValidator }