import React from 'react'
import Faq from './faq'

describe('<Faq />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Faq />)
  })
})