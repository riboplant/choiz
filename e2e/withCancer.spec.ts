import { describe, it } from 'mocha'
import { expect } from 'chai'
// Remove incorrect import of cy

describe('Flujo completo - Con cáncer', () => {
  it('debería mostrar recomendación minoxidil-capsulas', () => {
    // ... navegación inicial
    // En pregunta 3, seleccionar cáncer de mama o próstata
    cy.contains('Cáncer de mama').click() // o 'Cáncer de próstata'
    // ... continuar flujo
    cy.url().should('include', '/recommendation?type=minoxidil-capsulas')
  })
})