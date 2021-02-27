package com.ppap.sktel;

import java.util.Date;
import java.text.SimpleDateFormat;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {
    
    @RequestMapping(value = "/api/time", method = RequestMethod.GET)
    public String setverTime(){
        return "hi server time is "+new Date()+" Now";
    }

}
