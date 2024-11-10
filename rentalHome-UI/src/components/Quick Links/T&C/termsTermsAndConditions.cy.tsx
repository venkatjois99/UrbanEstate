import TermsAndConditions from './terms';
import { mount } from 'cypress/react18';

describe('<TermsAndConditions />', () => {
  it('renders without crashing', () => {
    // Render the TermsAndConditions component and check if the title exists
    mount(<TermsAndConditions />);
    cy.get('h2').should('exist').and('contain.text', 'Terms and Conditions');
  });

  it('contains the required terms list', () => {
    // Render the TermsAndConditions component
    mount(<TermsAndConditions />);

    // Check if the terms list exists and has 9 items
    cy.get('ul').should('exist');
    cy.get('ul > li').should('have.length', 9);  // Ensure 9 list items exist

    // Check if one of the list items contains the expected text
    cy.get('ul > li').first().should('contain.text', 'Registration:');
  });
});
