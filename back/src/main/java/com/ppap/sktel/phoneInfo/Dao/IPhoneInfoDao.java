package com.ppap.sktel.phoneInfo.Dao;

import java.util.ArrayList;
import java.util.List;

import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;
import com.ppap.sktel.phoneInfo.PhoneInfo;

public interface IPhoneInfoDao {
    void phoneInfoInsert();
    void phoneInfoUpdate();
    void phoneInfoDelete(List<Integer> id);
    List<PhoneInfo> phoneInfoSelect();
}
