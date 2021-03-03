package com.ppap.sktel.phoneInfo;



import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
// @RequiredArgsConstructor
public class PhoneInfo{
	private int id;
    private String model_name;
    private String machine_name;
    private String shipping_price;
    private String maker;
    private Date created;
    private int battery;
    private double screen_size;
    private int storage;


	public PhoneInfo(
        int id,
        String model_name,
        String machine_name,
        String shipping_price,
        String maker,
        Date created,
        int battery,
        double screen_size,
        int storage)
    {
        this.id=id;
        this.model_name=model_name;
        this.machine_name = machine_name;
        this.shipping_price = shipping_price;
        this.maker = maker;
        this.created = created;
        this.battery = battery;
        this.screen_size = screen_size;
        this.storage = storage;
    }
}