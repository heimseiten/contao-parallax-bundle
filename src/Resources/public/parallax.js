document.addEventListener("DOMContentLoaded", function(event) { 

  var window_innerHeight = window.innerHeight
  start();
  function start() {
    document.querySelectorAll('.parallax').forEach(element => {
      var speed = 6
      var classList = element.classList
      classList.forEach(e => { if ( e.includes('prlxs_') ) { speed = e.substr(6, e.length) } })
      var direction = 1
      if (element.classList.contains('prlx_up')) { direction = -1 }
      scroll(element, direction, speed)
    });
  }

  function scroll(element, direction, speed) {
    window.addEventListener('scroll', e => {
      if (isAnyPartOfElementInViewport(element)) { parallax(element, direction, speed) }
    }, {passive: true} );
  }

  function parallax(element, direction, speed) {
      var elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      var windowBottom = window_innerHeight + window.pageYOffset
      var scrolled_since_element =  windowBottom - elementPosition
      
      var element_movement = scrolled_since_element
      if (elementPosition < window_innerHeight) { element_movement = window.pageYOffset }
      var translateY = ((element_movement * direction) / speed ) + 'px'
      element.style.setProperty('--translateY',translateY)
      //element.style.setProperty('transform', 'translateY('+translateY+')')
  }

  function isAnyPartOfElementInViewport(element) {
    const rect = element.getBoundingClientRect()
    const windowHeight = (window_innerHeight || document.documentElement.clientHeight)
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0)
    return (vertInView)
  }
  
});