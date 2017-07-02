const offset = (elm) => {
  try {
    return elm.offset()
  } catch (e) {}
  const rawDom = elm[0]
  let _x = 0
  let _y = 0
  const body = document.documentElement || document.body
  const scrollX = window.pageXOffset || body.scrollLeft
  const scrollY = window.pageYOffset || body.scrollTop

  _x = rawDom.getBoundingClientRect().left + scrollX - rawDom.clientWidth
  _y = rawDom.getBoundingClientRect().top + scrollY - rawDom.clientHeight + 150
  return {left: _x, top: _y}
}

export default () => {
  return {
    restrict: "A",
    link(scope, element, attrs) {
      const topClass = attrs.setClassWhenAtTop // get CSS class from directive's attribute value
      const offsetTop = offset(element).top // get element's offset top relative to document

      const $win = angular.element(window)
      $win.bind("scroll", ()  => {
        element[($win[0].pageYOffset >= offsetTop) ? "addClass" : "removeClass"](topClass)
      })
    },
  }
}
