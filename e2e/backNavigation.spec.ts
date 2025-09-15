import { describe, it } from 'mocha'
import 'cypress'

describe('Navegación hacia atrás', () => {
  it('debería navegar correctamente hacia atrás', () => {
    cy.visit('/onboarding')
    
    // Desde pregunta 1 vuelve al inicio
    cy.get('[data-testid="arrow-left"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    
    // Navegar de vuelta y probar navegación entre preguntas
    cy.visit('/onboarding')
    cy.contains('No, ninguno de los anteriores').click()
    cy.contains('Continuar').click()
    
    // Desde pregunta 2 vuelve a pregunta 1
    cy.get('[data-testid="arrow-left"]').click()
    cy.contains('¿Tienes algún problema en el cuero cabelludo?')
  })
})