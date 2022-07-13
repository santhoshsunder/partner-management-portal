package io.mosip.test.admintest.testcase;

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

public class PartnerPolicyMappingTest extends BaseClass {

	@Test(groups = "PPM")
	public void ftmDetailsCRUD() throws InterruptedException {

		Commons.click(driver, By.xpath("//a[@href='#/pmp/resources/policymapping/view']"));
		
		//Commons.click(driver, By.id(idDeviceDetails));
		Commons.click(driver, By.xpath("//span[contains(text(),'Partner Policy Mapping')]"));
		//Commons.click(driver, By.id("Create Device")); //FIX
		Commons.dropdown(driver, By.xpath("//span[contains(text(),'Map Policy')]"), By.xpath("//span[contains(text(),'118')]"));
		Commons.enter(driver, By.xpath("//input[@placeholder='Version']"), "v1");
		Commons.enter(driver, By.xpath("//input[@placeholder='Created DateTime']"), "6/15/2022");
		Commons.enter(driver, By.xpath("//input[@placeholder='Binary Hash']"), data);
		Commons.enter(driver, By.xpath("//input[@placeholder='Expiry DateTime']"), "6/15/2022");
		Thread.sleep(8);
		//Commons.click(driver, By.xpath("//button[@id='createButton']"));
		Thread.sleep(30);
		Commons.click(driver, By.xpath("//span[contains(text(),'Save')]"));
		//Commons.create(driver);
		//Commons.filter(driver, By.xpath("//span[contains(text(),'Partner Name')]"), "118");
		
		
		
		
		
		Commons.enter(driver, By.id("word"), data);
		Commons.enter(driver, By.id("description"), data);

		Commons.create(driver);
		Commons.filter(driver, By.id("word"), data);

		Commons.edit(driver, data + 1, By.id("word"));
		Commons.filter(driver, By.id("word"), data + 1);

		Commons.activate(driver);
		Commons.edit(driver, data + 2, By.id("word"));
		Commons.filter(driver, By.id("word"), data + 2);
		Commons.deactivate(driver);
		 

		
	}
}
