package com.ppap.sktel.phoneInfo.Dao;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public void phoneInfoDelete(List<Integer>id) {
        // TODO Auto-generated method stub
        // int length = id.size();
        // String sql = "delete from phn_info_tb where ID in";
        // StringBuffer sqlBuffer = new StringBuffer(sql);
        // int i = 0;
        // sqlBuffer.append("(");

        // do{
        //     sqlBuffer.append("?, ");
        //     i++;
        // }while(i<length-1);
        // sqlBuffer.append("?);");

        // jdbcTemplate.update(sqlBuffer, id);
        

        List<Object[]> ts = id.stream().map(i -> new Object[]{i}).collect(Collectors.toList());
        this.jdbcTemplate.batchUpdate("delete from PHN_INFO_TB where ID in(?);", ts);
          
          
        
        // jdbcTemplate.update(sql, args)

    }

    @Override
    public List<PhoneInfo> phoneInfoSelect() {
        String sql = "SELECT id, model_name, machine_name, FORMAT(shipping_price, 0)as shipping_price, maker, created, if(isnull(battery),'',FORMAT(battery,0))as battery , if(isnull(screen_size),'',FORMAT(screen_size,0))as screen_size, if(isnull(storage),'',FORMAT(storage,0))as storage FROM phn_info_tb;";
        return jdbcTemplate.query(sql,
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
