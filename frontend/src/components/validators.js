import PropTypes from 'prop-types'

// These are validators that can be re-used to validate events and lists of events
export const eventPropTypeValidator = PropTypes.shape({
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.object,
    dateTime: PropTypes.string.isRequired,
    eventTypes: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  html: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired
  })
})

export const gatsbyImageSharpFluidValidator = PropTypes.shape({
  base64: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired
})

export const childImageSharpValidator = PropTypes.shape({
  fluid: gatsbyImageSharpFluidValidator
})

export const previewCompatibleImageValidator = PropTypes.shape({
  alt: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string,
    childImageSharpValidator
  ]),
  value: PropTypes.string
})

export const newsArticleValidator = PropTypes.shape({
  node: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      image: previewCompatibleImageValidator
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string
    })
  })
})

export const formValidator = PropTypes.shape({
  isPublic: PropTypes.bool,
  link: PropTypes.string
})
