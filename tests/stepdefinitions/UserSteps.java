package stepdefinitions;

import io.cucumber.java.After;
import io.cucumber.java.en.*;
import org.junit.Assert;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class UserSteps {
    WebDriver driver;

    public UserSteps() {
        System.setProperty("webdriver.edge.driver", "drivers/msedgedriver.exe"); // Update with your path
        driver = new EdgeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().window().maximize();
    }
    

    @Given("I am on the registration page")
    public void i_am_on_the_registration_page() {
        driver.get("http://localhost:4200/register");
    }

    @When("I enter {string} as username")
    public void i_enter_as_username(String username) {
        driver.findElement(By.id("username")).sendKeys(username);
    }

    @When("I enter {string} as email in register")
    public void i_enter_as_email_in_register(String email) {
        driver.findElement(By.id("email")).sendKeys(email);
    }

    @When("I enter {string} as password in register")
    public void i_enter_as_password_in_register(String password) {
        driver.findElement(By.id("password")).sendKeys(password);
    }

    @When("I submit the registration form")
    public void i_submit_the_registration_form() {
        driver.findElement(By.cssSelector(".btn.btn-primary")).click();
    }

    @Then("I should see a success message")
    public void i_should_see_a_success_message() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.alertIsPresent());

        Alert alert = driver.switchTo().alert();
        String alertText = alert.getText();
        Assert.assertEquals("Registration successful! Please log in.');", alertText); // Update this message if needed
        alert.accept();
    }

    @Given("I am on the login page")
    public void i_am_on_the_login_page() {
        driver.get("http://localhost:4200/login");
    }

    @When("I enter {string} as email in login")
    public void i_enter_as_email_in_login(String email) {
        driver.findElement(By.id("email")).sendKeys(email);
    }

    @When("I enter {string} as password in login")
    public void i_enter_as_password_in_login(String password) {
        driver.findElement(By.id("password")).sendKeys(password);
    }

    @When("I submit the login form")
    public void i_submit_the_login_form() {
        driver.findElement(By.cssSelector(".btn.btn-primary")).click();
    }

    @Then("I should see the portfolios page")
    public void i_should_see_the_portfolios_page() {
        // Verify that the portfolios page is displayed
        Assert.assertTrue(driver.getCurrentUrl().contains("/portfolios"));
    }

    @Given("I am on the portfolios page")
    public void i_am_on_the_portfolios_page() {
        driver.get("http://localhost:4200/portfolios");
    }

    @When("I enter {string} as portfolio name")
    public void i_enter_as_portfolio_name(String portfolioName) {
        driver.findElement(By.id("portfolioName")).sendKeys(portfolioName);
    }

    @When("I enter {string} as description")
    public void i_enter_as_description(String description) {
        driver.findElement(By.id("portfolioDescription")).sendKeys(description);
    }

    @When("I submit the portfolio form")
    public void i_submit_the_portfolio_form() {
        driver.findElement(By.cssSelector(".btn.btn-primary")).click();
    }

    @Then("I should see {string} in the portfolio list")
    public void i_should_see_in_the_portfolio_list(String portfolioName) {
        Assert.assertTrue(driver.getPageSource().contains(portfolioName));
    }
    

    @Given("I am on the project tasks page")
    public void i_am_on_the_project_tasks_page() {
        driver.get("http://localhost:4200/project-tasks");
    }

    @When("I enter {string} as task title")
    public void i_enter_as_task_title(String taskTitle) {
        WebElement taskInput = driver.findElement(By.id("taskTitle")); // Replace with actual name
        taskInput.sendKeys(taskTitle);
    }

    @When("I select {string} as status")
    public void i_select_as_status(String status) {
        WebElement statusDropdown = driver.findElement(By.id("taskStatus")); // Replace with actual name
        statusDropdown.sendKeys(status); // Select status from dropdown
    }

    @When("I submit the task form")
    public void i_submit_the_task_form() {
        WebElement submitButton = driver.findElement(By.cssSelector(".btn.btn-primary")); // Replace with actual name
        submitButton.click(); // Click the submit button to submit the task form
    }

    @Then("I should see {string} in the project tasks list")
    public void i_should_see_in_the_project_tasks_list(String taskTitle) {
        Assert.assertTrue("Task not found in the list", driver.getPageSource().contains(taskTitle));
    }


    @Given("I am on the schedule meeting page")
    public void i_am_on_the_schedule_meeting_page() {
        driver.get("http://localhost:4200/schedule-meeting");
    }

    @When("I enter {string} as title")
    public void i_enter_as_title(String title) {
        WebElement titleInput = driver.findElement(By.id("meetingTitle")); // Replace with actual name
        titleInput.sendKeys(title);
    }

    @When("I enter {string} as date")
    public void i_enter_as_date(String date) {
        WebElement dateInput = driver.findElement(By.id("meetingDate")); // Replace with actual name
        dateInput.sendKeys(date);
    }

    @When("I enter {string} as time")
    public void i_enter_as_time(String time) {
        WebElement timeInput = driver.findElement(By.id("meetingTime")); // Replace with actual name
        timeInput.sendKeys(time);
    }

    @When("I submit the meeting form")
    public void i_submit_the_meeting_form() {
        WebElement submitButton = driver.findElement(By.cssSelector(".btn.btn-primary")); // Replace with actual name
        submitButton.click(); // Click the submit button to submit the meeting form
    }

    @Then("I should see {string} in the scheduled meetings")
    public void i_should_see_in_the_scheduled_meetings(String meetingTitle) {
        Assert.assertTrue("Meeting not found in the scheduled meetings", driver.getPageSource().contains(meetingTitle));
    }
    

    @After
    public void tearDown() {
        driver.quit();
    }
}
