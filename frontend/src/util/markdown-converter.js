import remarkHtml from 'remark-html'
import remark from 'remark'

function convertToHtml(markdown) {
    return remark().use(remarkHtml).processSync(markdown).toString()
  }

export default convertToHtml