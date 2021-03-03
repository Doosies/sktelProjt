package com.ppap.sktel.controller.api.phoneinfo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ppap.sktel.phoneInfo.PhoneInfo;
import com.ppap.sktel.phoneInfo.Dao.PhoneInfoDao;
import com.ppap.sktel.phoneInfo.Service.PhoneInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class PhoneInfoController {

    @Autowired
    PhoneInfoService phoneInfoService;

    @RequestMapping(value="/api/phoneinfo")
    public List<PhoneInfo> test() {
        List<PhoneInfo> lists = phoneInfoService.getAllInfo();
        return lists;
    }
    
}
