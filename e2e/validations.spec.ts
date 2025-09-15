import { describe, it } from 'mocha'
import 'cypress'

describe('Validaciones del formulario', () => {
  it('no debería permitir continuar sin seleccionar opciones', () => {
    cy.visit('/onboarding')
    cy.contains('Continuar').should('be.disabled')
    
    cy.contains('No, ninguno de los anteriores').click()
    cy.contains('Continuar').should('not.be.disabled')
  })
  
  it('debería requerir texto cuando se selecciona "Otro"', () => {
    cy.visit('/onboarding')
    cy.contains('Otro').click()
    cy.contains('Continuar').should('be.disabled')
    
    cy.get('textarea').type('Problema específico')
    cy.contains('Continuar').should('not.be.disabled')
  })
})