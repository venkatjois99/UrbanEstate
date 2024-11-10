import About from './About';
import { mount } from 'cypress/react18';

describe('<About />', () => {
  it('renders without crashing', () => {
    mount(<About />);
    cy.get('.overview-wrapper').should('exist');
  });

  it('displays the main headings and text correctly', () => {
    mount(<About />);

    cy.get('h1').first().contains('About Us');
    cy.get('h1').eq(1).contains('Our Mission');
    cy.get('h1').eq(2).contains('What We Offer');
    cy.contains('UrbanEstate is a disruptive rental home booking platform').should('exist');
    cy.contains('Our mission is to remove the information asymmetry in the rental market').should('exist');
  });

  it('contains the correct email link', () => {
    mount(<About />);

    cy.contains('hello@urbanestate.com')
      .should('have.attr', 'href')
      .and('include', 'mailto:hello@urbanestate.com');
  });

  it('displays the "Verified Listings" feature', () => {
    mount(<About />);

    cy.get('ol li').first().contains('Verified Listings');
  });

  it('applies AOS animation attributes to the text areas', () => {
    mount(<About />);

    cy.get('.text-area').should('have.attr', 'data-aos', 'fade-up');
    cy.get('.text-area').should('have.attr', 'data-aos-delay', '200');
  });

  it('displays user-friendly content', () => {
    mount(<About />);

    cy.contains('User-Friendly Experience').should('exist');
  });
});
