import React from 'react'
import Footer from './footer';
import {mount} from 'cypress/react18';

describe('<Footer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Footer  showExtra/>)
  })
})