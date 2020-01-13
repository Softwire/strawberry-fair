export function getVideoInfoString(iframe) {
    if(iframe) {
        const height = iframe.match(/\s(height=".*?")[\s>]/)
        const width = iframe.match(/\s(width=".*?")[\s>]/)
        const source = iframe.match(/\s(src="https:\/\/www\.youtube\.com.*?")[\s>]/)
        return source ? (height && width ? height[1] + ' ' + width[1] + ' ' + source[1] : source[1] ) : null
    }
    else return null
}

export function getSimplifiedIframe({iframe, largeOnDesktop}) {
    const videoInfo = getVideoInfoString(iframe)
    const extraClass = largeOnDesktop ? ' is-large-on-desktop' : '' 
    return videoInfo ? `<figure class="video-container${extraClass}"><iframe ${videoInfo} frameborder="0" allowfullscreen="true"></iframe></figure>` : ''
}