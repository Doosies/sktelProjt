package com.ppap.sktel.phoneInfo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PhoneInfo{
    int id;
    String model_name;
    String machine_name;
    int shipping_price;
    String maker;
    String created;
    int battery;
    double screen_size;
    int storage;
}