import Faq from './faq';
import { mount } from 'cypress/react18';

describe('<Faq />', () => {
  it('renders without crashing', () => {
    // Render the Faq component and check if the FAQ wrapper exists
    mount(<Faq />);
    cy.get('.faq-wrapper').should('exist');
  });

  it('renders FAQ items with summary and details', () => {
    // Render the Faq component and ensure FAQ items are present
    mount(<Faq />);
    cy.get('.faq-item').should('have.length', 8); // 8 FAQ items
    cy.get('summary').first().contains('How do I register on the platform?');
    cy.get('summary').last().contains('How can I edit or delete my property listing?');
  });

  it('checks if FAQ items expand/collapse correctly', () => {
    mount(<Faq />);
  
    // Ensure the first FAQ item is initially collapsed
    cy.get('.faq-item').first().find('details').should('not.have.attr', 'open');
  
    // Click the summary to expand the details
    cy.get('.faq-item').first().find('summary').click();
    
    // Wait for the content to be revealed and check that the details now have the open attribute
    cy.get('.faq-item').first().find('details').should('have.attr', 'open');
    
    // Click the summary again to collapse the details
    cy.get('.faq-item').first().find('summary').click();
    
    // Wait for the content to be hidden again and check that the details no longer have the open attribute
    cy.get('.faq-item').first().find('details').should('not.have.attr', 'open');
  });
   
});
