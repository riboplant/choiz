import { describe, it } from 'mocha'
import 'cypress'

describe('Flujo completo - Otras condiciones', () => {
  it('debería mostrar recomendación dutaxidil-gel', () => {
    // ... navegación inicial
    // En pregunta 3, seleccionar cualquier otra condición
    cy.contains('Diabetes').click()
    // ... continuar flujo
    cy.url().should('include', '/recommendation?type=dutaxidil-gel')
  })
})