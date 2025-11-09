describe('Admin Dashboard', () => {
  beforeEach(() => {
    // Login as admin user
    cy.visit('/login');
    cy.get('#email').type('admin@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Navigate to admin dashboard
    cy.visit('/admin/dashboard');
  });

  it('should display admin dashboard', () => {
    cy.contains('Admin Dashboard').should('be.visible');
    cy.contains('Total Revenue').should('be.visible');
    cy.contains('Recent Orders').should('be.visible');
  });

  it('should show stats cards', () => {
    cy.get('.stat-card').should('have.length.at.least', 4);
  });

  it('should navigate to products management', () => {
    cy.contains('Manage Products').click();
    cy.url().should('include', '/admin/products');
  });
});