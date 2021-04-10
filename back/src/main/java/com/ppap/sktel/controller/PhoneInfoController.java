package com.ppap.sktel.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.stream.Stream;

import javax.swing.text.html.parser.Entity;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ppap.sktel.phoneInfo.PhoneInfo;
import com.ppap.sktel.phoneInfo.Service.PhoneInfoService;

import org.apache.ibatis.javassist.expr.NewArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;



@RestController
@CrossOrigin(origins = {"http://localhost:5000", "http://localhost:3000", "http://192.168.206.109:5000"}) 
public class PhoneInfoController {
 
    @Autowired
    PhoneInfoService phoneInfoService;
    
    // @RequestMapping(value="/api/phoneinfo", method = RequestMethod.GET)
    @GetMapping(value = "/api/phoneinfo")
    public HashMap<String, Object>  test() {
        HashMap<String, Object> result = new HashMap<String, Object>();
        // List<PhoneInfo> lists = new ArrayList<PhoneInfo>();
        // PhoneInfo info1 = new PhoneInfo(1, "model1", "모델1", "10000", "lg", (java.sql.Date) new Date(65456), "1", "1", "1");
        // lists.add(info1);

        // result.put("lastId", 0);
        // result.put("rows", lists);
        List<PhoneInfo> lists = phoneInfoService.getAllInfo();
        int lastId =  lists.get(lists.size()-1).getId();

        result.put("lastId",lastId);
        result.put("rows",lists);

        return result;
    }

    // @RequestMapping(value="/api/phoneinfo/a", method=RequestMethod.PATCH)
    // @PatchMapping(value = "/api/phoneinfo/a")
    @RequestMapping(value = "api/phoneinfo/a", method = RequestMethod.PATCH, consumes="application/json")
    public  ResponseEntity<String> patchData(@RequestBody Map<String,List<PhoneInfo>> object) {
        System.out.println("------데이터받음------");

        List<Integer> deleteList = new ArrayList<Integer>();
        List<PhoneInfo> addList = new ArrayList<PhoneInfo>();
        List<PhoneInfo> updateList = new ArrayList<PhoneInfo>();

        object.forEach((key,val)->{
            if( key == "deleteList"){
                val.forEach(lists->{
                    deleteList.add(lists.getId());
                });
            }
            if( key == "addList"){
                val.forEach(lists->{
                    addList.add(lists);
                });
            }
            if( key == "updateList"){
                val.forEach(lists->{
                    updateList.add(lists);
                    // System.out.println(lists.getModel_name());
                    // System.out.println(lists.getMachine_name());
                    // System.out.println(lists.getShipping_price());
                    // System.out.println(lists.getMaker());
                    // System.out.println(lists.getCreated());
                    // System.out.println(lists.getBattery());
                    // System.out.println(lists.getScreen_size());
                    // System.out.println(lists.getStorage());
                });
            }
        });
        phoneInfoService.infoUpdate(updateList);
        phoneInfoService.infoDelete(deleteList);
        phoneInfoService.infoAdd(addList);

        return ResponseEntity.ok("ok");
    }
}
