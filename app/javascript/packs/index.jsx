import React from 'react'
import ReactDOM from 'react-dom'
import ProductPlanApp from '../components/ProductPlanApp'
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ProductPlanApp />,
    document.getElementById('productRows').appendChild(document.createElement('div'))
  )
})
