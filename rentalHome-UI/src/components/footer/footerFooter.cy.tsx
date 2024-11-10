import React from 'react';
import Footer from './footer';
import { mount } from 'cypress/react18';

describe('<Footer />', () => {
  
  it('renders without crashing', () => {
    // Mount the Footer component and check if it renders successfully
    mount(<Footer showExtra={true} />);
    cy.get('.footer-cont').should('exist');
  });

  it('renders with extra content when showExtra is true', () => {
    // Mount the Footer component with showExtra set to true
    mount(<Footer showExtra={true} />);
    // Check if the email subscription form is rendered
    cy.get('.email-form').should('exist');
    // Check if the 'Discover' section exists
    cy.get('.footer-body-part-cont').contains('Discover').should('exist');
    // Ensure the 'Quick Links' section exists and contains links
    cy.get('.footer-body-part-cont').contains('Quick Links').should('exist');
    cy.get('.footer-body-part-cont').contains('About Us').should('exist');
  });

  it('does not render extra content when showExtra is false', () => {
    // Mount the Footer component with showExtra set to false
    mount(<Footer showExtra={false} />);
    // Ensure that the extra content (email form, Discover section, etc.) is not rendered
    cy.get('.footer-body').should('not.exist');
  });

});
