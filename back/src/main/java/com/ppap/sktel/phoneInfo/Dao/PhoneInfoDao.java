package com.ppap.sktel.phoneInfo.Dao;

import java.util.List;

import com.ppap.sktel.phoneInfo.PhoneInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;


@Component(value="phoneInfoDao")
public class PhoneInfoDao implements IPhoneInfoDao {

    @Autowired(required = false)
    private JdbcTemplate jdbcTemplate;

    @Override
    public void phoneInfoInsert() {
        // TODO Auto-generated method stub

    }

    @Override
    public void phoneInfoUpdate() {
        // TODO Auto-generated method stub

    }

    @Override
    public void phoneInfoDelete() {
        // TODO Auto-generated method stub

    }

    @Override
    public List<PhoneInfo> phoneInfoSelect() {
        // SELECT FORMAT(market_price , 0), FORMAT(sale_price , 0) FROM `morning_table` WHERE 1


        return jdbcTemplate.query("SELECT id, model_name, machine_name, FORMAT(shipping_price, 0)as shipping_price, maker, created, battery, screen_size, storage FROM phn_info_tb;", 
            (rs, rowNum) -> new PhoneInfo(
                rs.getInt("id"),
                rs.getString("model_name"),
                rs.getString("machine_name"),
                rs.getString(3),// FORMAT( data, 0)
                rs.getString("maker"),
                // new java.util.Date(rs.getDate("created").getTime()),
                rs.getDate("created"),
                rs.getInt("battery"),
                rs.getDouble("screen_size"),
                rs.getInt("storage")
            )
        );
    }
	
}
