package com.ppap.sktel.phoneInfo.Dao;

import java.util.List;

import com.ppap.sktel.phoneInfo.PhoneInfo;

public interface IPhoneInfoDao {
    void phoneInfoInsert();
    void phoneInfoUpdate();
    void phoneInfoDelete();
    List<PhoneInfo> phoneInfoSelect();
}
