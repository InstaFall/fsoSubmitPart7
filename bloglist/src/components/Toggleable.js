import { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </>
  )
})

Toggleable.displayName = "Toggleable"

Toggleable.propTypes = {
  label: PropTypes.string.isRequired,
}
export default Toggleable
