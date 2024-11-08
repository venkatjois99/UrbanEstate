import React from 'react'
import About from './About';
import {mount} from 'cypress/react18';
import Provider from 'react-router-dom'
import myAppStore from '../../../store/myAppStore';

describe('<About />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
        <About />

    );
  })
})