Feature: User Management and Task Scheduling

  Scenario: Successful registration
    Given I am on the registration page
    When I enter "testuser" as username
    And I enter "testuser@example.com" as email in register
    And I enter "password123" as password in register
    And I submit the registration form
    Then I should see a success message
    

  Scenario: Successful login
    Given I am on the login page
    When I enter "testuser@example.com" as email in login
    And I enter "password123" as password in login
    And I submit the login form
    Then I should see the portfolios page

  Scenario: Adding a new portfolio
    Given I am on the portfolios page
    When I enter "Marketing Portfolio" as portfolio name
    And I enter "This portfolio contains marketing strategies." as description
    And I submit the portfolio form
    Then I should see "Marketing Portfolio" in the portfolio list
    

  Scenario: Adding a new project task
    Given I am on the project tasks page
    When I enter "Complete Cucumber Tests" as task title
    And I select "in-progress" as status
    And I submit the task form
    Then I should see "Complete Cucumber Tests" in the project tasks list
    

  Scenario: Successful meeting scheduling
    Given I am on the schedule meeting page
    When I enter "Team Sync" as title
    And I enter "30-10-2024" as date
    And I enter "10:00" as time
    And I submit the meeting form
    And I should see "Team Sync" in the scheduled meetings
