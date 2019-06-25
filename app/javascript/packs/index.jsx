import React from 'react'
import ReactDOM from 'react-dom'
import ProductPlanApp from '../components/ProductPlanApp'
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ProductPlanApp />,
    document.getElementById('productPlan').appendChild(document.createElement('div'))
  )
})
