import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FancyTextTransformers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: this.props.mask,
      onHover: false
    }
    this.transformationStart = null
    this.transformationProgress = null
  }

  onHover = (e) => {
    e.stopPropagation()
    this.setState({ onHover: true }, () => {
      this.resetTransform()
      this.transformationProgress = window.requestAnimationFrame(this.transform)
    })
  }

  onBlur = () => {
    this.setState({ onHover: false }, () => {
      this.resetTransform()
      this.transformationProgress = window.requestAnimationFrame(this.transform)
    })
  }

  resetTransform = () => {
    window.cancelAnimationFrame(this.transformationProgress)
    this.transformationStart = null
    this.transformationProgress = null
  }

  transform = (timestamp) => {
    const { onHover } = this.state
    const { text, mask, duration = 500 } = this.props
    if (!this.transformationStart) this.transformationStart = timestamp
    const progress = timestamp - this.transformationStart
    const finalTextLength = onHover ? text.length : mask.length 
    let currentTextLength = Math.max(Math.floor((progress / duration) * finalTextLength), 1)
    const currentText = this.makeRandomString(currentTextLength)
    this.setState({ text: currentText })

    if (progress < duration) {
      window.requestAnimationFrame(this.transform)
    } else {
      const finalText = onHover ? text : mask
      this.setState({ text: finalText })
    }
  }

  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  makeRandomString = (length) => {
    let randomString = ''
    const picks = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      randomString += picks.charAt(Math.floor(Math.random() * picks.length))
    }
    return randomString
  }

  render () {
    return (
      <div
        onMouseEnter={this.onHover}
        onMouseLeave={this.onBlur}
        style={{
          fontFamily: 'serif',
          textTransform: 'uppercase'
        }}
      >
        {this.state.text}
      </div>
    )
  }
}

FancyTextTransformers.propTypes = {
  text: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  duration: PropTypes.number
}

export default FancyTextTransformers