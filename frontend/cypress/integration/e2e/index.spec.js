describe('Render index page', () => {
  it('Visit localhost', () => {
    cy.visit('/');
  });

  // it('Sign up', () => {
  //   const userId = 'e2e-test-user';
  //   const userName = 'Test User1';
  //   const password = 'ThisIsPassword';

  //   localStorage.removeItem('user-id');
  //   localStorage.removeItem('access-token');

  //   cy.visit('/');

  //   cy.get('#button-signup').click();

  //   cy.get('#signup-form').should('be.visible');
    
  //   cy.get('#signup-id').type(userId);
    
  //   cy.get('#signup-name').type(userName);

  //   cy.get('#signup-password').type(password);

  //   cy.get('#button-submit-signup').click();

  //   cy.url().should('include', '/trips');
  // });

  // it('Sign in', () => {
  //   const userId = 'e2e-test-user';
  //   const password = 'ThisIsPassword';

  //   localStorage.removeItem('user-id');
  //   localStorage.removeItem('access-token');

  //   cy.visit('/');

  //   cy.get('#signin-id').type(userId);

  //   cy.get('#signin-password').type(password);

  //   cy.get('#button-signin').click();

  //   cy.url().should('include', '/trips');
  // });

  // it('Create new upcomming trip', () => {
  //   const userId = 'e2e-test-user';
  //   const password = 'ThisIsPassword';

  //   localStorage.removeItem('user-id');
  //   localStorage.removeItem('access-token');

  //   cy.visit('/');
  //   cy.get('#signin-id').type(userId);
  //   cy.get('#signin-password').type(password);
  //   cy.get('#button-signin').click();

  //   cy.visit('/trips');
  //   cy.get('#upcomming-trips-wrap').children().should('have.length', 1);

  //   cy.get('#fab-create-plan').click();
  //   cy.get('#trip-detail-modal').should('be.visible');
  //   cy.get('#select-destination-create-trip').click();
  //   cy.get('.destination-item').eq(1).click();


  //   cy.get('#startDate').type('2020-07-22');
  //   cy.get('#endDate').type('2020-07-25');
      
  //   cy.get('#description').click().type('My summer vacation');

  //   cy.get('#button-save-new-trip').click();

  //   cy.get('#upcomming-trips-wrap').children().should('have.length', 2);
    
  //   cy.get('#upcomming-trips-wrap').children().first().contains('Jasper National Park of Canada');
  //   cy.get('#upcomming-trips-wrap').children().first().contains('7/22/2020');
  //   cy.get('#upcomming-trips-wrap').children().first().contains('7/25/2020');
  // });

  // it('Create new trip of next month', () => {
  //   const userId = 'e2e-test-user';
  //   const password = 'ThisIsPassword';

  //   localStorage.removeItem('user-id');
  //   localStorage.removeItem('access-token');

  //   cy.visit('/');
  //   cy.get('#signin-id').type(userId);
  //   cy.get('#signin-password').type(password);
  //   cy.get('#button-signin').click();

  //   cy.visit('/trips');
  //   cy.get('#next-month-trips-wrap').children().should('have.length', 1);

  //   cy.get('#title-next-month').contains('Aug 2020');

  //   cy.get('#fab-create-plan').click();
  //   cy.get('#trip-detail-modal').should('be.visible');
  //   cy.get('#select-destination-create-trip').click();
  //   cy.get('.destination-item').eq(2).click();


  //   cy.get('#startDate').type('2020-08-02');
  //   cy.get('#endDate').type('2020-08-05');
      
  //   cy.get('#description').click().type('My summer vacation 2');

  //   cy.get('#button-save-new-trip').click();

  //   cy.get('#next-month-trips-wrap').children().should('have.length', 2);

  //   cy.get('#next-month-trips-wrap').children().first().contains('Horseshoe Falls');
  //   cy.get('#next-month-trips-wrap').children().first().contains('8/2/2020');
  //   cy.get('#next-month-trips-wrap').children().first().contains('8/5/2020');
  // });

  // it('Edit trip detail', () => {
  //   const userId = 'e2e-test-user';
  //   const password = 'ThisIsPassword';

  //   localStorage.removeItem('user-id');
  //   localStorage.removeItem('access-token');

  //   cy.visit('/');
  //   cy.get('#signin-id').type(userId);
  //   cy.get('#signin-password').type(password);
  //   cy.get('#button-signin').click();

  //   cy.visit('/trips');

  //   cy.get('#fab-create-plan').click();
  //   cy.get('#trip-detail-modal').should('be.visible');
  //   cy.get('#select-destination-create-trip').click();
  //   cy.get('.destination-item').eq(0).click();

  //   cy.get('#startDate').type('2020-07-21');
  //   cy.get('#endDate').type('2020-07-22');
      
  //   cy.get('#description').click().type('My summer vacation 3');

  //   cy.get('#button-save-new-trip').click();
  
  //   cy.get('#upcomming-trips-wrap').children().first().click();

  //   cy.get('#trip-detail-destination').contains('Vancouver');
  //   cy.get('#trip-detail-dates').contains('7/21/2020');
  //   cy.get('#trip-detail-dates').contains('7/22/2020');
  //   cy.get('#trip-detail-dates').contains('1 days');
  //   cy.get('#trip-detail-description').contains('My summer vacation 3.');

  //   cy.get('#button-edit-trip-detail').click();

  //   cy.get('#select-destination-create-trip').click();
  //   cy.get('.destination-item').eq(4).click();

  //   cy.get('#startDate').type('2020-07-23');
  //   cy.get('#endDate').type('2020-07-30');
  //   cy.get('#description').click().type(' Postpone by urgent work');

  //   cy.get('#button-save-new-trip').click();

  //   cy.get('#trip-detail-destination').contains('Casa Loma');
  //   cy.get('#trip-detail-dates').contains('7/23/2020');
  //   cy.get('#trip-detail-dates').contains('7/30/2020');
  //   cy.get('#trip-detail-dates').contains('7 days');
  //   cy.get('#trip-detail-description').contains('Postpone by urgent work');
  // });

  it('Delete Trip', () => {
    const userId = 'e2e-test-user';
    const password = 'ThisIsPassword';

    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');

    cy.visit('/');
    cy.get('#signin-id').type(userId);
    cy.get('#signin-password').type(password);
    cy.get('#button-signin').click();

    cy.visit('/trips');
    cy.get('#upcomming-trips-wrap').children().should('have.length', 1);

    cy.get('#fab-create-plan').click();
    cy.get('#select-destination-create-trip').click();
    cy.get('.destination-item').eq(0).click();

    cy.get('#startDate').type('2020-07-30');
    cy.get('#endDate').type('2020-08-01');
      
    cy.get('#description').click().type('My summer vacation 4');

    cy.get('#button-save-new-trip').click();

    cy.get('#upcomming-trips-wrap').children().should('have.length', 2);
  
    cy.get('#upcomming-trips-wrap').children().first().click();

    cy.get('#button-delete-trip-detail').click();

    cy.get('#upcomming-trips-wrap').children().should('have.length', 1);
  })
});