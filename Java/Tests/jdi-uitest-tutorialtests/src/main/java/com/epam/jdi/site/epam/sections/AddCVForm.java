package com.epam.jdi.site.epam.sections;

import com.epam.jdi.entities.Attendee;
import com.epam.jdi.uitests.core.interfaces.common.IButton;
import com.epam.jdi.uitests.core.interfaces.common.ITextArea;
import com.epam.jdi.uitests.core.interfaces.common.ITextField;
import com.epam.jdi.uitests.core.interfaces.complex.IDropDown;
import com.epam.jdi.uitests.web.robot.RFileInput;
import com.epam.jdi.uitests.web.selenium.elements.composite.Form;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.JFindBy;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.JDropdown;
import org.openqa.selenium.support.FindBy;

/**
 * Created by Roman_Iovlev on 10/23/2015.
 */
public class AddCVForm extends Form<Attendee> {
    @FindBy(css = "[placeholder='First Name']")
    ITextField name;
    @FindBy(css = "[placeholder='Last Name']")
    ITextField lastName;
    @FindBy(css = "[placeholder='Email']")
    ITextField email;

    @JDropdown(
            jroot = @JFindBy(className = "country-wrapper"),
            jvalue = @JFindBy(className = "arrow"),
            jlist = @JFindBy(xpath = "*root*//li[contains(@id,'applicantCountry') and .='%s']"))
    IDropDown country;

    @JDropdown(
            jroot = @JFindBy(className = "city-wrapper"),
            jexpand = @JFindBy(className = "arrow"),
            jlist = @JFindBy(css = "*root*li[id*=applicantCity]")
        //jlist = @JFindBy(xpath = "*root*//*[contains(@id,'select-box-applicantCity')]//li")
    )
    IDropDown city;

    @FindBy(css = ".file-upload")
    RFileInput cv;
    @FindBy(css = ".comment-input")
    ITextArea comment;

    @FindBy(xpath = "//*[.='Submit']")
    IButton submit;
    @FindBy(xpath = "//*[.='Cancel']")
    IButton cancel;
}
