package io.mosip.test.pmptest.testcase;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
// Generated by Selenium IDE
//import org.junit.Test;
//import org.junit.Before;
//import org.junit.After;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import io.mosip.test.pmptest.utility.BaseClass;
import io.mosip.test.pmptest.utility.Commons;

public class FtmDetailsTest extends BaseClass {

	@Test(groups = "FD")
	public void ftmDetailsCRUD() throws InterruptedException {

		Commons.click(driver, By.xpath("//a[@href='#/pmp/resources/ftmdetails/view']"));

		Commons.click(driver, By.xpath("//button[@id='Create FTM']"));
		Commons.dropdown(driver, By.id("ftpProviderId"));
		Commons.enter(driver, By.xpath("//input[@placeholder='Make']"), data);
		Commons.enter(driver, By.xpath("//input[@placeholder='Model']"), data);
		Commons.click(driver, By.xpath("//button[@id='createButton']"));
		Commons.click(driver, By.xpath("//span[contains(text(),'Ok')]"));

		Commons.click(driver, By.id("Filter"));
		Commons.filter(driver, By.id("make"), data);
		Commons.click(driver, By.id("ellipsis-button0"));
		Commons.click(driver, By.id("Edit0"));
		Commons.enter(driver, By.xpath("//input[@placeholder='Model']"), data + 1);
		Commons.click(driver, By.xpath("//button[@id='createButton']"));
		Commons.click(driver, By.xpath("//span[contains(text(),'Ok')]"));

		Commons.click(driver, By.id("Filter"));
		Commons.filter(driver, By.id("make"), data);
		Commons.click(driver, By.id("ellipsis-button0"));
		Commons.click(driver, By.id("Reject0"));

		Commons.click(driver, By.xpath("//button[@id='confirmpopup']"));
		Commons.click(driver, By.xpath("//button[@id='confirmmessagepopup']"));

	}
}
