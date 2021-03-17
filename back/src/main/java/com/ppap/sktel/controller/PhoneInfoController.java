package com.ppap.sktel.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.swing.text.html.parser.Entity;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ppap.sktel.phoneInfo.PhoneInfo;
import com.ppap.sktel.phoneInfo.Service.PhoneInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;



@RestController
public class PhoneInfoController {
 
    @Autowired
    PhoneInfoService phoneInfoService;

    // @RequestMapping(value="/api/phoneinfo", method = RequestMethod.GET)
    @GetMapping(value = "/api/phoneinfo")
    public HashMap<String, Object>  test() {
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<PhoneInfo> lists = phoneInfoService.getAllInfo();
        int lastId =  lists.get(lists.size()-1).getId();

        result.put("lastId",lastId);
        result.put("rows",lists);

        return result;
    }

    // @RequestMapping(value="/api/phoneinfo/a", method=RequestMethod.PATCH)
    @PatchMapping(value = "/api/phoneinfo/a")
    public  ResponseEntity<String> patchData(@RequestBody Map<String,List<PhoneInfo>> object) {
        // Set<String>keys = object.keySet();
        // keys.forEach(key -> System.out.print(key));
        // Set<Entry<String, List<PhoneInfo>>> entries = object.entrySet();
        // entries.forEach((key,val)->{
            
        // });
        object.forEach((key,val)->{
            val.forEach(list->{
                System.out.println(list.getId());
                System.out.println(list.getModel_name());
                System.out.println(list.getMachine_name());
                System.out.println(list.getShipping_price());
                System.out.println(list.getMaker());
                System.out.println(list.getCreated());
                System.out.println(list.getBattery());
                System.out.println(list.getScreen_size());
                System.out.println(list.getStorage());
            });
        });
        return ResponseEntity.ok("ok");
    }
    
    
}