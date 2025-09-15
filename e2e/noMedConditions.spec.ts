import { describe, it } from 'mocha'
import 'cypress'

describe('Flujo completo - Sin condiciones médicas', () => {
  it('debería mostrar recomendación dutaxidil-capsulas', () => {
    cy.visit('/')
    cy.contains('Comienza aquí').click()
    
    // Pregunta 1: Seleccionar "ninguno"
    cy.contains('No, ninguno de los anteriores').click()
    cy.contains('Continuar').click()
    
    // Pregunta 2: Antecedentes familiares
    cy.contains('No').click()
    cy.contains('Continuar').click()
    
    // Pregunta 3: Condiciones médicas - seleccionar "ninguna"
    cy.contains('No, ninguna de las anteriores').click()
    cy.contains('Continuar').click()
    
    // Pregunta 4: Salud mental
    cy.contains('No, ninguno de los anteriores').click()
    cy.contains('Continuar').click()
    
    // Verificar recomendación
    cy.url().should('include', '/recommendation?type=dutaxidil-capsulas')
    cy.contains('DUTAXIDIL® Cápsulas')
  })
})