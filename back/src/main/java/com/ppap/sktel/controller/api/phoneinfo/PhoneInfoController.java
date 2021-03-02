package com.ppap.sktel.controller.api.phoneinfo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import com.ppap.sktel.phoneInfo.PhoneInfo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class PhoneInfoController {

    @RequestMapping(value="/api/test")
    public List<PhoneInfo> test() {
        PhoneInfo info = new PhoneInfo();
        info.setBattery(1000);
        info.setCreated("2010-10-10");
        info.setId(13);
        info.setMachine_name("machine_name");
        info.setMaker("maker");
        info.setModel_name("model_name");
        info.setScreen_size(5.3);
        info.setShipping_price(12313);
        info.setStorage(1000);


        PhoneInfo info2 = new PhoneInfo();
        info2.setBattery(1000);
        info2.setCreated("2010-10-10");
        info2.setId(13);
        info2.setMachine_name("machine_name");
        info2.setMaker("maker");
        info2.setModel_name("model_name");
        info2.setScreen_size(5.3);
        info2.setShipping_price(12313);
        info2.setStorage(1000);


        PhoneInfo info3 = new PhoneInfo();
        info3.setBattery(1000);
        info3.setCreated("2010-10-10");
        info3.setId(13);
        info3.setMachine_name("machine_name");
        info3.setMaker("maker");
        info3.setModel_name("model_name");
        info3.setScreen_size(5.3);
        info3.setShipping_price(12313);
        info3.setStorage(1999);

        List<PhoneInfo> infos = new ArrayList<PhoneInfo>();
        infos.add(info);
        infos.add(info2);
        infos.add(info3);

        return infos;
    }
    
}
