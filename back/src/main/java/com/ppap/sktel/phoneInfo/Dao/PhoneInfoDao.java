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
        return jdbcTemplate.query("SELECT id, model_name, machine_name, FORMAT(shipping_price, 0)as shipping_price, maker, created, FORMAT(battery, 0) as battery, FORMAT(screen_size, 2) as screen_size, FORMAT(storage, 0) as storage FROM phn_info_tb limit 5;", 
            (rs, rowNum) -> new PhoneInfo(
                rs.getInt("id"),
                rs.getString("model_name"),
                rs.getString("machine_name"),
                rs.getString(4),// FORMAT( data, 0)
                rs.getString("maker"),
                // new java.util.Date(rs.getDate("created").getTime()),
                rs.getDate("created"),
                rs.getString(7),
                rs.getString(8),
                rs.getString(9)
            )
        );
    }
	
}
