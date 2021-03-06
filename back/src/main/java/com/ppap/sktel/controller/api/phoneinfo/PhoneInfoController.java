package com.ppap.sktel.controller.api.phoneinfo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

import com.ppap.sktel.phoneInfo.PhoneInfo;
import com.ppap.sktel.phoneInfo.Service.PhoneInfoService;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
public class PhoneInfoController {
 
    @Autowired
    PhoneInfoService phoneInfoService;

    @RequestMapping(value="/api/phoneinfo")
    public HashMap<String, Object>  test() {
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<PhoneInfo> lists = phoneInfoService.getAllInfo();
        int lastId =  lists.get(lists.size()-1).getId();

        result.put("lastId",lastId);
        result.put("rows",lists);

        return result;
    }
    
}
